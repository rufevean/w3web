import "../styles/NavigationBar.css";
import wallet from "../assets/wallet-vector.png";
import { NavLink } from "react-router-dom";
import { Web3Button } from '@web3modal/react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'


function NavigationBar({ isWalletConnected }) {
  return (
    <div className="NavigationBar">
      <NavLink to={'/'} className="NavigationBar-Logo">
        Arx
      </NavLink>
      {isWalletConnected && (
        <>
          <NavLink to={'/Yourlistings'} className="NavigationBar-YourLisings">
            YOUR LISTINGS
          </NavLink>
          <NavLink to={'/Viewlistings'} className="NavigationBar-ViewLisings">
            VIEW LISTINGS
          </NavLink>
        </>
      )}
      <div className="NavigationBar-Menu">
        <hr className="hr1" />
        <hr className="hr2" />
      </div>
    </div>
  );
}

export default NavigationBar;

