import { HardhatUserConfig } from "hardhat/config";
require('@openzeppelin/hardhat-upgrades');
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {version: "0.8.18",settings: { optimizer: { enabled: true, runs: 200 } } },
};

export default config;
