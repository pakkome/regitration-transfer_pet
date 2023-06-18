require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// 0x76d903dB2508796d5704d948b22bbdff9a2aDc39
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


module.exports = {
  solidity: "0.8.4",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [process.env.ACCOUNT_PRIVATE_KEY],
    }
  }


  // module.exports = {
  //   defaultNetwork: "goerli",
  //   networks: {
  //     hardhat: {
  //     },
  //     goerli: {
  //       url: process.env.ALCHEMY_GOERLI_URL,
  //       accounts: [process.env.ACCOUNT_PRIVATE_KEY]
  //     }
  //   },
  //   solidity: {
  //     version: "0.8.0",
  //     settings: {
  //       optimizer: {
  //         enabled: true,
  //         runs: 200
  //       }
  //     }
  //   },
  //   paths: {
  //     sources: "./contracts",
  //     tests: "./test",
  //     cache: "./cache",
  //     artifacts: "./artifacts"
  //   },
  //   mocha: {
  //     timeout: 40000
  //   }
  };

