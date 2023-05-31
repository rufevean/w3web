import "./init";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs.jsx";
import "./app.css";
import Pools from "./pages/Pools.jsx";
import Listings from "./pages/Listings.jsx";
import Governance from './pages/Governance.jsx';
import Home from "./pages/Home.jsx";
import Underprogress from './pages/Underprogress';
import Preloader from "./pages/Preloader";
import { useState, useEffect } from "react";
import Viewlistings from './pages/Viewlistings.jsx';
import Yourlisting from './pages/Yourlisting.jsx';
import Yourlistings from './pages/YourListings.jsx';
import Aboutus from './pages/Aboutus'

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", e => {
    cursor.setAttribute("style", "top : " + (e.pageY - 35) + "px;left : " + (e.pageX - 35) + "px")
})

  const handlePreloaderClick = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      {/* Check if the app is still loading */}
      {isLoading ? (
        <div onClick={handlePreloaderClick}>
          {/* Show the preloader component */}
          <Preloader />
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            {/* Define routes and their corresponding components */}
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/pools" element={<Pools />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/underprogress" element={<Underprogress />} />
            <Route path="/yourlisting" element={<Yourlisting />} />
            <Route path="/Viewlistings" element={<Viewlistings />} />s
            <Route path="/Yourlistings" element={<Yourlistings />} />
            <Route path="/aboutus" element={<Aboutus />} />
          </Routes>
        </BrowserRouter>
      )}
          <div class="cursor" id="cursor"></div>
    </div>
  );
}

export default App;
