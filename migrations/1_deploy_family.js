const { deployProxy } = require('@openzeppelin/truffle-upgrades')

const Migrations = artifacts.require("Migrations")
const FOLTokenContract = artifacts.require("FOLToken")
const FamilyContract = artifacts.require("Family")
const LevelsContract = artifacts.require("Levels")
const NodesContract = artifacts.require("Nodes")
const MineContract = artifacts.require("Mine")
const HomeContract = artifacts.require("Home")
const FomoContract = artifacts.require("PoolFomo")
const WeekContract = artifacts.require("PoolWeek")
const RandomContract = artifacts.require("Random")
const CardNFTContract = artifacts.require("CardNFT")

// MockSwap
const WETH = require("../build/swap_core/WETH9.json");
const PancakeFactory = require("../build/swap_core/PancakeFactory.json");
const PancakeRouter = require("../build/swap_core/PancakeRouter.json");

// Swap
async function deployContractByteCode(abi, byteCode, args, from) {
	var contract = new web3.eth.Contract(abi);
	return await contract.deploy({
		data: byteCode,
		arguments: args
	}).send({
		from: from,
		gasPrice: 5e9,
		gas: 6000000,
		// nonce: await web3.eth.getTransactionCount(from)
	})
}

module.exports = async function (deployer, network, accounts) {
	await deployer.deploy(Migrations)

	let owner = accounts[0];
	let devReceiptor = accounts[0];
	let withdrawFeeReceiptor = accounts[0];

	const weth = await deployContractByteCode(WETH.abi, WETH.bytecode, [], accounts[0]);
	weth.address = weth._address;
	console.log(`WETH:${weth.address}`);

	const factory = await deployContractByteCode(PancakeFactory.abi, PancakeFactory.bytecode, [accounts[0]], accounts[0]);
	factory.address = factory._address;
	console.log(`Factory:${factory.address}`);

	const router = await deployContractByteCode(PancakeRouter.abi, PancakeRouter.bytecode, [factory._address, weth._address], accounts[0]);
	router.address = router._address;
	console.log(`Router:${router._address}`);

	const fol = await deployer.deploy(FOLTokenContract, owner)
	const random = await deployProxy(RandomContract, [], { deployer })
	const card = await deployProxy(CardNFTContract, ['ID Card', 'ICN', random.address], { deployer })
	const family = await deployProxy(FamilyContract, ['0x0000000000000000000000000000000000002710', card.address], { deployer })
	const nodes = await deployProxy(NodesContract, [weth.address, card.address], { deployer })
	const levels = await deployProxy(LevelsContract, [family.address, nodes.address, owner, card.address], { deployer })
	const mine = await deployProxy(MineContract, [fol.address, router.address, weth.address, card.address], { deployer })
	const week = await deployProxy(WeekContract, [weth.address, owner, card.address], { deployer })
	const fomo = await deployProxy(FomoContract, [weth.address, owner, card.address], { deployer })

	const home = await deployProxy(HomeContract, [
		weth.address,
		family.address,
		levels.address,
		mine.address,
		week.address,
		fomo.address,
		devReceiptor,
		withdrawFeeReceiptor,
		card.address
	], { deployer })

	// 铸造第一份nft 0x0000000000000000000000000000000000002710
	await card.safeMint(accounts[0])

	const DELEGATE_ROLE = await family.DELEGATE_ROLE();

	await nodes.grantRole(DELEGATE_ROLE, levels.address)
	await family.grantRole(DELEGATE_ROLE, home.address)
	await levels.grantRole(DELEGATE_ROLE, home.address)
	await mine.grantRole(DELEGATE_ROLE, home.address)
	await fomo.grantRole(DELEGATE_ROLE, home.address)
	await week.grantRole(DELEGATE_ROLE, home.address)
	await nodes.grantRole(DELEGATE_ROLE, home.address)

	console.log({
		Router: router.address,
		Factory: factory.address,
		WETH: weth.address
	})
};