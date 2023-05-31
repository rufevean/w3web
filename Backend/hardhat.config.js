require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config({ path: __dirname + "/.env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: { optimizer: { enabled: true, runs: 200 } },
  },

  accounts: {
    privateKeys: [""],
  },
  networks: {
    apothem: {
      url: "https://erpc.apothem.network",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
