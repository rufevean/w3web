const hre = require("hardhat");
const env = require("dotenv");
const ethers = hre.ethers;

async function main() {
  // Deploy contracts
  await deployContracts();

  // List a property
  // await listProperty(
  //   "0x851356ae760d987E095750cCeb3bC6014560891C",
  //   "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //   "https://raw.githubusercontent.com/Sud0-AP/web3athon/main/Backend/contracts/Nft_metadata/metadata.json",
  //   "ArxRealEstate",
  //   "A 0014, 68th st. Los Santos, San Andreas, USA",
  //   "Villa 8BHK",
  //   "1500 Sq. Ft.",
  //   "8BHK Villa in Los Santos, San Andreas, USA",
  //   "VillaLosSantos#2",
  //   "VLS",
  //   10000
  // );

  // buy shares
  // await buyShares(
  //   "0xbA94C268049DD87Ded35F41F6D4C7542b4BdB767",
  //   "0x851356ae760d987E095750cCeb3bC6014560891C",
  //   1,
  //   100
  // );

  // sell shares
  //await sellShares(
  //   0xbA94C268049DD87Ded35F41F6D4C7542b4BdB767,
  //   0x851356ae760d987E095750cCeb3bC6014560891C,
  //   10
  // );
}

async function deployContracts() {
  // Deploy ArxNFT contract
  const ArxNFT = await ethers.getContractFactory("ArxNFT");
  let ArxToken = await ethers.getContractFactory("ArxToken");

  // Deploy ArxPropertyManager contract
  const ArxPropertyManager = await ethers.getContractFactory(
    "ArxPropertyManager"
  );
  const arxPropertyManager = await ArxPropertyManager.deploy();
  await arxPropertyManager.deployed();
  console.log(
    "\nArxPropertyManager contract deployed:",
    arxPropertyManager.address,
    "\n"
  );

  const ArxNFT_instance = await arxPropertyManager.arxNFTAddress();
  const arxNFT = await ArxNFT.attach(ArxNFT_instance);
  console.log("\nArxNFT contract deployed:", arxNFT.address, "\n");

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
    "VLS",
    { gasLimit: 5000000 }
  );
  await listPropertyTx.wait();
  console.log("\nProperty listed successfully.\n");

  // Get the latest token ID
  const latestTokenId = await arxNFT.getLatestTokenId();
  console.log("\nLatest NFT token ID:", latestTokenId.toString(), "\n");

  // Get the ArxToken contract address for the latest token ID
  const arxTokenAddress = await arxPropertyManager.returnArxTokenAddress(
    latestTokenId
  );
  console.log("\nDeployed ArxToken contract address:", arxTokenAddress, "\n");

  // Deploy Timelock contract
  const Timelock = await ethers.getContractFactory("TimeLock");
  const timelock = await Timelock.deploy(
    100,
    [
      "0x0aF6Da4A119EA2CD63017a549509AC750cdeC06E",
      "0x9F68bFb0be48089B99773b4c27A3559124B24D92",
    ], // Array of proposers addresses
    ["0xC4f712633963A60Ba700913BEbbABDb13D29598e"] // Array of executors addresses
  );
  await timelock.deployed();
  console.log("\nTimelock contract deployed:", timelock.address, "\n");

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
    "\nArxTokenGovernance contract deployed:",
    arxTokenGovernance.address,
    "\n"
  );

  console.log("\nSetting the sales for sale for the latest token ID...\n");

  const setSharesForSaleTx = await arxPropertyManager.putSharesForSale(
    latestTokenId,
    ethers.utils.parseEther("10")
  );
  await setSharesForSaleTx.wait();
  console.log(
    "\nShares set for sale successfully at price of " +
      ethers.utils.parseEther("10") +
      " ETH\n"
  );

  const signer1 = new ethers.Wallet(process.env.PRIVATE_KEY1, ethers.provider);

  console.log(
    "\nBuying the shares for the latest token ID... from another account\n"
  );

  let arxToken = await ArxToken.attach(arxTokenAddress).connect(signer1);

  let payment = (await arxToken.getTokenPrice(100)) / 1000000000000000000;

  console.log(
    "\nPayment: " +
      (
        ethers.utils.parseEther(payment.toString()) / 1000000000000000000
      ).toString() +
      " ETH\n"
  );

  let buyShrares = await arxToken.purchaseShare(100, {
    value: ethers.utils.parseEther(payment.toString()),
  });
  await buyShrares.wait();
  console.log("\nShares bought transaction hash: ", buyShrares.hash, "\n");
}

