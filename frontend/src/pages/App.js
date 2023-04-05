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
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
function App() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
    return (
        <div>
            <Router>
                <ScrollBackToTop>
                    <Navbar />
                    <div
                        style={
                            isSmall
                                ? { paddingTop: "54px" }
                                : { paddingTop: "86px" }
                        }
                    >
                        {!isMedium && <CartFixedRight />}
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product/all" element={<ShopPage />} />
                            <Route path="/dich-vu" element={<ServicePage />} />
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
