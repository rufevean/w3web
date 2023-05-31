import NavigationBar from '../components/NavigationBar'
import '../styles/Listings.css'
import house from '../assets/house.png'
import React, { useState } from 'react';
import Button from '../components/Button.jsx'
import { NavLink } from "react-router-dom";
export default function Listings(){
      const [count, setCount] = useState(0);
  const subtotal = count * 13000;
        const [count1, setCount1] = useState(0);
  const subtotal1 = count1 * 13000;
    return(
<div className="Listings">
    < Button />
    <div className="Listings-body">
        <div className="Listing-info">
            <div className="Listing-info-location">
                <div className="Listing-info-location-title">
                    8 BEDROOM VILLA
                </div>
                <div className="Listing-info-location-sub">
                    LOS SANTOS
                    <br />
                    SAN ANDREAS 0014
                </div>
            </div>
            <div className="Listing-info-age">
                <div className="Listing-info-age-Heasell">
                    AGE 
                </div>
                <div className="Listing-info-age-Body">
                    18
                </div>
            </div>
            <div className="Listing-info-floors">
                <div className="Listing-info-floors-Head">
                    FLOOR NO/NO OF FLOORS
                </div>
                <div className="Listing-info-floors-Body">
                    3
                </div>
            </div>
        </div>

        <div className="Listing-mid">
        <img src={house} className="Listing-mid-image" />
        PRICE - 13,000,000 USDC
        <button className="governance-button">VIEW GOVERNANCE</button>
                      <NavLink className="opensea" to={"/"}>
                            <button className="opensea1">
                            View in OpenSea
                            </button>
            </NavLink>
        </div>




        <div className="Listing-main">
            <div className="Listing-main-Stake">
                <div className="Listing-main-Stake-Title">
                    STAKE REMAINING
                </div>
                <div className="Listing-main-Stake-Bar">
                    68%
                    <br/>
                </div>
                <div className="Listing-main-Stake-Single">
                    13000 ETH EACH
                </div>
            </div>




            <div className="Listing-main-Holding">
                <div className="Listing-main-Holding-Current-Title">
                    YOUR CURRENT HOLDING
                </div>
                <div className="Listing-main-Holding-Current-Value">
                    0
                </div>

             </div>

             <div className="Listing-finance">

                <div className="Listing-main-Holding-Add">STAKE</div>


                <div className="buy-area">
                    <div className ="add">Add</div>
                    <div className="Listing-sell-Holding-Count">
                        <button className="counter-button" onClick={()=>
                        setCount(count - 1)}>-
                        </button>
                        <span className="counter-button2">
                        {count}
                        </span>
                        <button className="counter-button" onClick={()=>
                        setCount(count + 1)}>+
                             </button>
                    </div>


                              <div className="Listing-main-Holding-Subtotal">
                subtotal: 
                </div>
                <div className="Listing-main-Holding-Subtotalvalue">
                ${subtotal}
                </div>
                <button className="Listing-main-Holding-button">
                BUY STAKE
                </button>


                </div>
                <div className="sell-area">
                <div className ="add">Sell</div>
                                       <div className="Listing-sell-Holding-Count">
                        <button className="counter-button" onClick={()=>
                        setCount1(count1 - 1)}>-
                        </button>
                        <span className="counter-button2">
                        {count1}
                        </span>
                        <button className="counter-button" onClick={()=>
                        setCount1(count1 + 1)}>+
                             </button>
                    </div>

                        
                              <div className="Listing-main-Holding-Subtotal">
                subtotal: 
                </div>
                <div className="Listing-main-Holding-Subtotalvalue">
                ${subtotal1}
                </div>
                <button  className="Listing-sell-Holding-button ">
                SELL STAKE
                </button>
                </div>




                </div>




        </div>
    </div>

    <div className="popup b1 ">this proprty cannot be sold</div>
</div>
        )

}