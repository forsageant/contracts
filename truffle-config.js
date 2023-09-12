//const HDWalletProvider = require('@truffle/hdwallet-provider');
//const { Migrater } = require("@qytech/truffle-migrater");
const { env } = require("process");

module.exports = {
  networks: {
    localhost: {
      host: "192.168.31.178",
      port: 8549,
      gasPrice: 3e9,
      network_id: '*' // Match any network id
    },

    localtest: {
      host: "127.0.0.1",
      port: 8546,
      gasPrice: 3e9,
      network_id: '*' // Match any network id
    },
    // bsc_test: {
    //   provider: () => new HDWalletProvider(
    //     process.env.TEST_BSC_DEPLOY_PK,
    //     process.env.TEST_BSC_DEPLOY_HTTP_RPC
    //   ),
    //   network_id: 56,
    //   networkCheckTimeout: 60000,
    //   skipDryRun: true
    // },
    // bsc_pk: {
    //   provider: () => new Migrater.PrivateKeySignProvider({
    //     privateKey: [env.PROD_PRIVATEKEY],
    //     httpURL: env.PROD_RPC,
    //     chainId: 56,
    //   }),
    //   network_id: 56,
    //   networkCheckTimeout: 60000,
    //   gasPrice: 3e9,
    //   skipDryRun: true
    // },
    // bsc_sign: {
    //   provider: () => new Migrater.USBPartSignProvider({
    //     addresses: ['0x571ea47ae6ccf01eff7fc32247ba838671b5394f'.toLowerCase()],
    //     httpURL: env.PROD_RPC,
    //     chainId: 56,
    //   }),
    //   network_id: '*',
    //   networkCheckTimeout: 60000,
    //   gasPrice: 3e9,
    //   skipDryRun: true
    // },
    // bsc_part: {
    //   provider: () => new Migrater.USBPartProvider({
    //     addresses: ['0x571ea47ae6ccf01eff7fc32247ba838671b5394f'.toLowerCase()],
    //     httpURL: env.PROD_RPC,
    //     chainId: 56,
    //   }),
    //   network_id: '*',
    //   networkCheckTimeout: 60000,
    //   gasPrice: 4e9,
    //   skipDryRun: true
    // }
  },
  mocha: {
    timeout: 3600000,
    // npm install -g mochawesome
    reporter: 'mochawesome'
  },
  compilers: {
    solc: {
      version: "0.8.10",
      docker: false,
      settings: {
        optimizer: {
          enabled: true,
          runs: 20000
        },
      }
    }
  }
};
