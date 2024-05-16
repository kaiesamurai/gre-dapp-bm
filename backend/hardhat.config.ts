// import { HardhatUserConfig, task } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//     console.log((await account.getBalance()).toString());
//   }
// });


// const config: HardhatUserConfig = {
//   paths: { tests: "tests" },
//   networks: {hardhat: {hardfork: "merge"}},
//   solidity: {
//       version: "0.8.18",
//       settings: {
//         optimizer: {
//           enabled: false,
//           runs: 0,
//         },
//       },
//     }
// };

// export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()
//import "@openzeppelin/hardhat-upgrades"
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import "@nomiclabs/hardhat-etherscan";
//import "@nomicfoundation/hardhat-verify";

//import "@nomiclabs/hardhat-ethers";

// const walletPrivateKey =  `${process.env.PRIVATE_KEY}`

const config: HardhatUserConfig = {
  // solidity: "0.8.0",
  paths: { tests: "tests" },
  solidity: {
    version: '0.8.16',
    settings: {
      evmVersion: process.env.EVM_VERSION || 'london',
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          peephole: true,
          inliner: true,
          jumpdestRemover: true,
          orderLiterals: true,
          deduplicate: true,
          cse: true,
          constantOptimizer: true,
          yul: true,
          yulDetails: {
            stackAllocation: true,
          },
        },
      },

    },

  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    filecoinCalibrationNet: {
      url: "https://filecoin-calibration.chainstacklabs.com/rpc/v1",
      chainId: 314159,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    filecoinMainnet: {
      url: "https://api.node.glif.io", //'https://rpc.ankr.com/filecoin_testnet', //https://filecoin-hyperspace.chainstacklabs.com/rpc/v1
      chainId: 314,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    mumbai: {
      url: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
      chainId: 80001,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    arbitrumGoerli: {
      url: "https://goerli-rollup.arbitrum.io/rpc",
      chainId: 421613,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    snowtrace: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io/",
      chainId: 534351,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
  typechain: {
    target: "ethers-v5"
  },
  etherscan: {
    apiKey: {
      polygon: "7RQGFQS84Q5FNNF84YQ61T3MQDJ5Y1EB1B" ?? "",
      polygonMumbai: "7RQGFQS84Q5FNNF84YQ61T3MQDJ5Y1EB1B" ?? "",
      goerli: "1T7UC6DGWNA36AVHC4IGIRRE1MTGCSKE74" ?? "",
      arbitrumGoerli: "BWEYRFH5RWRPMMDNAG5WVMQGGEWRS754R6" ?? "",
      snowtrace: "snowtrace",
      avalancheFujiTestnet: "snowtrace",
      bscTestnet: "CAUR6FE9SVKV8IAEQ6M2C1768T3YIC3KIU",
      scrollSepolia: "QMHHTU8FD4RPAS6QCA6X4ZBNPXPJHVCH5T"
    },
    customChains: [
      {
        network: "scrollSepolia",
        chainId: 534351,
        urls: {
          apiURL: "https://api-sepolia.scrollscan.com/api",
          browserURL: "https://sepolia.scrollscan.com"
        }
      }
    ]
  },

};

export default config;