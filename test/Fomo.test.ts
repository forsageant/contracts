import { time, loadFixture, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { CardNFT, PoolFomo, Random } from "../typechain-types";
import { PancakeFactoryDeploy, numberToAddress } from "./Utils";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Address } from "cluster";

const Szabo_1 = ethers.utils.parseUnits('1', 12);
const NullAddress = "0x0000000000000000000000000000000000000000";

describe("Fomo Contract Test", function () {
    async function deploy() {
        const [_, unownedAssetReceiptor, ...signers] = await ethers.getSigners();
        const { owner, weth, factory, router } = await PancakeFactoryDeploy();

        const RandomContract = await ethers.getContractFactory("Random")
        const CardNFTContract = await ethers.getContractFactory("CardNFT")
        const FomoContract = await ethers.getContractFactory("PoolFomo")

        await setBalance(owner.address, ethers.utils.parseEther('1000000000000000'))

        const randomUpgrades = await upgrades.deployProxy(RandomContract, [])
        const random = (await randomUpgrades.deployed()) as Random
        const cardUpgrades = await upgrades.deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address])
        const card = (await cardUpgrades.deployed()) as CardNFT
        const fomoUpgrades = await upgrades.deployProxy(FomoContract, [weth.address, unownedAssetReceiptor.address, card.address])
        const fomo = (await fomoUpgrades.deployed()) as PoolFomo

        await fomo.connect(owner).grantRole(await fomo.DELEGATE_ROLE(), owner.address);

        const accounts = signers.slice(0, 15);
        return { weth, factory, router, fomo, card, owner, accounts, unownedAssetReceiptor };
    }

    async function getTokenId(card: CardNFT, owner: SignerWithAddress, accounts: SignerWithAddress[]) {

        await card.connect(owner).safeMint(accounts[0].address)
        await card.connect(owner).safeMint(accounts[1].address)
        await card.connect(owner).safeMint(accounts[2].address)
        const tokenId0 = await card.tokenOfOwnerByIndex(accounts[0].address, 0)
        const tokenId1 = await card.tokenOfOwnerByIndex(accounts[1].address, 0)
        const tokenId2 = await card.tokenOfOwnerByIndex(accounts[2].address, 0)

        return [
            numberToAddress(tokenId0.toNumber()),
            numberToAddress(tokenId1.toNumber()),
            numberToAddress(tokenId2.toNumber())
        ]
    }


    it("initialize, depositedDelegate permission test", async function () {
        const { weth, owner, fomo, card, accounts } = await loadFixture(deploy)

        const [token0Addr, ,] = await getTokenId(card, owner, accounts)
        await expect(
            fomo.initialize(weth.address, accounts[0].address, card.address)
        ).to.be.revertedWith('Initializable: contract is already initialized');

        await expect(
            fomo.connect(accounts[0]).depositedDelegate(token0Addr, 1000, 1000)
        ).to.be.revertedWith(/AccessControl.*is missing role/)
    });

    it("depositedDelegate", async function () {
        const { card, fomo, owner, accounts } = await loadFixture(deploy)
        const [token0Addr, token1Addr, token2Addr] = await getTokenId(card, owner, accounts)

        // nft
        await fomo.connect(owner).depositedDelegate(token0Addr, 1000, 100)
        await fomo.connect(owner).depositedDelegate(token1Addr, 1000, 100)
        await fomo.connect(owner).depositedDelegate(token2Addr, 1000, 100)

        expect(await fomo.investHistoryLen()).to.be.equal(3)

        expect(await fomo.investHistoryAt(0).then(info => info.account)).to.be.equal(token0Addr);
        expect(await fomo.investHistoryAt(0).then(info => info.amount)).to.be.equal(1000);

        expect(await fomo.investHistoryAt(2).then(info => info.account)).to.be.equal(token2Addr);
        expect(await fomo.investHistoryAt(2).then(info => info.amount)).to.be.equal(1000);

        await time.increase(13 * 3600);
        await expect(
            fomo.depositedDelegate(token0Addr, 1000, 100)
        ).to.be.revertedWith("time's up")
    })

    it("restartTick, distrubtionPool", async function () {
        const { weth, fomo, card, owner, accounts, unownedAssetReceiptor } = await loadFixture(deploy)
        const [token0Addr, token1Addr, token2Addr] = await getTokenId(card, owner, accounts)
        await expect(
            fomo.connect(accounts[0]).restartTick()
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            fomo.connect(owner).restartTick()
        ).to.be.revertedWith('time not up')

        await expect(
            fomo.connect(accounts[0]).distrubtionPool()
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            fomo.connect(owner).distrubtionPool()
        ).to.be.revertedWith('not yet')

        await time.increase(13 * 3600);
        await expect(
            fomo.connect(owner).distrubtionPool()
        ).to.be.revertedWith('empty invest history')

        await expect(
            fomo.connect(owner).depositedDelegate(token0Addr, 1000, 100)
        ).to.be.revertedWith("time's up")
        await fomo.connect(owner).restartTick()

        await fomo.connect(owner).depositedDelegate(token0Addr, 1000, 100)
        await fomo.connect(owner).depositedDelegate(token1Addr, 1000, 100)
        await fomo.connect(owner).depositedDelegate(token2Addr, 1000, 100)
        await time.increase(13 * 3600)
        await expect(fomo.connect(owner).distrubtionPool()).to.be.revertedWith("no reward");

        const reward = 5000;

        await weth.connect(owner).deposit({ value: reward });
        await weth.connect(owner).transfer(fomo.address, reward);

        await setBalance(accounts[0].address, 0);
        await setBalance(accounts[1].address, 0);
        await setBalance(accounts[2].address, 0);
        await fomo.connect(owner).distrubtionPool();

        // desc 1 half of reward
        expect(
            await ethers.provider.getBalance(accounts[2].address)
        ).to.be.equal(Math.floor(reward / 2))

        // desc 2 and more two muliple of deposited amount
        expect(
            await ethers.provider.getBalance(accounts[1].address)
        ).to.be.equal(2000)

        expect(
            await ethers.provider.getBalance(accounts[0].address)
        ).to.be.equal(500)

        // distrubtionPool again test unownedAssetReceiptor
        await setBalance(unownedAssetReceiptor.address, 0)
        await fomo.connect(owner).restartTick()
        await weth.connect(owner).deposit({ value: 10000 });
        await weth.connect(owner).transfer(fomo.address, 10000);
        await time.increase(13 * 3600);
        await fomo.connect(owner).distrubtionPool();

        expect(
            await ethers.provider.getBalance(unownedAssetReceiptor.address)
        ).to.be.equal(1000)
    })



});