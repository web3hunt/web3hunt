/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import { config as dotEnvConfig } from "dotenv";
import { nodeUrl, accounts } from "./utils/network";
dotEnvConfig();
import { HardhatUserConfig } from "hardhat/types";
import '@typechain/hardhat';
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import {tasks} from "./tasks/tasks";

tasks()

const {
  API_URL,
  PRIVATE_KEY,
  MATIC_PRIVATE_KEY,
  MAINNET_PRIVATE_KEY,
  API_URL_RINKEBY,
  API_URL_POLYGON,
  ETHERSCAN,
  POLYGONSCAN,
  API_URL_POLYGON_MAINNET,
  API_URL_MAINNET,
} = process.env;


const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        runs: 200,
        enabled: true,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    localhost: {
      url: nodeUrl("localhost"),
      accounts: accounts(),
    },
    rinkeby: {
      url: nodeUrl("rinkeby"),
      accounts: accounts("rinkeby"),
    },
    mainnet: {
      url: nodeUrl("mainnet"),
      accounts: accounts("mainnet"),
    },
    mumbai: {
      url: nodeUrl("mumbai"),
      accounts: accounts("mumbai"),
      chainId: 80001
    },
    optimism_kovan: {
      url: nodeUrl("optimism_kovan"),
      accounts: accounts("optimism_kovan"),
      chainId: 69
    }
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./tests",
    deploy: "./deploy",
    root: "./",
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.CMC_API_KEY,
    maxMethodDiff: 10,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
    alwaysGenerateOverloads: false,
  },
  mocha: {
    timeout: 0,
  },
};

export default config;