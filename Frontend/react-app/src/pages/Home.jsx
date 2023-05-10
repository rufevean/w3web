import "../styles/home.css";
import NavigationBar from "../components/NavigationBar";
import DocsPng from "../assets/hompage-docs.png";
import { NavLink } from "react-router-dom";

function Home() {
    return (
        <div className="Home">
            <NavigationBar />
            <div className="Home-Content">
                <div className="Home-Content-Title">DEfi</div>
                <div className="Home-Content-Subtitle">
                    &quot; Empowering small investments,maximizing
                    returns.&quot;
                </div>
            </div>
            <div className="Home-Footer">
                <NavLink className="Home-Footer-Docs" to={"/docs"}>
                    Docs
                    <img src={DocsPng} />
                </NavLink>
                <div className="Home-Footer-Contact">Contact</div>
                <div className="Home-Footer-Governance">Governance</div>
            </div>
        </div>
    );
}

export default Home;
