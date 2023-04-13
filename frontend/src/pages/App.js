import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../assets/scss/Global.scss";
import HomePage from "./HomePage/HomePage";
import ShopPage from "./ShopPage/ShopPage";
import Navbar from "../components/Navbar/Navbar";
import ServiceOverviewIndex from "./ServicePage/Overview/ServiceOverviewIndex";
import SaleOffPage from "./SaleOffPage/SaleOffPage";
import AboutUsPage from "./AboutUsPage/AboutUsPage";
import SalonSystemPage from "./SalonSystemPage/SalonSystemPage";
import CartFixedRight from "../components/CartFixedRight/CartFixedRight";
import Footer from "../components/Footer/Footer";
import ScrollBackToTop from "../components/ScrollBackToTop";
import Service from "./ServicePage/Service/Service";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
function App() {
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.down("lg"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div>
            <Router>
                <ScrollBackToTop>
                    <Navbar />
                    <div
                        style={
                            isMedium
                                ? { marginTop: "54px" }
                                : { marginTop: "110px" }
                        }
                    >
                        {!isMedium && <CartFixedRight />}
                        <Breadcrumb />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/product/all" element={<ShopPage />} />
                            <Route
                                path="/dich-vu"
                                element={<ServiceOverviewIndex />}
                            />
                            <Route path="/cham-soc-toc" element={<Service />} />
                            <Route path="/sale-off" element={<SaleOffPage />} />
                            <Route
                                path="/he-thong-chi-nhanh"
                                element={<SalonSystemPage />}
                            />
                            <Route
                                path="/ve-chung-toi"
                                element={<AboutUsPage />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </ScrollBackToTop>
            </Router>
        </div>
    );
}

export default App;
