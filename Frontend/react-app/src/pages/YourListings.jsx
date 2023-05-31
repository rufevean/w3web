
import NavigationBar from '../components/NavigationBar'
import '../styles/viewlistings.css'
import Button from '../components/Button'
import search from '../assets/search-icon.svg'
import { NavLink } from "react-router-dom";
import house from  '../assets/house.png'

export default function YourListings(){
	return(
	<div className="ViewListings">
			< Button />
		<div className="ViewListings-main">
			< div className = "ViewListings-head">
					< div className="ViewListings-head-title"> YOUR LISTINGS </div>
					< div className="ViewListings-head-cont">
						< input id="ViewListings-head-body" className="ViewListings-head-body" type="text" placeholder="San avenure.." />
						< label htmlFor="ViewListings-head-body"> </label>
						
					</div>
			</div>
			<  div className="ViewListings-container">
				< div className="listing1">
					
				<img src={house} className="listing1-image" />
				<div className="listing1-title">
				LOS SANTOS PROPERTIES
				</div>
				<div className="listing1-price">13,000,000</div>
				<NavLink to={"/Yourlisting"}   className="Listings-view">
					  <button className="Listings-button">
			    VIEW
			  </button>

				</NavLink>

			

				</div>
			</div>
		</div>	
	</div>
	)

}