async function listProperty(
  managerAddress,
  ownerAddress,
  metadata,
  propertyName,
  propertyType,
  propertyAddress,
  propertyDescription,
  propertySize,
  tokenName,
  tokenSymbol,
  propertyShares
) {
  // Deploy ArxNFT contract
  const ArxNFT = await ethers.getContractFactory("ArxNFT");
  //let ArxToken = await ethers.getContractFactory("ArxToken");
  const ArxPropertyManager = await ethers.getContractFactory(
    "ArxPropertyManager"
  );

  const arxPropertyManager = await ArxPropertyManager.attach(managerAddress);
  const ArxNFT_instance = await arxPropertyManager.arxNFTAddress();
  const arxNFT = await ArxNFT.attach(ArxNFT_instance);

  const listPropertyTx = await arxPropertyManager.listProperty(
    ownerAddress,
    metadata,
    propertyName,
    propertyAddress,
    propertyType,
    propertySize,
    propertyDescription,
    propertyShares,
    tokenName,
    tokenSymbol,
    { gasLimit: 5000000 }
  );

  await listPropertyTx.wait();
  console.log("\nProperty listed successfully.\n");

  // Get the latest token ID
  const latestTokenId = await arxNFT.getLatestTokenId();
  console.log("\nLatest NFT token ID:", latestTokenId.toString(), "\n");

  // Get the ArxToken contract address for the latest token ID
  const arxTokenAddress = await arxPropertyManager.returnArxTokenAddress(
    latestTokenId
  );
  console.log("\nDeployed ArxToken contract address:", arxTokenAddress, "\n");
}

async function buyShares(
  arxTokenAddress,
  managerAddress,
  tokenId,
  shareAmount
) {
  let ArxToken = await ethers.getContractFactory("ArxToken");
  const ArxPropertyManager = await ethers.getContractFactory(
    "ArxPropertyManager"
  );

  const signer1 = new ethers.Wallet(process.env.PRIVATE_KEY1, ethers.provider);

  const arxPropertyManager = await ArxPropertyManager.attach(managerAddress);
  let arxToken = await ArxToken.attach(arxTokenAddress); //.connect(signer1); // add this connect statement if you are using a real network other than localhost

  let SharesStatus = await arxToken.sharesForSale();

  if (!(await SharesStatus)) {
    console.log("\nSetting the sales for sale for the latest token ID...\n");

    const setSharesForSaleTx = await arxPropertyManager.putSharesForSale(
      tokenId,
      ethers.utils.parseEther("10")
    );
    await setSharesForSaleTx.wait();
    console.log(
      "\nShares set for sale successfully at price of " +
        ethers.utils.parseEther("10") +
        " ETH\n"
    );
    await buyShares(arxTokenAddress, managerAddress, tokenId, shareAmount);
  } else {
    console.log(
      "\nBuying the shares for the given token ID... from another account\n"
    );

    let payment =
      (await arxToken.getTokenPrice(shareAmount)) / 1000000000000000000;

    console.log(
      "\nPayment: " +
        (
          ethers.utils.parseEther(payment.toString()) / 1000000000000000000
        ).toString() +
        " ETH\n"
    );

    let buyShrares = await arxToken.purchaseShare(shareAmount, {
      value: ethers.utils.parseEther(payment.toString()),
    });
    await buyShrares.wait();
    console.log("\nShares bought transaction hash: ", buyShrares.hash, "\n");
  }
}

async function sellShares(arxTokenAddress, managerAddress, shareAmount) {
  let ArxToken = await ethers.getContractFactory("ArxToken");
  const ArxPropertyManager = await ethers.getContractFactory(
    "ArxPropertyManager"
  );

  const signer1 = new ethers.Wallet(process.env.PRIVATE_KEY1, ethers.provider);

  const arxPropertyManager = await ArxPropertyManager.attach(managerAddress);
  let arxToken = await ArxToken.attach(arxTokenAddress); //.connect(signer1); // add this connect statement if you are using a real network other than localhost
  let SharesStatus = await arxToken.canRedeem();

  if (!(await SharesStatus)) {
    console.log(
      "The property is not yet sold, Please wait for the sale to happen or contact the custumor support, Thank you"
    );
  } else {
    console.log(
      "\nSelling the shares for the given token ID... from another account\n"
    );

    let sellShrares = await arxToken.redeem(shareAmount, { gasLimit: 5000000 });
    await sellShrares.wait();

    console.log("\nShares sold transaction hash: ", sellShrares.hash, "\n");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
