import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";
import { Mine } from "../typechain-types";
import { PancakeFactoryDeploy } from "./Utils";

const Szabo_1 = ethers.utils.parseUnits('1', 12);
const NullAddress = "0x0000000000000000000000000000000000000000";


describe("Token Fee Test", function () {
    async function deploy() {
        const [...signers] = await ethers.getSigners();
        const { owner, weth, factory, router } = await PancakeFactoryDeploy();

        const FOLToken = await ethers.getContractFactory("FOLToken")
        const fol = await FOLToken.deploy(owner.address);

        const accounts = signers.slice(0, 15);
        return { weth, factory, router, fol, owner, accounts };
    }

    it("initLiquidity", async function () {
        const { weth, factory, router, fol, owner, accounts } = await deploy();

        await weth.connect(owner).deposit({ value: ethers.utils.parseEther("1000") });
        await weth.connect(owner).approve(router.address, ethers.utils.parseEther("1000"));
        await fol.connect(owner).approve(router.address, ethers.utils.parseEther("10000"));

        await router.addLiquidity(
            weth.address,
            fol.address,
            ethers.utils.parseEther("1000"),
            ethers.utils.parseEther("10000"),
            0,
            0,
            owner.address,
            (await time.latest()) + 86400
        )
    })

    it("addPair, removePair", async function () {
        const { weth, factory, router, fol, owner, accounts } = await deploy();

        let pairAddress = await factory.getPair(weth.address, fol.address);

        // test add
        await expect(
            fol.connect(accounts[1]).addPair(pairAddress)
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).addPair(pairAddress)
        ).to.be.fulfilled;

        await expect(
            fol.connect(owner).addPair(pairAddress)
        ).to.be.revertedWith('pair already exist')

        // test remove
        await expect(
            fol.connect(accounts[1]).removePair(pairAddress)
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).removePair(accounts[0].address)
        ).to.be.revertedWith('pair not found');

        await expect(
            fol.connect(owner).removePair(pairAddress)
        ).to.be.fulfilled

        await expect(
            fol.connect(owner).removePair(pairAddress)
        ).to.be.revertedWith('pair not found');
    })

    it("setSellFee, setBuyFee", async function () {
        const { weth, factory, router, fol, owner, accounts } = await deploy();

        // set sell fee
        await expect(
            fol.connect(accounts[1]).setSellFee(
                ethers.utils.parseUnits("0.1", 12)
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).setSellFee(
                ethers.utils.parseUnits("1", 12).add(1)
            )
        ).to.be.revertedWith('sellFee must leq 1e12')

        await expect(
            fol.connect(owner).setSellFee(
                ethers.utils.parseUnits("0.1", 12)
            )
        ).to.be.fulfilled

        expect(
            await fol.sellFee()
        ).to.be.equal(ethers.utils.parseUnits("0.1", 12))

        // set buy fee
        await expect(
            fol.connect(accounts[1]).setBuyFee(
                ethers.utils.parseUnits("0.1", 12)
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).setBuyFee(
                ethers.utils.parseUnits("1", 12).add(1)
            )
        ).to.be.revertedWith('buyFee must leq 1e12')

        await expect(
            fol.connect(owner).setBuyFee(
                ethers.utils.parseUnits("0.1", 12)
            )
        ).to.be.fulfilled

        expect(
            await fol.buyFee()
        ).to.be.equal(ethers.utils.parseUnits("0.1", 12))
    })

    it("setBuyPreAddress, setSellPreAddress", async function () {
        const { weth, factory, router, fol, owner, accounts } = await deploy();

        await expect(
            fol.connect(accounts[1]).setBuyPreAddress(
                accounts[1].address
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(accounts[1]).setSellPreAddress(
                accounts[1].address
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).setBuyPreAddress(
                accounts[1].address
            )
        ).to.be.fulfilled

        await expect(
            fol.connect(owner).setSellPreAddress(
                accounts[1].address
            )
        ).to.be.fulfilled

        expect(await fol.sellPreAddress()).to.be.equal(accounts[1].address)
        expect(await fol.buyPreAddress()).to.be.equal(accounts[1].address)

        await expect(fol.connect(owner).setSellPreAddress(NullAddress)).to.be.revertedWith('not zero')
        await expect(fol.connect(owner).setBuyPreAddress(NullAddress)).to.be.revertedWith('not zero')
    })


    it("addGuarded, removeGuarded, isGuardedOf", async function () {
        const { weth, factory, router, fol, owner, accounts } = await deploy();

        // add
        await expect(
            fol.connect(accounts[1]).addGuarded(
                owner.address
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).addGuarded(
                owner.address
            )
        ).to.be.fulfilled

        await expect(
            fol.connect(owner).addGuarded(
                owner.address
            )
        ).to.be.revertedWith("account already exist")

        expect(await fol.isGuardedOf(owner.address)).to.be.true

        // remove
        await expect(
            fol.connect(accounts[1]).removeGuarded(
                owner.address
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).removeGuarded(
                owner.address
            )
        ).to.be.fulfilled

        await expect(
            fol.connect(owner).removeGuarded(
                owner.address
            )
        ).to.be.revertedWith("account not exist")

        expect(await fol.isGuardedOf(owner.address)).to.be.false
    })

    it("addBlocked, removeBlocked, isBlockedOf", async function () {
        const { weth, factory, router, fol, owner, accounts } = await deploy();

        // add
        await expect(
            fol.connect(accounts[1]).addBlocked(
                owner.address
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).addBlocked(
                owner.address
            )
        ).to.be.fulfilled

        await expect(
            fol.connect(owner).addBlocked(
                owner.address
            )
        ).to.be.revertedWith("account already exist")

        expect(await fol.isBlockedOf(owner.address)).to.be.true

        // remove
        await expect(
            fol.connect(accounts[1]).removeBlocked(
                owner.address
            )
        ).to.be.revertedWith('Ownable: caller is not the owner')

        await expect(
            fol.connect(owner).removeBlocked(
                owner.address
            )
        ).to.be.fulfilled

        await expect(
            fol.connect(owner).removeBlocked(
                owner.address
            )
        ).to.be.revertedWith("account not exist")

        expect(await fol.isBlockedOf(owner.address)).to.be.false
    })

    it("clim", async function () {
        const { weth, factory, router, fol, owner, accounts } = await deploy();

        await weth.connect(owner).deposit({ value: 2e10 })
        await weth.connect(owner).transfer(fol.address, 1e10)

        await expect(
            fol.connect(accounts[1]).clim(weth.address, accounts[1].address)
        ).to.be.fulfilled

        expect(
            await weth.balanceOf(accounts[1].address)
        ).to.be.equal(0)

        await expect(
            fol.connect(owner).clim(weth.address, accounts[1].address)
        ).to.be.fulfilled

        expect(
            await weth.balanceOf(accounts[1].address)
        ).to.be.equal(1e10)

        await weth.connect(owner).transfer(fol.address, 1e10)
        await fol.connect(owner).setBuyPreAddress(accounts[2].address);
        await expect(
            fol.connect(owner).clim(weth.address, accounts[2].address)
        ).to.be.fulfilled
        expect(
            await weth.balanceOf(accounts[2].address)
        ).to.be.equal(1e10)
    })

    describe("BuyFee and SellFee", () => {
        let fixture = loadFixture(deploy);

        before(async function () {
            const { weth, factory, router, fol, owner, accounts } = await fixture;

            await fol.connect(owner).setBuyPreAddress(accounts[2].address);

            // initLiquidity
            await weth.connect(owner).deposit({ value: ethers.utils.parseEther("1000") });
            await weth.connect(owner).approve(router.address, ethers.utils.parseEther("1000"));
            await fol.connect(owner).approve(router.address, ethers.utils.parseEther("10000"));
            await router.addLiquidity(
                weth.address,
                fol.address,
                ethers.utils.parseEther("1000"),
                ethers.utils.parseEther("10000"),
                0,
                0,
                owner.address,
                (await time.latest()) + 86400
            )
            const pairAddress = await factory.getPair(weth.address, fol.address);
            await fol.connect(owner).addPair(pairAddress);
        })

        it("buy", async function () {
            const { weth, factory, router, fol, owner, accounts } = await fixture;
            async function doSwapTokenToToken() {
                await weth.connect(accounts[1]).deposit({ value: ethers.utils.parseEther("100") })
                await weth.connect(accounts[1]).approve(router.address, ethers.utils.parseEther("100"));
                return router.connect(accounts[1]).swapExactTokensForTokensSupportingFeeOnTransferTokens(
                    ethers.utils.parseEther('100'),
                    0,
                    [weth.address, fol.address],
                    accounts[1].address,
                    (await time.latest()) + 86400
                )
            }

            const buyFee = await fol.buyFee();
            const buyPreAddress = await fol.buyPreAddress();
            const outAmount = await router.getAmountsOut(ethers.utils.parseEther("100"), [weth.address, fol.address]).then((outs: any[]) => outs[outs.length - 1]);

            await fol.connect(owner).addBlocked(accounts[1].address);
            await expect(doSwapTokenToToken()).to.be.revertedWith("Pancake: TRANSFER_FAILED");

            await fol.connect(owner).removeBlocked(accounts[1].address);
            await expect(doSwapTokenToToken()).to.be.fulfilled

            const buyFeeAmount = outAmount.mul(buyFee).div(Szabo_1);

            expect(
                await fol.balanceOf(buyPreAddress)
            ).to.be.within(
                buyFeeAmount.mul(99).div(100),
                buyFeeAmount.mul(101).div(100)
            )

            expect(
                await fol.balanceOf(accounts[1].address)
            ).to.be.within(
                outAmount.sub(buyFeeAmount).mul(99).div(100),
                outAmount.sub(buyFeeAmount)
            )
            await fol.connect(accounts[1]).transfer(owner.address, await fol.balanceOf(accounts[1].address));

            // add account[1] to guard
            await fol.connect(owner).addGuarded(accounts[1].address);
            const outAmount2 = await router.getAmountsOut(ethers.utils.parseEther("100"), [weth.address, fol.address]).then((outs: any[]) => outs[outs.length - 1]);
            await doSwapTokenToToken()
            await fol.connect(owner).removeGuarded(accounts[1].address);

            expect(
                await fol.balanceOf(accounts[1].address)
            ).to.be.within(
                outAmount2.mul(99).div(100),
                outAmount2.mul(101).div(100)
            )
        })

        it("sell", async function () {
            const { weth, factory, router, fol, owner, accounts } = await fixture;

            await fol.connect(owner).setSellPreAddress(accounts[3].address);
            async function doSwapTokenToToken() {
                await weth.connect(accounts[1]).transfer(owner.address, await weth.balanceOf(accounts[1].address));
                await fol.connect(owner).transfer(accounts[1].address, ethers.utils.parseEther("100"));
                await fol.connect(accounts[1]).approve(router.address, ethers.utils.parseEther("100"));
                return router.connect(accounts[1]).swapExactTokensForTokensSupportingFeeOnTransferTokens(
                    ethers.utils.parseEther('100'),
                    0,
                    [fol.address, weth.address],
                    accounts[1].address,
                    (await time.latest()) + 86400
                )
            }

            const sellFee = await fol.sellFee();
            const sellFeeAmount = ethers.utils.parseEther("100").mul(sellFee).div(Szabo_1);
            const sellPreAddress = await fol.sellPreAddress();
            const outAmount = await router.getAmountsOut(ethers.utils.parseEther("100").sub(sellFeeAmount), [fol.address, weth.address]).then((outs: any[]) => outs[outs.length - 1]);

            await fol.connect(owner).addBlocked(accounts[1].address);
            await expect(doSwapTokenToToken()).to.be.revertedWith("blocked!");

            await fol.connect(owner).removeBlocked(accounts[1].address);
            await expect(doSwapTokenToToken()).to.be.fulfilled

            expect(
                await fol.balanceOf(sellPreAddress)
            ).to.be.within(
                sellFeeAmount.mul(99).div(100),
                sellFeeAmount.mul(101).div(100)
            )
            expect(
                await weth.balanceOf(accounts[1].address)
            ).to.be.within(
                outAmount.mul(99).div(100),
                outAmount
            )
            await weth.connect(accounts[1]).transfer(owner.address, await weth.balanceOf(accounts[1].address));

            // add account[1] to guard
            await fol.connect(owner).addGuarded(accounts[1].address);
            const outAmount2 = await router.getAmountsOut(ethers.utils.parseEther("100"), [fol.address, weth.address]).then((outs: any[]) => outs[outs.length - 1]);
            await doSwapTokenToToken()
            await fol.connect(owner).removeGuarded(accounts[1].address);

            expect(
                await weth.balanceOf(accounts[1].address)
            ).to.be.within(
                outAmount2.mul(99).div(100),
                outAmount2.mul(101).div(100)
            )
        });
    })

});