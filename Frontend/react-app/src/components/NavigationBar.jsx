import "../styles/NavigationBar.css";
import wallet from "../assets/wallet-vector.png";
import { NavLink } from "react-router-dom";

function NavigationBar() {
    return (
        <div className="NavigationBar">
            <NavLink to={"/"} className="NavigationBar-Logo">
                Defi
            </NavLink>

            <div className="NavigationBar-Build">build</div>
            <NavLink to={"/Pools"} className="NavigationBar-ExplorePools">
                explore pools
            </NavLink>
            <button className="NavigationBar-WalletConnect">
                <img
                    className="NavigationBar-WalletConnect-Image"
                    src={wallet}
                />
                wallet
            </button>
        </div>
    );
}

export default NavigationBar;
