import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import house from "../assets/house.png";
import governance from "../assets/governance.png";
import '../styles/viewlistings.css'
export default function ViewListings() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCards = [
    {
      id: 1,
      title: "LOS SANTOS PROPERTIES",
      price: "13,000,000",
      image: house,
    },
    {
      id: 2,
      title: "SUNNYVILLE ESTATES",
      price: "9,500,000",
      image: governance,
    },
  ].filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ViewListings">
      <Button />
      <div className="ViewListings-main">
        <div className="ViewListings-head">
          <div className="ViewListings-head-title">LISTINGS</div>
          <div className="ViewListings-head-cont">
            <input
              id="ViewListings-head-body"
              className="ViewListings-head-body"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <label htmlFor="ViewListings-head-body"></label>
          </div>
        </div>
        <div className="ViewListings-container">
          {filteredCards.map((card) => (
            <div className="listing" key={card.id}>
              <img
                src={card.image}
                className="listing-image"
                alt="House"
              />
              <div className="listing-title">{card.title}</div>
              <div className="listing-price">{card.price}</div>
              <NavLink to={`/Yourlisting`} className="Listings-view">
                <button className="Listings-button">VIEW</button>
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
