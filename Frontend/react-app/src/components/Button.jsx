import '../styles/button.css';
import { Web3Button } from '@web3modal/react';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';

export default function Button() {
  const chains = [arbitrum, mainnet, polygon];

  const projectId = '62a2482225e42c242517244788886f64';

  // Configure Web3Modal and EthereumClient
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 2, chains }),
    publicClient,
  });
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  const [isWalletConnected, setIsWalletConnected] = useState(false);

  async function connectWallet() {
    try {
      // Connect the wallet using your preferred method
      // For example, using Web3 and MetaMask:
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('connected');
      setIsWalletConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }

  return (
    <div>
      {/* Render the content based on whether the wallet is connected */}
      {isWalletConnected ? (
        <div>
          {/* Show the navigation bar */}
          <NavigationBar isWalletConnected={isWalletConnected} />
          {/* Render the button for wallet connection */}
          <button onClick={connectWallet} className="WalletConnect">
            {/* Provide the WagmiConfig to enable Wagmi features */}
            <WagmiConfig config={wagmiConfig}>
              {/* Render the Web3Button */}
              <Web3Button />
            </WagmiConfig>

            {/* Render the Web3Modal component */}
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
          </button>
        </div>
      ) : (
        <div>
          {/* Show the navigation bar */}
          <NavigationBar />
          {/* Render the button for wallet connection */}
          <button onClick={connectWallet} className="WalletConnect">
            {/* Provide the WagmiConfig to enable Wagmi features */}
            <WagmiConfig config={wagmiConfig}>
              {/* Render the Web3Button */}
              <Web3Button />
            </WagmiConfig>

            {/* Render the Web3Modal component */}
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
          </button>
        </div>
      )}
    </div>
  );
}

