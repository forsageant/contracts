import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "solidity-coverage";

const config: HardhatUserConfig = {
  networks: {
    hardhat: {
      accounts: {
        count: 30,
        accountsBalance: "10000000000000000000000000"
      },
    },
  },
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 20000
      }
    }
  },
  gasReporter: {
    // enabled: (process.env.REPORT_GAS) ? true : false,
    enabled: true,
    gasPrice: 3,
    token: "BNB",
  }
};

export default config;