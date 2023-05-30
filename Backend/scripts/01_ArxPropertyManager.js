const { ethers } = require('ethers');

// Connect to the Ethereum network using MetaMask provider
async function connectToWallet() {
  if (window.ethereum) {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  } else {
    throw new Error('Please install MetaMask to use this functionality.');
  }
}

// create ethers contract variable for ArxPropertyManager contract

// Return the latest tokenId from the ArxPropertyManager contract
async function getLatestTokenId(arxPropertyManagerContract) {
  const tokenId = await arxPropertyManagerContract.returnLatestTokenId();
  return tokenId.toNumber();
}

// Set shares for sale in the ArxToken contract for the specified tokenId
async function setSharesForSale(arxPropertyManagerContract, tokenId, price) {
  const setSharesForSaleTx = await arxPropertyManagerContract.putSharesForSale(tokenId, price);
  await setSharesForSaleTx.wait();
  console.log('Shares set for sale successfully.');
}

// Invoke payable functions in the ArxToken contract using the external wallet
async function invokePayableFunction(arxTokenAddress, functionSelector, value) {
  const provider = ethers.getDefaultProvider();
  const contract = new ethers.Contract(arxTokenAddress, ['function() payable'], provider);
  const transaction = await contract[functionSelector]({ value: ethers.utils.parseEther(value) });
  await transaction.wait();
  console.log('Payable function invoked successfully.');
}

// Example usage
async function main() {
  // Connect to the external wallet (MetaMask)
  const signer = await connectToWallet();

  // Create the ArxPropertyManager contract instance
  const arxPropertyManagerAddress = '<ARX_PROPERTY_MANAGER_ADDRESS>'; // Replace with the actual contract address
  const arxPropertyManagerContract = new ethers.Contract(arxPropertyManagerAddress, ['ABI_GOES_HERE'], signer);

  // Get the latest tokenId
  const latestTokenId = await getLatestTokenId(arxPropertyManagerContract);
  console.log('Latest TokenId:', latestTokenId);

  // Set shares for sale for a specific tokenId
  const tokenId = 1; // Specify the tokenId for which you want to set shares for sale
  const price = '0.1'; // Specify the price in Ether
  await setSharesForSale(arxPropertyManagerContract, tokenId, ethers.utils.parseEther(price));

  // Invoke payable functions in the ArxToken contract using the external wallet
  const arxTokenAddress = await arxPropertyManagerContract.returnArxTokenAddress(tokenId);
  const functionSelector = 'functionSelector'; // Replace with the desired function selector
  const value = '0.5'; // Specify the amount to send in Ether
  await invokePayableFunction(arxTokenAddress, functionSelector, value);
}

main().catch((error) => {
  console.error(error);
});
