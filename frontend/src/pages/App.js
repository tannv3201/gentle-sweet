import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../assets/scss/Global.scss";
import HomePage from "./HomePage/HomePage";
import ShopPage from "./ShopPage/ShopPage";
import Navbar from "../components/Navbar/Navbar";
import ServicePage from "./ServicePage/ServicePage";
import SaleOffPage from "./SaleOffPage/SaleOffPage";
import AboutUs from "./AboutUs/AboutUs";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <div className="App">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/product-list" element={<ShopPage />} />
                        <Route path="/service-list" element={<ServicePage />} />
                        <Route path="/sale-off" element={<SaleOffPage />} />
                        <Route path="/about-us" element={<AboutUs />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
