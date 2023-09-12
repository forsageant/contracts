import { time, loadFixture, setBalance } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { CardNFT, PoolWeek, Random } from "../typechain-types";
import { PancakeFactoryDeploy, numberToAddress } from "./Utils";
import { BigNumber } from "ethers";

const Szabo_1 = ethers.utils.parseUnits('1', 12);
const NullAddress = "0x0000000000000000000000000000000000000000";

describe("Fomo Contract Test", function () {
    async function deploy() {
        const [_, unownedAssetReceiptor, ...signers] = await ethers.getSigners();
        const { owner, weth, factory, router } = await PancakeFactoryDeploy();

        const WeekContract = await ethers.getContractFactory("PoolWeek");
        const RandomContract = await ethers.getContractFactory("Random")
        const CardNFTContract = await ethers.getContractFactory("CardNFT")

        const randomUpgrades = await upgrades.deployProxy(RandomContract, [])
        const random = (await randomUpgrades.deployed()) as Random
        const cardUpgrades = await upgrades.deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address])
        const card = (await cardUpgrades.deployed()) as CardNFT
        const weekUpgrades = await upgrades.deployProxy(WeekContract, [weth.address, unownedAssetReceiptor.address, card.address])
        const week = (await weekUpgrades.deployed()) as PoolWeek

        await card.connect(owner).safeMint(owner.address)
        await week.connect(owner).grantRole(await week.DELEGATE_ROLE(), owner.address);

        const accounts = signers.slice(0, 15);
        return { weth, factory, router, card, week, owner, accounts, unownedAssetReceiptor };
    }

    after(async () => {
        const [owner, unownedAssetReceiptor, ...accounts] = await ethers.getSigners();
        await setBalance(accounts[0].address, ethers.utils.parseEther('100000'));
        await setBalance(accounts[1].address, ethers.utils.parseEther('100000'));
        await setBalance(accounts[2].address, ethers.utils.parseEther('100000'));
        await setBalance(unownedAssetReceiptor.address, ethers.utils.parseEther('100000'));
    })

    it("initialize, depositedDelegate permission test", async function () {
        const { weth, factory, card, router, week, owner, accounts } = await loadFixture(deploy);

        await expect(
            week.initialize(weth.address, accounts[0].address, card.address)
        ).to.be.revertedWith('Initializable: contract is already initialized');

        await expect(
            week.connect(accounts[0]).depositedDelegate(accounts[0].address, 1000, 1000)
        ).to.be.revertedWith(/AccessControl.*is missing role/)
    });

    it("depositedDelegate and check sortable", async function () {
        const { week, card, owner, accounts } = await loadFixture(deploy);

        const cardIds: string[] = [];
        for (let i = 0; i < accounts.length; i++) {
            await card.connect(accounts[i]).safeMint(accounts[i].address)
            const tokenId = await card.tokenOfOwnerByIndex(accounts[i].address, 0)
            cardIds.push(numberToAddress(tokenId.toNumber()))
        }
        let depositedList: { account: string, amount: BigNumber }[] = [];
        for (let i = 0; i < 10; i++) {
            for (let card of cardIds) {
                let randomAmount = BigNumber.from(Math.floor(100000 * Math.random()))
                await week.connect(owner).depositedDelegate(card, randomAmount, randomAmount);
                let index = depositedList.findIndex(e => e.account == card);
                if (index >= 0) {
                    depositedList[index].amount = depositedList[index].amount.add(randomAmount);
                } else {
                    depositedList.push({
                        account: card,
                        amount: randomAmount
                    })
                }
            }
        }

        depositedList = depositedList.sort((a, b) => b.amount.toNumber() - a.amount.toNumber())
        let currentEpochIndex = await week.currentIndex();
        let contractTops = await week.topAddressInfoAtEpoch(currentEpochIndex);

        for (let i = 0; i < contractTops.addresses.length; i++) {
            expect(
                contractTops.addresses[i],
                `Address inconsistent sorting at ${i}`
            ).to.be.equal(depositedList[i].account)

            expect(
                contractTops.amounts[i],
                `Amounts inconsistent sorting at ${i}`
            ).to.be.equal(depositedList[i].amount)
        }
    })

    it("distrubtionAtEpoch", async function () {
        const { weth, week, card, owner, accounts, unownedAssetReceiptor } = await loadFixture(deploy);

        // targetEpochIndex < currentEpochIndex
        await expect(
            week.connect(owner).distrubtionAtEpoch(0)
        ).to.be.revertedWith('InvaildEpochInfo')

        // epochInfo.totalReward > 0
        await time.increase(7 * 86400);
        await expect(
            week.connect(owner).distrubtionAtEpoch(0)
        ).to.be.revertedWith('InvaildEpochInfo')

        const cardIds: string[] = [];
        for (let i = 0; i < accounts.length; i++) {
            await card.connect(accounts[i]).safeMint(accounts[i].address)
            const tokenId = await card.tokenOfOwnerByIndex(accounts[i].address, 0)
            cardIds.push(numberToAddress(tokenId.toNumber()))
        }

        // at epochIndex 1
        let totalAmountValue = 0;
        for (let i = 0; i < 9; i++) {
            let account = cardIds[i]
            await week.connect(owner).depositedDelegate(account, (i + 1) * 1000, (i + 1) * 1000);
            totalAmountValue += (i + 1) * 1000;
        }

        let contractTops = await week.topAddressInfoAtEpoch(1);

        async function chukAddress(cardAddr: string) {
            return await card.ownerOfAddr(cardAddr)
        }

        await setBalance(unownedAssetReceiptor.address, 0);
        for (let i = 0; i < contractTops.addresses.length; i++) {
            if (contractTops.addresses[i] !== NullAddress) {
                await setBalance(await chukAddress(contractTops.addresses[i]), 0)
            }
        }

        await time.increase(7 * 86400);
        await weth.connect(owner).deposit({ value: totalAmountValue });
        await weth.connect(owner).transfer(week.address, totalAmountValue);
        await week.connect(owner).distrubtionAtEpoch(1)

        // Desc 1
        expect(await ethers.provider.getBalance(await chukAddress(contractTops.addresses[0]))).to.be.equal(Math.floor(totalAmountValue * 0.5 * 0.5))
        // // Desc 2
        expect(await ethers.provider.getBalance(await chukAddress(contractTops.addresses[1]))).to.be.equal(Math.floor(totalAmountValue * 0.5 * 0.2))

        // Desc 3-9
        for (let i = 2; i < 8; i++) {
            expect(await ethers.provider.getBalance(await chukAddress(contractTops.addresses[i]))).to.be.equal(Math.floor(totalAmountValue * 0.5 * 0.3 / 8))
        }

        // Desc 10 is null address
        expect(await ethers.provider.getBalance(unownedAssetReceiptor.address))
            .to.be.within(
                Math.floor(totalAmountValue * 0.5 * 0.3 / 8 * 0.99),
                Math.floor(totalAmountValue * 0.5 * 0.3 / 8 * 1.01),
            )
    });

    after(async () => {
        const [owner, unownedAssetReceiptor, ...accounts] = await ethers.getSigners();
        for (let account of [owner, unownedAssetReceiptor, ...accounts]) {
            if (account.address !== NullAddress) {
                await setBalance(account.address, ethers.utils.parseEther('100000'))
            }
        }
    })
});