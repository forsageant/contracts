import { time, loadFixture, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Levels, Family, Nodes, Mine, FOLToken, Home, PoolWeek, Random, CardNFT } from "../typechain-types";
import { BigNumber } from "ethers";
import { PancakeFactoryDeploy, numberToAddress } from "./Utils";

const parseEther = (ether: string | number) => ethers.utils.parseEther(ether.toString());

const SUM = (...numbers: BigNumber[]) => {
    let sum = BigNumber.from(0);
    numbers.forEach(v => {
        sum = sum.add(v);
    })
    return sum;
}

const DEPOSIT_LIMIT_MIN = ethers.utils.parseEther("0.1");
const DEPOSIT_LIMIT_MAX = ethers.utils.parseEther("1");
const BYTES6_NULL = "0x000000000000";
const NullAddress = "0x0000000000000000000000000000000000000000";
const BaseTokenID = "0x0000000000000000000000000000000000002710";

describe("Home Contract Test", function () {
    async function deploy() {
        const [_, devReceiptor, withdrawFeeReceiptor, ...signers] = await ethers.getSigners()
        const { owner, weth, factory, router } = await PancakeFactoryDeploy();

        setBalance(owner.address, ethers.utils.parseEther("1000000"))


        const FOLTokenContract = await ethers.getContractFactory("FOLToken")
        const FamilyContract = await ethers.getContractFactory("Family")
        const LevelsContract = await ethers.getContractFactory("Levels")
        const NodesContract = await ethers.getContractFactory("Nodes")
        const MineContract = await ethers.getContractFactory("Mine")
        const HomeContract = await ethers.getContractFactory("Home")
        const FomoContract = await ethers.getContractFactory("PoolFomo")
        const WeekContract = await ethers.getContractFactory("PoolWeek")
        const RandomContract = await ethers.getContractFactory("Random")
        const CardNFTContract = await ethers.getContractFactory("CardNFT")

        const fol = await FOLTokenContract.deploy(owner.address);

        const randomUpgrades = await upgrades.deployProxy(RandomContract, [])
        const random = (await randomUpgrades.deployed()) as Random
        const cardUpgrades = await upgrades.deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address])
        const card = (await cardUpgrades.deployed()) as CardNFT

        const familyUpgrades = await upgrades.deployProxy(FamilyContract, [BaseTokenID, card.address])
        const family = (await familyUpgrades.deployed()) as Family

        const nodesUpgrades = await upgrades.deployProxy(NodesContract, [weth.address, card.address])
        const nodes = (await nodesUpgrades.deployed()) as Nodes

        const levelsUpgrades = await upgrades.deployProxy(LevelsContract, [family.address, nodes.address, owner.address, card.address])
        const levels = (await levelsUpgrades.deployed()) as Levels

        const mineUpgrades = await upgrades.deployProxy(MineContract, [fol.address, router.address, weth.address, card.address])
        const mine = (await mineUpgrades.deployed()) as Mine

        const weekUpgrades = await upgrades.deployProxy(WeekContract, [weth.address, owner.address, card.address])
        const week = (await weekUpgrades.deployed()) as PoolWeek

        const fomoUpgrades = await upgrades.deployProxy(FomoContract, [weth.address, owner.address, card.address])
        const fomo = (await fomoUpgrades.deployed()) as PoolWeek

        const homeUpgrades = await upgrades.deployProxy(HomeContract, [
            weth.address,
            family.address,
            levels.address,
            mine.address,
            week.address,
            fomo.address,
            devReceiptor.address,
            withdrawFeeReceiptor.address,
            card.address
        ])
        const home = (await homeUpgrades.deployed()) as Home;

        const DELEGATE_ROLE = await family.DELEGATE_ROLE();
        await nodes.connect(owner).grantRole(DELEGATE_ROLE, levels.address)
        await family.connect(owner).grantRole(DELEGATE_ROLE, home.address)
        await levels.connect(owner).grantRole(DELEGATE_ROLE, home.address)
        await mine.connect(owner).grantRole(DELEGATE_ROLE, home.address)
        await fomo.connect(owner).grantRole(DELEGATE_ROLE, home.address)
        await week.connect(owner).grantRole(DELEGATE_ROLE, home.address)
        await nodes.connect(owner).grantRole(DELEGATE_ROLE, home.address)

        await card.connect(owner).safeMint(owner.address)

        const accounts = signers;
        setBalance(accounts[0].address, ethers.utils.parseEther("1000000"))
        return {
            owner, weth, factory, router, devReceiptor, withdrawFeeReceiptor, accounts,
            family, fol, fomo, home, levels, mine, nodes, week, card
        };
    }

    let fixture = loadFixture(deploy);
    let cardIds: string[] = [];
    before(async function () {
        await fixture;
    })

    // after(async function () {
    //     const accounts = await ethers.getSigners();
    //     for (let account of accounts) {
    //         await setBalance(account.address, ethers.utils.parseEther("100000"))
    //     }

    // })

    it("permission test", async function () {
        const { owner, weth, family, home, mine, fomo, week, accounts, levels, card } = await deploy();

        await expect(
            home.initialize(
                weth.address,
                family.address,
                levels.address,
                mine.address,
                week.address,
                fomo.address,
                accounts[0].address,
                accounts[0].address,
                card.address
            )
        ).to.be.revertedWith('Initializable: contract is already initialized');

        // setWithdrawFeeReceiptor
        await expect(
            home.connect(accounts[0]).setWithdrawFeeReceiptor(accounts[0].address)
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            home.connect(owner).setWithdrawFeeReceiptor(owner.address)
        ).to.be.fulfilled

        await expect(
            home.connect(owner).setWithdrawFeeReceiptor(NullAddress)
        ).to.be.revertedWith('ReceiptorIsNullAddress')

        // setWithdrawFeeRatioAtLevel
        await expect(
            home.connect(accounts[0]).setWithdrawFeeRatioAtLevel(1, 0.05e12)
        ).to.be.revertedWith(/AccessControl.*is missing role/)

        await expect(
            home.connect(owner).setWithdrawFeeRatioAtLevel(1, 0.1e12)
        ).to.be.fulfilled

        await expect(
            home.connect(owner).setWithdrawFeeRatioAtLevel(1, 1.00e12 + 1)
        ).to.be.revertedWith('InvaildRatio')
    })

    it("deposit and check amount distrubution", async function () {
        const { owner, weth, family, home, mine, fomo, week, accounts, card } = await fixture;
        for (let i = 0; i < accounts.length; i++) {
            await card.connect(owner).safeMint(accounts[i].address)
            const tokenId = await card.tokenOfOwnerByIndex(accounts[i].address, 0)
            cardIds.push(numberToAddress(tokenId.toNumber()))
        }

        await expect(
            home.deposit(BaseTokenID, { value: DEPOSIT_LIMIT_MIN.sub(1) })
        ).to.be.rejectedWith("AmountOutOfRange")

        await expect(
            home.deposit(BaseTokenID, { value: DEPOSIT_LIMIT_MAX.add(1) })
        ).to.be.rejectedWith("AmountOutOfRange")

        await expect(
            home.deposit(cardIds[0], { value: DEPOSIT_LIMIT_MAX })
        ).to.be.rejectedWith("invalid cardAddr")

        await expect(
            family.connect(accounts[0]).makeRelation(BaseTokenID, cardIds[0])
        ).to.be.fulfilled

        await expect(
            home.connect(accounts[0]).deposit(cardIds[0], { value: DEPOSIT_LIMIT_MAX })
        ).to.be.fulfilled

        // take 1.5 multiple power at mine
        expect(
            (await mine.connect(accounts[0]).minerInfoOf(cardIds[0])).power
        ).to.be.equal(DEPOSIT_LIMIT_MAX.mul(150).div(100))

        // mine has 30%
        expect(
            await weth.balanceOf(mine.address)
        ).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100))

        // // fomo has 3%
        expect(
            await weth.balanceOf(fomo.address)
        ).to.be.equal(DEPOSIT_LIMIT_MAX.mul(3).div(100))

        // // week has 3%
        expect(
            await weth.balanceOf(week.address)
        ).to.be.equal(DEPOSIT_LIMIT_MAX.mul(3).div(100))

        // // use code to make relations and test deposit once reward
        for (let i = 1; i < 10; i++) {
            await family.connect(accounts[i]).makeRelation(cardIds[i - 1], cardIds[i])
            await home.connect(accounts[i]).deposit(cardIds[i], { value: DEPOSIT_LIMIT_MAX })

            expect(
                await home.earned(cardIds[i - 1])
            ).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100))
        }
    })

    it("deposited start count check", async function () {
        const { owner, levels, home, accounts } = await fixture;

        for (let i = 1; i < 10; i++) {
            //await setBalance(accounts[i].address, ethers.utils.parseEther('10'))
            for (let j = 0; j < i - 1; j++) {
                if (j >= 3) {
                    await home.connect(accounts[i]).deposit(cardIds[i], { value: ethers.utils.parseEther("4") })
                } else {
                    await home.connect(accounts[i]).deposit(cardIds[i], { value: DEPOSIT_LIMIT_MAX });
                }

            }

            expect(
                await levels.startOf(cardIds[i])
            ).to.be.equal(i)
        }
    });

    it("deposit share reward check", async function () {
        const { owner, weth, family, home, mine, fomo, week, accounts } = await fixture;

        // Account[0] taked reward from: 1
        expect(await home.earned(cardIds[0])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(1))

        // Account[1] taked reward count: 2
        expect(await home.earned(cardIds[1])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(1))

        // Account[2] taked reward count: 3,4
        expect(await home.earned(cardIds[2])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(2))

        // Account[3] taked reward count: 4,5,6
        expect(await home.earned(cardIds[3])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(3))

        // Account[4] taked reward count: 5,6,7,8
        expect(await home.earned(cardIds[4])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(4))

        // Account[5] taked reward count: 6,7,8,9

        expect(await home.earned(cardIds[5])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(4))

        // Account[6] taked reward count: 7,8,9,
        expect(await home.earned(cardIds[6])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(3))

        // Account[7] taked reward count: 8,9
        expect(await home.earned(cardIds[7])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(2))

        // Account[8] taked reward count: 9
        expect(await home.earned(cardIds[8])).to.be.equal(DEPOSIT_LIMIT_MAX.mul(30).div(100))

        let beforTakeRewardBalance: { [key: number]: BigNumber } = {
            0: await ethers.provider.getBalance(accounts[0].address),
            5: await ethers.provider.getBalance(accounts[5].address),
            8: await ethers.provider.getBalance(accounts[8].address),
        }

        await home.connect(accounts[0]).takeReward(cardIds[0]);
        await home.connect(accounts[5]).takeReward(cardIds[5]);
        await home.connect(accounts[8]).takeReward(cardIds[8]);

        // set lv 0 fee ratio
        await home.connect(owner).setWithdrawFeeRatioAtLevel(0, 0.1e12);

        // Account 0 take reward
        let account0Reward = DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(1);
        expect(
            await ethers.provider.getBalance(accounts[0].address).then(b => b.sub(beforTakeRewardBalance[0]))
        ).to.be.within(
            account0Reward.mul(0.9e12).div(1e12).sub(0.005e18), // tx fee
            account0Reward
        )

        // Account 5 take reward
        let account5Reward = DEPOSIT_LIMIT_MAX.mul(30).div(100).mul(4);
        expect(
            await ethers.provider.getBalance(accounts[5].address).then(b => b.sub(beforTakeRewardBalance[5]))
        ).to.be.within(
            account5Reward.mul(0.9e12).div(1e12).sub(0.005e18), // tx fee
            account5Reward
        )

        // Account 8 take reward
        let account8Reward = DEPOSIT_LIMIT_MAX.mul(30).div(100);
        expect(
            await ethers.provider.getBalance(accounts[8].address).then(b => b.sub(beforTakeRewardBalance[8]))
        ).to.be.within(
            account8Reward.mul(0.9e12).div(1e12).sub(0.005e18), // tx fee
            account8Reward
        )
    });
});