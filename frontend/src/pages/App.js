import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../assets/scss/Global.scss";
import HomePage from "./HomePage/HomePage";
import ShopPage from "./ShopPage/ShopPage";
import Navbar from "../components/Navbar/Navbar";
import ServicePage from "./ServicePage/ServicePage";
import SaleOffPage from "./SaleOffPage/SaleOffPage";
import AboutUs from "./AboutUs/AboutUs";
import CartFixedRight from "../components/CartFixedRight/CartFixedRight";
import Footer from "../components/Footer/Footer";
import ScrollBackToTop from "../components/ScrollBackToTop";

function App() {
    return (
        <div>
            <Router>
                <ScrollBackToTop>
                    <Navbar />
                    <div className="App">
                        <CartFixedRight />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product/all" element={<ShopPage />} />
                            <Route
                                path="/service-list"
                                element={<ServicePage />}
                            />
                            <Route path="/sale-off" element={<SaleOffPage />} />
                            <Route path="/about-us" element={<AboutUs />} />
                        </Routes>
                    </div>
                    <Footer />
                </ScrollBackToTop>
            </Router>
        </div>
    );
}

export default App;
