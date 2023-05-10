import "../styles/Docs.css";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/DocsFooter";
// import { NavLink } from "react-router-dom";
function Docs() {
    return (
        <div className="Docs">
            <NavigationBar />;
            <div className="DocsBody">
                <h1 className="DocsTitle">Documentation</h1>
                <hr className="DocsBody-hr1"></hr>
            </div>
            <Footer/>
        </div>
    );
}

export default Docs;
