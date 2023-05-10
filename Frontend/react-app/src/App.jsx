import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Docs from "./pages/Docs.jsx";
import "./app.css";
import Pools from "./pages/Pools.jsx"   

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/pools" element={<Pools />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
