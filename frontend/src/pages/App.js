import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../assets/scss/Global.scss";
import HomePage from "./HomePage/HomePage";
import ShopPage from "./ShopPage/ShopPage";
import Navbar from "../components/Navbar/Navbar";
import ServiceOverviewIndex from "./ServicePage/Overview/ServiceOverviewIndex";
import BlogPage from "./BlogPage/BlogPage";
import AboutUsPage from "./AboutUsPage/AboutUsPage";
import SalonSystemPage from "./SalonSystemPage/SalonSystemPage";
import CartFixedRight from "../components/CartFixedRight/CartFixedRight";
import Footer from "../components/Footer/Footer";
import ScrollBackToTop from "../components/ScrollBackToTop";
import Service from "./ServicePage/Service/Service";
import Booking from "./Booking/Booking";
import ProductDetail from "./ShopPage/ProductDetail/ProductDetail";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Breadcrumb from "../components/GBreadcrumb/GBreadcrumb";
import ScrollToTopOnMouse from "../components/ScrollToTopOnMouse/ScrollToTopOnMouse";
import Checkout from "./Checkout/Checkout";
import Cart from "./Cart/Cart";
import Payment from "./Payment/Payment";
function App() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <div>
            <Router>
                <ScrollToTopOnMouse />
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
                            <Route path="/product" element={<ShopPage />} />
                            <Route
                                path="/dich-vu"
                                element={<ServiceOverviewIndex />}
                            />
                            <Route path="/cham-soc-toc" element={<Service />} />
                            <Route path="/tin-tuc" element={<BlogPage />} />
                            <Route
                                path="/he-thong-chi-nhanh"
                                element={<SalonSystemPage />}
                            />
                            <Route
                                path="/ve-chung-toi"
                                element={<AboutUsPage />}
                            />
                            <Route path="/dat-lich" element={<Booking />} />
                            <Route
                                path="/product/son-mong-tay"
                                element={<ProductDetail />}
                            />
                            <Route
                                path="/thu-tuc-thanh-toan"
                                element={<Checkout />}
                            />
                            <Route path="/gio-hang" element={<Cart />} />
                            <Route path="/thanh-toan" element={<Payment />} />
                        </Routes>
                    </div>
                    <Footer />
                </ScrollBackToTop>
            </Router>
        </div>
    );
}

export default App;
