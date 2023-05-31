import Button from '../components/Button'
import '../styles/aboutus.css'
import ruff from '../assets/ruff.png'
import linkedin from '../assets/linkedin.png'
import twitter from '../assets/twitter.png'
import github from '../assets/github.png'
import stackoverflow from '../assets/stackoverflow.png'
import kartik from '../assets/kartik.png'
import ayan from '../assets/ayan.png'

export default function Aboutus(){
	return (

		<div className="Aboutus"> 
		< Button />

		<div className="About">
			
			<div className="Ayan">				<img src={ayan} />
				<div className="ruff-name">Ayan Panchariya</div>
				<div className="ruff-profession"> Backend Developer </div>

				<hr />
				<div className="ruff-description">I weaved lines of Solidity code, crafting the backend web of magic, where transactions dance and smart contracts rule, breathing life into the digital realm</div>
								<div className="ruff-socials">
				<a href="https://www.linkedin.com/in/ayan-panchariya-6b74191b9/" target="_blank">	<img src={linkedin} /> </a>
				<a href="https://twitter.com/0xSud0_" target="_blank">	<img src={twitter} /> </a>
				< a href="https://github.com/Sud0-AP" target="_blank" >	<img src={github} /> </a>
				<a>	<img src={stackoverflow} /> </a>

				</div></div>
			<div className="ruff">
				<img src={ruff} />
				<div className="ruff-name">Dheeraj Chowdary</div>
				<div className="ruff-profession"> Front-end designer & Developer </div>

				<hr />
				<div className="ruff-description">
With a touch of React's enchantment, I wove captivating interfaces, where pixels come alive and user journeys unfold, leaving a mesmerizing trail of immersive experiences.</div>
								<div className="ruff-socials">
				<a href="https://www.linkedin.com/in/dheeraj-chowdary-58604421b/" target="_blank">	<img src={linkedin} /> </a>
				<a href="https://twitter.com/ruffian74434201" target="_blank">	<img src={twitter} /> </a>
				<a href="https://github.com/rufevean" target="_blank">	<img src={github} /> </a>
				<a href="https://meta.stackoverflow.com/users/19356367/ruffian" target="_blank">	<img  src={stackoverflow} /> </a>

				</div>

			</div>
			<div className="kartik">		

			<img src={kartik} />
				<div className="ruff-name">Kartik Lamba</div>
				<div className="ruff-profession"> Financial Advisor </div>
				<hr />
				<div className="ruff-description"> I fused my financial expertise and design wizardry, crafting a digital sanctuary where wealth finds purpose. Empowering minds to navigate the labyrinth of finances with confidence, one click at a time.</div>
							<div className="ruff-socials">
				<a href="https://www.linkedin.com/in/dheeraj-chowdary-58604421b/" target="_blank">	<img src={linkedin} /> </a>
				<a>	<img src={twitter} /> </a>
				<a>	<img src={github} /> </a>
				<a>	<img src={stackoverflow} /> </a>

				</div>
				</div>
		</div>
		</div>
		)
}