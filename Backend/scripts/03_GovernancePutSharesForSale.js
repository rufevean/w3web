const { ethers } = require("ethers");

// Connect to the Ethereum network using a provider
async function connectToProvider() {
  const provider = new ethers.providers.JsonRpcProvider(
    "<YOUR_RPC_PROVIDER_URL>"
  );
  return provider;
}

// Deploy the TimeLock contract
async function deployTimeLock(provider, minDelay, proposers, executors) {
  const TimeLock = await ethers.getContractFactory("TimeLock");
  const timeLock = await TimeLock.deploy(minDelay, proposers, executors);
  await timeLock.deployed();
  return timeLock;
}

// Deploy the ArxTokenGovernance contract
async function deployArxTokenGovernance(
  provider,
  arxTokenAddress,
  timeLockAddress
) {
  const ArxTokenGovernance = await ethers.getContractFactory(
    "ArxTokenGovernance"
  );
  const arxTokenGovernance = await ArxTokenGovernance.deploy(
    arxTokenAddress,
    timeLockAddress
  );
  await arxTokenGovernance.deployed();
  return arxTokenGovernance;
}

// Create a proposal in the ArxTokenGovernance contract
async function createProposal(
  arxTokenGovernance,
  targets,
  values,
  calldatas,
  description
) {
  const proposalId = await arxTokenGovernance.propose(
    targets,
    values,
    calldatas,
    description
  );
  return proposalId;
}

// Example usage
async function main() {
  // Connect to the Ethereum network using a provider
  const provider = await connectToProvider();

  // Specify the minimum delay, proposers, and executors for the TimeLock contract
  const minDelay = 3600; // Minimum delay for timelock execution in seconds
  const proposers = ["0xADDRESS_1", "0xADDRESS_2"]; // Replace with the actual addresses of the proposers
  const executors = ["0xADDRESS_3", "0xADDRESS_4"]; // Replace with the actual addresses of the executors

  // Deploy the TimeLock contract
  const timeLock = await deployTimeLock(
    provider,
    minDelay,
    proposers,
    executors
  );
  console.log("TimeLock contract deployed:", timeLock.address);

  // Specify the ArxToken and TimeLock contract addresses
  const arxTokenAddress = "<ARX_TOKEN_ADDRESS>"; // Replace with the actual ArxToken contract address
  const timeLockAddress = timeLock.address;

  // Deploy the ArxTokenGovernance contract
  const arxTokenGovernance = await deployArxTokenGovernance(
    provider,
    arxTokenAddress,
    timeLockAddress
  );
  console.log(
    "ArxTokenGovernance contract deployed:",
    arxTokenGovernance.address
  );

  // Specify the targets, values, calldatas, and description for the proposal
  const targets = ["<ARX_PROPERTY_MANAGER_ADDRESS>"]; // Replace with the actual ArxPropertyManager contract address
  const values = [0]; // Replace with the actual value if required
  const calldatas = [
    "0x" +
      ethers.utils
        .keccak256(
          ethers.utils.toUtf8Bytes("putSharesForSale(uint256,uint256)")
        )
        .slice(0, 8) +
      ethers.utils.defaultAbiCoder
        .encode(["uint256", "uint256"], [tokenId, price])
        .slice(2),
  ];
  const description = "Proposal to use putSharesForSale function";

  // Create a proposal in the ArxTokenGovernance contract
  const proposalId = await createProposal(
    arxTokenGovernance,
    targets,
    values,
    calldatas,
    description
  );
  console.log("Proposal created with ID:", proposalId.toString());
}

main().catch((error) => {
  console.error(error);
});
