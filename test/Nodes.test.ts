import { time, loadFixture, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { CardNFT, Nodes, Random } from "../typechain-types"
import { PancakeFactoryDeploy, numberToAddress } from "./Utils";


describe("Nodes Contract Test", function () {
    async function deploy() {
        const [...signers] = await ethers.getSigners();
        const { owner, weth, factory, router } = await PancakeFactoryDeploy();

        const NodesContract = await ethers.getContractFactory("Nodes")
        const RandomContract = await ethers.getContractFactory("Random")
        const CardNFTContract = await ethers.getContractFactory("CardNFT")

        const randomUpgrades = await upgrades.deployProxy(RandomContract, [])
        const random = (await randomUpgrades.deployed()) as Random
        const cardUpgrades = await upgrades.deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address])
        const card = (await cardUpgrades.deployed()) as CardNFT
        const nodesUpgrades = await upgrades.deployProxy(NodesContract, [weth.address, card.address])
        const nodes = (await nodesUpgrades.deployed()) as Nodes

        await card.connect(owner).safeMint(owner.address)
        await nodes.grantRole(await nodes.DELEGATE_ROLE(), owner.address);

        const accounts = signers.slice(1, 16);
        return { weth, nodes, card, owner, accounts, router, factory };
    }

    let fixture = loadFixture(deploy);
    let cardIds: string[] = [];

    it("distrubutionReward by empty power", async function () {
        const { weth, nodes, owner, accounts } = await deploy();
        await weth.connect(owner).approve(nodes.address, ethers.utils.parseEther("100"))
        await expect(
            nodes.connect(owner).distrubutionReward(ethers.utils.parseEther("100"))
        ).to.be.revertedWith("TotalPowerIsZero");
    })

    it("add miner and distubution reward", async function () {
        const { weth, nodes, card, owner, accounts } = await deploy();

        for (let i = 0; i < accounts.length; i++) {
            await card.connect(accounts[i]).safeMint(accounts[i].address)
            const tokenId = await card.tokenOfOwnerByIndex(accounts[i].address, 0)
            cardIds.push(numberToAddress(tokenId.toNumber()))
        }

        await nodes.connect(owner).setNoderPowerDelegate(cardIds[0], 2);
        await nodes.connect(owner).setNoderPowerDelegate(cardIds[0], 1);

        await nodes.connect(owner).setNoderPowerDelegate(cardIds[1], 2);
        await nodes.connect(owner).setNoderPowerDelegate(cardIds[1], 1);

        await nodes.connect(owner).setNoderPowerDelegate(cardIds[2], 0);
        await nodes.connect(owner).setNoderPowerDelegate(cardIds[2], 1);

        await setBalance(owner.address, ethers.utils.parseEther("2000000"));
        await weth.connect(owner).deposit({ value: ethers.utils.parseEther("1000000") })

        await weth.connect(owner).approve(nodes.address, ethers.utils.parseEther("30"))
        await nodes.connect(owner).distrubutionReward(ethers.utils.parseEther("30"))

        expect(
            await nodes.earned(cardIds[0])
        ).to.be.equal(ethers.utils.parseEther("10"))

        expect(
            await nodes.earned(cardIds[1])
        ).to.be.equal(ethers.utils.parseEther("10"))

        expect(
            await nodes.earned(cardIds[2])
        ).to.be.equal(ethers.utils.parseEther("10"))

        await nodes.connect(accounts[0]).takeReward(cardIds[0])
        await nodes.connect(accounts[0]).takeReward(cardIds[0])
        await nodes.connect(accounts[1]).takeReward(cardIds[1])

        expect(
            await weth.balanceOf(accounts[0].address)
        ).to.be.equal(ethers.utils.parseEther("10"))

        expect(
            await weth.balanceOf(accounts[1].address)
        ).to.be.equal(ethers.utils.parseEther("10"))


        expect(
            await weth.balanceOf(nodes.address)
        ).to.be.equal(ethers.utils.parseEther("10"))

        await weth.connect(owner).approve(nodes.address, ethers.utils.parseEther("30"))
        await nodes.connect(owner).distrubutionReward(ethers.utils.parseEther("30"))

        expect(
            await nodes.earned(cardIds[2])
        ).to.be.equal(ethers.utils.parseEther("20"))
        await nodes.connect(accounts[2]).takeReward(cardIds[2])

        expect(
            await weth.balanceOf(accounts[2].address)
        ).to.be.equal(ethers.utils.parseEther("20"))

        ////////////////////////////////////////////////
        await nodes.connect(owner).setNoderPowerDelegate(cardIds[0], 0);
        await nodes.connect(owner).setNoderPowerDelegate(cardIds[1], 0);
        await weth.connect(owner).approve(nodes.address, ethers.utils.parseEther("30"))
        await nodes.connect(owner).distrubutionReward(ethers.utils.parseEther("30"))

        await nodes.connect(accounts[0]).takeReward(cardIds[0])
        await nodes.connect(accounts[1]).takeReward(cardIds[1])
        await nodes.connect(accounts[2]).takeReward(cardIds[2])

        expect(
            await weth.balanceOf(accounts[0].address)
        ).to.be.equal(ethers.utils.parseEther("20"))
        expect(
            await weth.balanceOf(accounts[1].address)
        ).to.be.equal(ethers.utils.parseEther("20"))
        expect(
            await weth.balanceOf(accounts[2].address)
        ).to.be.equal(ethers.utils.parseEther("50"))
    })
});