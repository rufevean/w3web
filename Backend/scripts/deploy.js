const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {

  // Deploy contracts
  await deployContracts();


}

async function deployContracts() {
  
  // Deploy ArxNFT contract
  const ArxNFT = await ethers.getContractFactory('ArxNFT');
  const arxNFT = await ArxNFT.deploy();
  await arxNFT.deployed();
  console.log('ArxNFT contract deployed:', arxNFT.address);

  // Deploy ArxPropertyManager contract
  const ArxPropertyManager = await ethers.getContractFactory('ArxPropertyManager');
  const arxPropertyManager = await ArxPropertyManager.deploy();
  await arxPropertyManager.deployed();
  console.log('ArxPropertyManager contract deployed:', arxPropertyManager.address);

  // Call listProperty function in ArxPropertyManager contract with sample data
  const listPropertyTx = await arxPropertyManager.listProperty(
    '<TO_ADDRESS>',
    '<URI>',
    '<LEGAL_OWNER>',
    '<PROPERTY_ADDRESS>',
    '<PROPERTY_TYPE>',
    '<PROPERTY_SIZE>',
    '<PROPERTY_DESCRIPTION>',
    10000,
    '<TOKEN_NAME>',
    '<TOKEN_SYMBOL>'
  );
  await listPropertyTx.wait();
  console.log('Property listed successfully.');

  // Get the latest token ID
  const latestTokenId = await arxNFT.getLatestTokenId();

  // Get the ArxToken contract address for the latest token ID
  const arxTokenAddress = await arxPropertyManager.returnArxTokenAddress(latestTokenId);

  // Deploy Timelock contract
  const Timelock = await ethers.getContractFactory('Timelock');
  const timelock = await Timelock.deploy(
    50400,
    ['<PROPOSER_ADDRESS_1>', '<PROPOSER_ADDRESS_2>'], // Array of proposers addresses
    ['<EXECUTOR_ADDRESS_1>', '<EXECUTOR_ADDRESS_2>'], // Array of executors addresses
  );
  await timelock.deployed();
  console.log('Timelock contract deployed:', timelock.address);

  // Deploy ArxTokenGovernance contract
  const ArxTokenGovernance = await ethers.getContractFactory('ArxTokenGovernance');
  const arxTokenGovernance = await ArxTokenGovernance.deploy(
    arxTokenAddress, // Address of the ArxToken contract for the latest token ID
    timelock.address // Address of the deployed Timelock contract
  );
  await arxTokenGovernance.deployed();
  console.log('ArxTokenGovernance contract deployed:', arxTokenGovernance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
