import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Levels, Family, Nodes, Random, CardNFT } from "../typechain-types";
import { PancakeFactoryDeploy, numberToAddress } from "./Utils";
const BaseTokenID = "0x0000000000000000000000000000000000002710";
describe("Levels Contract Test", function () {
    async function deploy() {
        const [...signers] = await ethers.getSigners()
        const { owner, weth, factory, router } = await PancakeFactoryDeploy();

        const RandomContract = await ethers.getContractFactory("Random")
        const CardNFTContract = await ethers.getContractFactory("CardNFT")
        const randomUpgrades = await upgrades.deployProxy(RandomContract, [])
        const random = (await randomUpgrades.deployed()) as Random
        const cardUpgrades = await upgrades.deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address])
        const card = (await cardUpgrades.deployed()) as CardNFT

        const NodesContract = await ethers.getContractFactory("Nodes")
        const nodesUpgrades = await upgrades.deployProxy(NodesContract, [weth.address, card.address])
        const nodes = (await nodesUpgrades.deployed()) as Nodes

        const FamilyContract = await ethers.getContractFactory("Family");
        const familyUpgrades = await upgrades.deployProxy(FamilyContract, [BaseTokenID, card.address])
        const family = (await familyUpgrades.deployed()) as Family

        const LevelsContract = await ethers.getContractFactory("Levels");
        const levelsUpgrades = await upgrades.deployProxy(LevelsContract, [family.address, nodes.address, owner.address, card.address])
        const levels = (await levelsUpgrades.deployed()) as Levels

        await nodes.grantRole(await nodes.DELEGATE_ROLE(), levels.address);

        await levels.connect(owner).grantRole(
            await levels.DELEGATE_ROLE(),
            owner.address
        )

        await card.connect(owner).safeMint(owner.address)

        const accounts = signers.slice(1, 20);
        return { family, card, levels, owner, accounts, nodes };
    }

    let fixture = loadFixture(deploy);
    let cardIds: string[] = [];
    before(async function () {
        await fixture;
    })

    it("upgradeToLevel3", async function () {
        const { owner, levels } = await loadFixture(deploy);
        await expect(
            levels.upgradeToLevel3(BaseTokenID)
        ).to.be.revertedWith('NeedPayment')

        await levels.connect(owner).upgradeToLevel3(BaseTokenID, { value: ethers.utils.parseEther('10') })
        expect(await levels.levelOf(BaseTokenID)).to.be.equal(3);
    })

    it("make relations", async function () {
        const { family, card, accounts } = await fixture;
        for (let i = 0; i < accounts.length; i++) {
            await card.connect(accounts[i]).safeMint(accounts[i].address)
            const tokenId = await card.tokenOfOwnerByIndex(accounts[i].address, 0)
            cardIds.push(numberToAddress(tokenId.toNumber()))
        }

        // Make Relations
        // Owner -> 0
        await family.connect(accounts[0]).makeRelation(BaseTokenID, cardIds[0]);
        // 0 -> 1,2
        await family.connect(accounts[1]).makeRelation(cardIds[0], cardIds[1]);
        await family.connect(accounts[2]).makeRelation(cardIds[0], cardIds[2]);
        // 1 -> 3, 4
        await family.connect(accounts[3]).makeRelation(cardIds[1], cardIds[3]);
        await family.connect(accounts[4]).makeRelation(cardIds[1], cardIds[4]);
        // 2 -> 5, 6
        await family.connect(accounts[5]).makeRelation(cardIds[2], cardIds[5]);
        await family.connect(accounts[6]).makeRelation(cardIds[2], cardIds[6]);
        // 3 -> 7
        await family.connect(accounts[7]).makeRelation(cardIds[3], cardIds[7]);
        // 4 -> 8
        await family.connect(accounts[8]).makeRelation(cardIds[4], cardIds[8]);
        // 5 -> 9
        await family.connect(accounts[9]).makeRelation(cardIds[5], cardIds[9]);
        // 6 -> 10
        await family.connect(accounts[10]).makeRelation(cardIds[6], cardIds[10]);
    })

    it("test 0 -> 1", async function () {

        const { card, levels, owner, accounts } = await fixture;

        // 7,8,9,10 => 5
        // 3,4,5,6 => 1 Start
        await levels.connect(owner).increaseDelegate(cardIds[7], ethers.utils.parseEther("10"))
        await levels.connect(owner).increaseDelegate(cardIds[8], ethers.utils.parseEther("10"))
        await levels.connect(owner).increaseDelegate(cardIds[9], ethers.utils.parseEther("10"))
        await levels.connect(owner).increaseDelegate(cardIds[10], ethers.utils.parseEther("10"))
        await levels.connect(owner).updateStartDelegate(cardIds[3], 1)
        await levels.connect(owner).updateStartDelegate(cardIds[4], 1)
        await levels.connect(owner).updateStartDelegate(cardIds[5], 1)
        await levels.connect(owner).updateStartDelegate(cardIds[6], 1)

        for (let account of accounts.slice(3, 7)) {
            const tokenId = await card.tokenOfOwnerByIndex(account.address, 0)
            const cardAddr = numberToAddress(tokenId.toNumber())
            expect(
                await levels.connect(account).callStatic.levelUpgrade([], cardAddr).then(r => r.current)
            ).to.be.equal(1)

            await expect(
                levels.connect(account).levelUpgrade([], cardAddr)
            ).to.be.fulfilled

            expect(
                await levels.levelOf(cardAddr)
            ).to.be.equal(1)
        }
    })

    it("test 0 -> 2", async function () {
        // 1,2 => 2 Start
        const { levels, owner, accounts } = await fixture;

        expect(await levels.connect(accounts[1]).callStatic.levelUpgrade([cardIds[3], cardIds[4]], cardIds[1])
            .then(r => r.current))
            .to.be.equal(0)

        expect(await levels.connect(accounts[2]).callStatic.levelUpgrade([cardIds[5], cardIds[6]], cardIds[2])
            .then(r => r.current))
            .to.be.equal(0)

        await levels.connect(owner).increaseDelegate(cardIds[1], ethers.utils.parseEther("10"))
        await levels.connect(owner).increaseDelegate(cardIds[2], ethers.utils.parseEther("10"))
        await levels.connect(owner).updateStartDelegate(cardIds[1], 2)
        await levels.connect(owner).updateStartDelegate(cardIds[2], 2)

        expect(await levels.connect(accounts[1]).callStatic.levelUpgrade([cardIds[3], cardIds[4]], cardIds[1])
            .then(r => r.current))
            .to.be.equal(2)

        expect(await levels.connect(accounts[2]).callStatic.levelUpgrade([cardIds[5], cardIds[6]], cardIds[2])
            .then(r => r.current))
            .to.be.equal(2)

        await levels.connect(accounts[1]).levelUpgrade([cardIds[3], cardIds[4]], cardIds[1])
        await levels.connect(accounts[2]).levelUpgrade([cardIds[5], cardIds[6]], cardIds[2])

        expect(await levels.levelOf(cardIds[1]))
            .to.be.equal(2)
        expect(await levels.levelOf(cardIds[2]))
            .to.be.equal(2)
    });

    it("test 0 -> 3", async function () {
        const { family, levels, owner, accounts } = await fixture;

        expect(await levels.connect(accounts[0]).callStatic.levelUpgrade([cardIds[1], cardIds[2]], cardIds[0])
            .then(r => r.current))
            .to.be.equal(0)

        await levels.connect(owner).increaseDelegate(cardIds[0], ethers.utils.parseEther("10"))
        await levels.connect(owner).updateStartDelegate(cardIds[0], 3)

        expect(await levels.connect(accounts[0]).callStatic.levelUpgrade([
            cardIds[1],
            cardIds[2]
        ], cardIds[0]).then(r => r.current)).to.be.equal(3)

        await expect(levels.connect(accounts[0]).callStatic.levelUpgrade([
            cardIds[3],
            cardIds[4]
        ], cardIds[0])).to.be.revertedWith("InvaildChild")

        await levels.connect(accounts[0]).levelUpgrade([cardIds[1], cardIds[2]], cardIds[0])

        expect(await levels.levelOf(cardIds[0]))
            .to.be.equal(3)
    });

    it("test reward distrubutionsForefathers (layer + level)", async function () {
        const { family, levels, owner, accounts } = await fixture;

        // 1 -> 11 -> 12 -> 13 -> 14 -> 15
        await family.connect(accounts[11]).makeRelation(cardIds[1], cardIds[11]);
        await family.connect(accounts[12]).makeRelation(cardIds[11], cardIds[12]);
        await family.connect(accounts[13]).makeRelation(cardIds[12], cardIds[13]);
        await family.connect(accounts[14]).makeRelation(cardIds[13], cardIds[14]);
        await family.connect(accounts[15]).makeRelation(cardIds[14], cardIds[15]);

        // make 3,4,11 upgrade to level 3
        await levels.connect(accounts[3]).upgradeToLevel3(cardIds[3], { value: ethers.utils.parseEther('1') });
        await levels.connect(accounts[4]).upgradeToLevel3(cardIds[4], { value: ethers.utils.parseEther('1') });
        await levels.connect(accounts[11]).upgradeToLevel3(cardIds[11], { value: ethers.utils.parseEther('1') });

        expect(await levels.levelOf(cardIds[3])).to.be.equal(3);
        expect(await levels.levelOf(cardIds[4])).to.be.equal(3);
        expect(await levels.levelOf(cardIds[11])).to.be.equal(3);

        // make 1 upgrade to level 4
        await levels.connect(owner).updateStartDelegate(cardIds[1], 4);
        expect(await levels.connect(accounts[1]).callStatic.levelUpgrade([
            cardIds[3],
            cardIds[4],
            cardIds[11],
        ], cardIds[1]).then(r => r.current)).to.be.equal(4)

        await levels.connect(accounts[1]).levelUpgrade([
            cardIds[3],
            cardIds[4],
            cardIds[11],
        ], cardIds[1])

        expect(await levels.levelOf(cardIds[1])).to.be.equal(4);

        let reward15 = await levels.connect(accounts[15]).distrubutionsForefathers(cardIds[15], ethers.utils.parseEther("100"), 50);
        expect(reward15.length).to.be.equal(5, 'only has 5 level reward infos')

        // Account[11]: Level + Layer
        expect(reward15[0].rewardType).to.be.equal(0);
        expect(reward15[0].account).to.be.equal(cardIds[11]);
        expect(reward15[0].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(12).div(100)
        );
        expect(reward15[1].rewardType).to.be.equal(1);
        expect(reward15[1].account).to.be.equal(cardIds[11]);
        expect(reward15[1].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(2).div(100)
        );

        // Account[1] : Level + Layer
        expect(reward15[2].rewardType).to.be.equal(0);
        expect(reward15[2].account).to.be.equal(cardIds[1]);
        expect(reward15[2].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(4).div(100)
        );
        expect(reward15[3].rewardType).to.be.equal(1);
        expect(reward15[3].account).to.be.equal(cardIds[1]);
        expect(reward15[3].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(2).div(100)
        );

        // Account[0] : Layer
        expect(reward15[4].rewardType).to.be.equal(1);
        expect(reward15[4].account).to.be.equal(cardIds[0]);
        expect(reward15[4].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(2).div(100)
        );

        let reward14 = await levels.distrubutionsForefathers(cardIds[14], ethers.utils.parseEther("100"), 128);
        expect(reward14.length).to.be.equal(5, 'only has 3 level + 2 layer reward infos')

        // account 11 has level + layer
        expect(reward14[0].rewardType).to.be.equal(0);
        expect(reward14[0].account).to.be.equal(cardIds[11]);
        expect(reward14[0].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(12).div(100)
        );
        expect(reward14[1].rewardType).to.be.equal(1);
        expect(reward14[1].account).to.be.equal(cardIds[11]);
        expect(reward14[1].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(2).div(100)
        );

        // account 1 has level + layer
        expect(reward14[2].rewardType).to.be.equal(0);
        expect(reward14[2].account).to.be.equal(cardIds[1]);
        expect(reward14[2].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(4).div(100)
        );

        expect(reward14[3].rewardType).to.be.equal(1);
        expect(reward14[3].account).to.be.equal(cardIds[1]);
        expect(reward14[3].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(2).div(100)
        );

        // Account[0] : Layer
        expect(reward15[4].rewardType).to.be.equal(1);
        expect(reward15[4].account).to.be.equal(cardIds[0]);
        expect(reward15[4].amount).to.be.equal(
            ethers.utils.parseEther('100').mul(2).div(100)
        );
    });

    it("max depth search gas test", async function () {
        const { owner, family, levels, accounts, nodes } = await deploy();
    })

    it("permissions", async function () {
        const { owner, card, family, levels, accounts, nodes } = await loadFixture(deploy);

        await expect(
            levels.initialize(family.address, nodes.address, accounts[0].address, card.address)
        ).to.be.revertedWith('Initializable: contract is already initialized');

        await expect(
            levels.connect(accounts[0]).updateStartDelegate(cardIds[0], 1)
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            levels.connect(accounts[0]).increaseDelegate(cardIds[0], 100)
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            levels.connect(accounts[0]).setLevelRewardRatios([0.3e12])
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            levels.connect(accounts[0]).setLayerRewardRatios([0.3e12])
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            levels.connect(accounts[0]).setLayerRewardDepths([3, 3, 3, 3, 3])
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await levels.connect(owner).setLevelRewardRatios([0.3e12]);
        expect(await levels.levelRewardRatios(0)).to.be.equal(0.3e12)

        await levels.connect(owner).setLayerRewardRatios([0.3e12])
        expect(await levels.layerRewardRatios(0)).to.be.equal(0.3e12)

        await levels.connect(owner).setLayerRewardDepths([3])
        expect(await levels.layerRewardDepths(0)).to.be.equal(3)
    })
});