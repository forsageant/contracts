import PancakeFactory from "../build/swap_core/PancakeFactory.json"
import PancakeRouter from "../build/swap_core/PancakeRouter.json"
import WETH9 from "../build/swap_core/WETH9.json"

import { ethers } from "hardhat";

export async function PancakeFactoryDeploy() {
    const [owner] = await ethers.getSigners();

    const WETH9Artifact = new ethers.ContractFactory(WETH9.abi, WETH9.bytecode, owner)

    const PancakeFacotryArtifact = new ethers.ContractFactory(PancakeFactory.abi, PancakeFactory.bytecode, owner);
    const PancakeRouterArtifact = new ethers.ContractFactory(PancakeRouter.abi, PancakeRouter.bytecode, owner);

    const weth = await WETH9Artifact.deploy();
    const factory = await PancakeFacotryArtifact.deploy(weth.address);
    const router = await PancakeRouterArtifact.deploy(factory.address, weth.address);

    return { owner, weth, factory, router }
}

export function numberToAddress(num: number) {
    let hex = num.toString(16);
    while (hex.length < 40) {
        hex = '0' + hex;
    }
    return ethers.utils.getAddress('0x' + hex);
}