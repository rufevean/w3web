import "../styles/home.css";
import NavigationBar from "../components/NavigationBar";
import DocsPng from "../assets/hompage-docs.png";
import { NavLink } from "react-router-dom";
import buyer from "../assets/buyers.png";
import seller from '../assets/sellers.png';
import arx from '../assets/arx.png';
import accessibility from '../assets/accessibilty.png';
import transparency from "../assets/transparency.png";
import profitable from '../assets/profitable.png';
import efficiency from "../assets/efficiency.png";
import Button from '../components/Button.jsx';
import React, { useState } from 'react';

function Home() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  return (
    <div className="Home">
      <div className="wrapper">
        {/*<NavigationBar
          isWalletConnected={isWalletConnected}
          setIsWalletConnected={setIsWalletConnected}
        />*/}
        <Button setIsWalletConnected={setIsWalletConnected} />
        <div className="Home-Content">
          <div className="Home-Content-Title">Arx</div>
          <div className="Home-Content-Subtitle">
            &quot; Empowering small investments, maximizing returns.&quot;
          </div>
        </div>
        <div className="Home-Footer">
          <NavLink className="Home-Footer-Docs" to={"/underprogress"}>
            Docs
            <img src={DocsPng} />
          </NavLink>
          <NavLink className="Home-Footer-Contact" to={"/aboutus"}>
            About Us
          </NavLink>
          <NavLink className="Home-Footer-Governance" to={"/governance"}>
            Governance
          </NavLink>
        </div>
      </div>
      <div className="ARX-section">
        <div className="Arx-left">
          <div className="Arx-buyers">
            <img src={buyer} className="Arx-buyers-logo" />
            <div className="Arx-buyers-Head">THE BUYERS</div>
            <hr className="Arx-buyers-hr" />
            <div className="Arx-buyers-body">
              Purchases a stake in the property using other crypto tokens, receiving our tokens in return. Each property has
              its own unique tokens for buyers, which can be used anywhere. This means that buyers can invest in real estate
              without having to worry about managing the property or dealing with tenants.
            </div>
          </div>
          <div className="Arx-sellers">
            <img src={seller} className="Arx-sellers-logo" />
            <div className="Arx-sellers-Head">THE SELLERS</div>
            <hr className="Arx-sellers-hr" />
            <div className="Arx-sellers-body">
              Purchases a stake in the property using other crypto tokens, receiving our tokens in return. Each property has
              its own unique tokens for buyers, which can be used anywhere. This means that buyers can invest in real estate
              without having to worry about managing the property or dealing with tenants.
            </div>
          </div>
          <div className="Arx">
            <img src={arx} className="Arx-arx-logo" />
            <div className="Arx-arx-Head">ARX</div>
            <hr className="Arx-arx-hr" />
            <div className="Arx-arx-body">
              Reviews the property and decides whether to include it in their portfolio. If they decide to include it, they
              pay the property seller for their token and start marketing the property to potential buyers.
            </div>
          </div>
        </div>
        <div className="Arx-right">
          <div className="Arx-line">
            <hr className="Arx-hr1" />
            <div className="Arx-line-body">HOW IT WORKS?</div>
          </div>
          <div className="Arx-con">
            <div className="Arx-title">ARX</div>
            <div className="Arx-subtitle">FUTURE OF REAL-ESTATE</div>
          </div>
        </div>
      </div>
      <div className="why-arx-section">
        <div className="why-arx-left">
          <div className="why-arx-line">
            <div className="why-arx-line-body">WHY ARX?</div>
            <hr className="why-arx-hr1" />
          </div>
          <div className="why-arx-info">
            Our platform offers a number of advantages over traditional real estate investments. Here are just a few
          </div>
        </div>
        <div className="why-arx-right">
          <div className="why-arx-transparency">
            <img src={transparency} className="why-arx-transparency-logo" />
            <div className="why-arx-transparency-title">TRANSPARENCY</div>
            <hr className="why-arx-transparency-hr" />
            <div className="why-arx-transparency-body">
              Our platform is powered by blockchain technology, meaning that all transactions are tracked and verified.
            </div>
          </div>
          <div className="why-arx-efficiency">
            <img src={efficiency} className="why-arx-effiecny-logo" />
            <div className="why-arx-efficiency-title">EFFICIENCY</div>
            <hr className="why-arx-efficiency-hr" />
            <div className="why-arx-efficiency-body">
              Our platform eliminates many of the costs and inefficiencies associated with traditional real estate investments.
              This means you can invest quickly and with ease.
            </div>
          </div>
          <div className="why-arx-accessibility">
            <img src={accessibility} className="why-arx-accessibility-logo" />
            <div className="why-arx-accessibilitytitle">ACCESSIBILITY</div>
            <hr className="why-arx-accessibility-hr" />
            <div className="why-arx-accessibility-body">
              Investing in real estate has never been easier. Anyone can join regardless of their financial background or
              expertise.
            </div>
          </div>
          <div className="why-arx-profitable">
            <img src={profitable} className="why-arx-profitable-logo" />
            <div className="why-arx-profitable-title">PROFITABLE</div>
            <hr className="why-arx-profitable-hr" />
            <div className="why-arx-profitable-body">
              Our platform is more efficient than traditional REITs, you can keep more of those profits for yourself.
            </div>
          </div>
        </div>
      </div>
      <div className="main-footer">
        <div className="main-footer-body">Ready to invest in real estate like never before? Join our web3 REIT platform</div>
        <NavLink to={"/listings"}>
          <button className="footer-WalletConnect">VIEW LISTINGS</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Home;
