import { time, setBalance, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { PancakeFactoryDeploy, numberToAddress } from "./Utils";
import { CardNFT, Random } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";




describe("NFT Test", function () {
    async function deploy() {
        const [...signers] = await ethers.getSigners();
        const { owner } = await PancakeFactoryDeploy()


        const RandomContract = await ethers.getContractFactory("Random")
        const CardNFTContract = await ethers.getContractFactory("CardNFT")

        const randomUpgrades = await upgrades.deployProxy(RandomContract, [])
        const random = (await randomUpgrades.deployed()) as Random
        const cardUpgrades = await upgrades.deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address])
        const card = (await cardUpgrades.deployed()) as CardNFT
        const accounts = signers.slice(0, 15);
        return { card, random, owner, accounts };
    }




    it("setBaseUrl", async function () {
        const { card, owner, accounts } = await loadFixture(deploy)
        await expect(
            card.connect(accounts[1]).setBaseUrl("http://www.baidu.com/")
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            card.connect(owner).setBaseUrl('http://www.baidu.com/')
        ).to.be.fulfilled;
    })

    it("initializable", async function () {
        const { card, random } = await loadFixture(deploy)
        // test initialize
        await expect(
            card.initialize('ID Card', 'ICN', random.address)
        ).to.be.revertedWith('Initializable: contract is already initialized');

    })

    it("safeMint,approve,setApprovalForAll,transferFrom,safeTransferFrom,burn", async function () {
        const { card, owner, accounts } = await loadFixture(deploy)
        await setBalance(accounts[1].address, ethers.utils.parseEther('100000'));
        // test safeMint

        await expect(
            card.connect(owner).safeMint(accounts[1].address)
        ).to.be.fulfilled;
        const tokenID = await card.tokenOfOwnerByIndex(accounts[1].address, 0)
        // test approve transferFrom
        await expect(
            card.connect(owner).transferFrom(accounts[1].address, owner.address, tokenID)
        ).to.be.revertedWith('ERC721: transfer caller is not owner nor approved')

        await expect(
            card.connect(accounts[1]).approve(owner.address, tokenID)
        ).to.be.fulfilled;

        await expect(
            card.connect(owner).transferFrom(accounts[1].address, owner.address, tokenID)
        ).to.be.fulfilled

        // test setApprovalForAll safeTransferFrom
        await expect(
            card.connect(accounts[1])["safeTransferFrom(address,address,uint256)"](owner.address, accounts[1].address, tokenID)
        ).to.be.revertedWith('ERC721: transfer caller is not owner nor approved')

        await expect(
            card.connect(owner).setApprovalForAll(accounts[1].address, true)
        ).to.be.fulfilled;

        await expect(
            card.connect(accounts[1])["safeTransferFrom(address,address,uint256)"](owner.address, accounts[1].address, tokenID)
        ).to.be.fulfilled;

        // test burn
        await expect(
            card.connect(accounts[1]).burn(tokenID)
        ).to.be.fulfilled;
    })

});