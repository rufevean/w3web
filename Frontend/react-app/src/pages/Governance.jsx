 import '../styles/governance.css'
import NavigationBar from '../components/NavigationBar'
import Button from '../components/Button.jsx'
import { NavLink } from "react-router-dom";
export default function Governance(){
	return(

			<div className="Governance">
			  < Button />
			  < div className="Governance-Head">
			    <div className="Governance-Head-title">
			      GOVERNANCE
			    </div>
			    <div className="Governance-Head-sub">
			      Empowering Property Investments through Decentralized Decision-Making
			    </div>
			</div>
			< div className="Governance-body">
			  Our platform revolutionizes property investments by leveraging blockchain
			  technology and a decentralized autonomous organization (DAO) framework.
			  With total transparency and security, users become an integral part of
			  decision-making committees, ensuring that no individual or select group
			  holds unilateral power. This democratic approach empowers users to actively
			  participate in shaping the direction and choices of our platform, fostering
			  a fair and inclusive investment ecosystem.
			  </div>
			  <div className="Governance-quote">
			    <hr className="Governance-quote-hr1" />
			    <div className="Governance-quote-body">
			      UNLOCKING PROPERTY INVEST OPPORTUNITIES WITH MINIMAL CAPITAL CONSTRAINTS
			    </div>
			    <hr className="Governance-quote-hr2" />
			  </div>
			  <div className="Governance-Token">
			    <div className="Governance-Token-title">
			      TOKENISATION
			    </div>
			    <div className="Governance-Token-body">
			      Tokenization enables purchasing shares representing the real value of
			      properties.
			    </div>
			  </div>
			  <div className="Governance-info1">
			    Discover properties across India, vetted by our expert survey team. Invest
			    in property shares through tokens representing their real value. Easily
			    exchange tokens for real money on our secure platform, revolutionizing
			    property transactions.
			  </div>
			  <div className="Governance-info2">
			    Our platform operates as a DAO, where users actively participate in decision-making
			    committees. No individual or group holds unilateral power. Users can sell
			    properties, invest in shares of other properties, and contribute to our
			    liquidity pool. Join us in this innovative corporate environment, where
			    collective decision-making and financial opportunities thrive.
			  </div>

			  < NavLink to={"/listings"}>
			  <button className="Governance-button">
			    GET STARTED
			  </button>

			  </NavLink>
			  </div>

		)
}