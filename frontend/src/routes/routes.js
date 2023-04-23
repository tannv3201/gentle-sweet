import HomePage from "../pages/HomePage/HomePage";
import ShopPage from "../pages/ShopPage/ShopPage";
import Navbar from "../components/Navbar/Navbar";
import ServiceOverviewIndex from "../pages/ServicePage/Overview/ServiceOverviewIndex";
import BlogPage from "../pages/BlogPage/BlogPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import SalonSystemPage from "../pages/SalonSystemPage/SalonSystemPage";
import CartFixedRight from "../components/CartFixedRight/CartFixedRight";
import Footer from "../components/Footer/Footer";
import BackToTop from "../components/ScrollBackToTop";
import Service from "../pages/ServicePage/Service/Service";
import Booking from "../pages/Booking/Booking";
import ProductDetail from "../pages/ShopPage/ProductDetail/ProductDetail";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Breadcrumb from "../components/GBreadcrumb/GBreadcrumb";
import ScrollToTopOnMouse from "../components/ScrollToTopOnMouse/ScrollToTopOnMouse";
import Checkout from "../pages/Checkout/Checkout";
import Cart from "../pages/Cart/Cart";
import Payment from "../pages/Payment/Payment";
import Login from "../pages/Login/Login";
import SignIn from "../pages/SignIn/SignIn";

// public routes

export const publicRoutes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/product",
        component: ShopPage,
    },
    {
        path: "/dich-vu",
        component: ServiceOverviewIndex,
    },
    {
        path: "/cham-soc-toc",
        component: Service,
    },
    {
        path: "/tin-tuc",
        component: BlogPage,
    },
    {
        path: "/he-thong-chi-nhanh",
        component: SalonSystemPage,
    },
    {
        path: "/ve-chung-toi",
        component: AboutUsPage,
    },
    {
        path: "/dat-lich",
        component: Booking,
    },
    {
        path: "/product/son-mong-tay",
        component: ProductDetail,
    },
    {
        path: "/thu-tuc-thanh-toan",
        component: Checkout,
    },
    {
        path: "/gio-hang",
        component: Cart,
    },
    {
        path: "/thanh-toan",
        component: Payment,
    },
    {
        path: "/dang-nhap",
        component: Login,
        layout: null,
    },
    {
        path: "/dang-ky",
        component: SignIn,
        layout: null,
    },
];
