import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { CardNFT, Mine, Random } from "../typechain-types";
import { PancakeFactoryDeploy, numberToAddress } from "./Utils";

describe("Mine Contract Test", function () {
    async function deploy() {
        const [_, ...signers] = await ethers.getSigners();
        const { owner, weth, factory, router } = await PancakeFactoryDeploy();

        const FOLToken = await ethers.getContractFactory("FOLToken")
        const MineContract = await ethers.getContractFactory("Mine")
        const RandomContract = await ethers.getContractFactory("Random")
        const CardNFTContract = await ethers.getContractFactory("CardNFT")

        const fol = await FOLToken.deploy(owner.address);


        const randomUpgrades = await upgrades.deployProxy(RandomContract, [])
        const random = (await randomUpgrades.deployed()) as Random
        const cardUpgrades = await upgrades.deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address])
        const card = (await cardUpgrades.deployed()) as CardNFT

        const mineUpgrades = await upgrades.deployProxy(MineContract, [fol.address, router.address, weth.address, card.address]);
        const mine = (await mineUpgrades.deployed()) as Mine

        await fol.connect(owner).transfer(mine.address, await fol.balanceOf(owner.address))
        await mine.grantRole(await mine.DELEGATE_ROLE(), owner.address);

        await card.connect(owner).safeMint(owner.address)

        const accounts = signers.slice(0, 15);
        return { weth, factory, card, router, fol, mine, owner, accounts };
    }

    it("permissions", async function () {
        const { mine, owner, accounts } = await deploy();

        await expect(
            mine.connect(accounts[0]).setMineEnable()
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            mine.connect(accounts[0]).initLiquidity()
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            mine.connect(owner).setMineEnable()
        ).to.be.revertedWith('NoInitedLiquidity')
    });

    it("initLiquidity", async function () {
        const { weth, mine, owner } = await deploy();

        await expect(
            mine.connect(owner).initLiquidity()
        ).to.be.revertedWith("TimeNotYet");

        await time.increase(30 * 86400);

        await expect(
            mine.connect(owner).initLiquidity()
        ).to.be.revertedWith("InsufficientCurrency");

        await weth.connect(owner).deposit({ value: ethers.utils.parseEther('100') });
        await weth.connect(owner).transfer(mine.address, ethers.utils.parseEther('100'));

        await expect(
            mine.connect(owner).initLiquidity()
        ).to.be.fulfilled;
    })

    it("supplyLiquidity", async function () {
        const { weth, card, fol, mine, owner, accounts } = await deploy();

        await expect(
            mine.connect(owner).updateAccountPerShare()
        ).to.be.revertedWith("NotAlreadyEnable");



        // initLiquidity
        await time.increase(30 * 86400);


        const cardIds: string[] = [];
        for (let i = 0; i < accounts.length; i++) {
            await card.connect(accounts[i]).safeMint(accounts[i].address)
            const tokenId = await card.tokenOfOwnerByIndex(accounts[i].address, 0)
            cardIds.push(numberToAddress(tokenId.toNumber()))
        }
        await mine.connect(owner).addPowerDelegate(cardIds[0], ethers.utils.parseEther('2'))

        await weth.connect(owner).deposit({ value: ethers.utils.parseEther('200') });
        await weth.connect(owner).transfer(mine.address, ethers.utils.parseEther('100'));
        await mine.connect(owner).initLiquidity();
        await mine.connect(owner).setMineEnable()

        await time.increase(86400)

        await weth.connect(owner).transfer(mine.address, ethers.utils.parseEther('2'));
        await expect(
            mine.connect(owner).updateAccountPerShare()
        ).to.be.fulfilled
        await expect(
            mine.connect(owner).updateAccountPerShare()
        ).to.be.revertedWith("NotAllowed");

        expect(
            await mine.earned(cardIds[0])
        ).to.be.gt(0);
        await mine.connect(accounts[0]).takeReward(cardIds[0]);
        let accountReward0 = await fol.balanceOf(accounts[0].address);
        expect(
            accountReward0
        ).to.be.gt(0)
        await mine.connect(owner).clearPowerDelegate(cardIds[0]);
        await mine.connect(accounts[0]).takeReward(cardIds[0]);
        await time.increase(86400)
        expect(
            await mine.earned(cardIds[0])
        ).to.be.eq(0);

    })



});