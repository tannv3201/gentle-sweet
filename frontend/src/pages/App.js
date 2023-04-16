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

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Breadcrumb from "../components/GBreadcrumb/GBreadcrumb";
import { useEffect, useState } from "react";
function App() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setIsLoading(false);
        };
        document.addEventListener("load", handleLoad); // Gán sự kiện load cho document

        return () => {
            document.removeEventListener("load", handleLoad); // Hủy bỏ sự kiện load khi component bị unmount hoặc useEffect chạy lại
        };
    }, []);
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
                        </Routes>
                    </div>
                    <Footer />
                </ScrollBackToTop>
            </Router>
        </div>
    );
}

export default App;
