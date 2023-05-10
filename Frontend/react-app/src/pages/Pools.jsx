import NavigationBar from "../components/NavigationBar";
import "../styles/Pools.css";
import FilterIcon from "../assets/filter-icon.svg";
import SearchIcon from "../assets/search-icon.svg";
function Pools() {
    return (
        <div className="Pools">
            <NavigationBar />
            <div className="PoolsTitle">
                <h1>POOLS</h1>
                <hr className="PoolsTitlehr"></hr>
            </div>
            <div className="PoolsContent">
                <div className="PoolsContent-Filter">
                    <img src={FilterIcon}></img>Filter
                </div>
                <div className="PoolsContent-Search">
                    Search <img src={SearchIcon}></img>
                </div>
            </div>
        </div>
    );
}

export default Pools;
