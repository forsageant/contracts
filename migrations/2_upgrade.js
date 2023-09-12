const { upgradeProxy } = require('@openzeppelin/truffle-upgrades')

const Migrations = artifacts.require("Migrations")
const FOLTokenContract = artifacts.require("FOLToken")
const FamilyContract = artifacts.require("Family")
const CardNFT = artifacts.require("CardNFT")
const NodesContract = artifacts.require("Nodes")
const MineContract = artifacts.require("Mine")
const HomeContract = artifacts.require("Home")
const FomoContract = artifacts.require("PoolFomo")
const WeekContract = artifacts.require("PoolWeek")

module.exports = async function (deployer, network, accounts) {
    const family = await FamilyContract.deployed();
    await upgradeProxy(family, FamilyContract, { deployer })

    // const card = await CardNFT.deployed()
    // await upgradeProxy(card, CardNFT, { deployer })
};