const hre = require("hardhat");
const env = require("dotenv");
const ethers = hre.ethers;

async function main() {
  // Deploy contracts
  await deployContracts();
}

async function deployContracts() {
  // Deploy ArxNFT contract
  const ArxNFT = await ethers.getContractFactory("ArxNFT");
  const arxToken = await ethers.getContractFactory("ArxToken");

  // Deploy ArxPropertyManager contract
  const ArxPropertyManager = await ethers.getContractFactory(
    "ArxPropertyManager"
  );
  const arxPropertyManager = await ArxPropertyManager.deploy();
  await arxPropertyManager.deployed();
  console.log(
    "ArxPropertyManager contract deployed:",
    arxPropertyManager.address
  );

  const ArxNFT_instance = await arxPropertyManager.arxNFTAddress();
  const arxNFT = await ArxNFT.attach(ArxNFT_instance);
  console.log("ArxNFT contract deployed:", arxNFT.address);

  // Call listProperty function in ArxPropertyManager contract with sample data
  const listPropertyTx = await arxPropertyManager.listProperty(
    "0xC4f712633963A60Ba700913BEbbABDb13D29598e",
    "https://raw.githubusercontent.com/Sud0-AP/web3athon/main/Backend/contracts/Nft_metadata/metadata.json",
    "ArxRealEstate",
    "A 0014, 68th st. Los Santos, San Andreas, USA",
    "Villa 8BHK",
    "1500 Sq. Ft.",
    "8BHK Villa in Los Santos, San Andreas, USA",
    10000,
    "VillaLosSantos#1",
    "VLS"
  );
  await listPropertyTx.wait();
  console.log("Property listed successfully.");

  // Get the latest token ID
  const latestTokenId = await arxNFT.getLatestTokenId();
  console.log("Latest NFT token ID:", latestTokenId.toString());

  // Get the ArxToken contract address for the latest token ID
  const arxTokenAddress = await arxPropertyManager.returnArxTokenAddress(
    latestTokenId
  );
  console.log("Deployed ArxToken contract address:", arxTokenAddress);

  // Deploy Timelock contract
  const Timelock = await ethers.getContractFactory("Timelock");
  const timelock = await Timelock.deploy(
    100,
    [
      "0x0aF6Da4A119EA2CD63017a549509AC750cdeC06E",
      "0x9F68bFb0be48089B99773b4c27A3559124B24D92",
    ], // Array of proposers addresses
    ["0xC4f712633963A60Ba700913BEbbABDb13D29598e"] // Array of executors addresses
  );
  await timelock.deployed();
  console.log("Timelock contract deployed:", timelock.address);

  // Deploy ArxTokenGovernance contract
  const ArxTokenGovernance = await ethers.getContractFactory(
    "ArxTokenGovernance"
  );
  const arxTokenGovernance = await ArxTokenGovernance.deploy(
    arxTokenAddress, // Address of the ArxToken contract for the latest token ID
    timelock.address // Address of the deployed Timelock contract
  );
  await arxTokenGovernance.deployed();
  console.log(
    "ArxTokenGovernance contract deployed:",
    arxTokenGovernance.address
  );

  console.log("Setting the sales for sale for the latest token ID...");

  const setSharesForSaleTx = await arxPropertyManager.putSharesForSale(
    latestTokenId,
    ethers.utils.parseEther("10")
  );
  await setSharesForSaleTx.wait();
  console.log("Shares set for sale successfully.");

  const signer1 = ethers.Wallet(process.env.PRIVATE_KEY1, hre.network.provider);

  console.log(
    "Buying the shares for the latest token ID... from another account"
  );

  arxToken = await ArxNFT.attach(arxTokenAddress);
  arxToken = arxToken.connect(signer1);

  let buyShrares = await arxToken.purchaseShare(100, {
    value: ethers.utils.parseEther("0.1"),
  });
  await buyShrares.wait();
  console.log("Shares bought transaction hash: ", buyShrares.hash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
