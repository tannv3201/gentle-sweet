import HomePage from "../pages/HomePage/HomePage";
import ShopPage from "../pages/ShopPage/ShopPage";
// import Navbar from "../components/Navbar/Navbar";
import ServiceOverviewIndex from "../pages/ServicePage/Overview/ServiceOverviewIndex";
import BlogPage from "../pages/BlogPage/BlogPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import SalonSystemPage from "../pages/SalonSystemPage/SalonSystemPage";
// import CartFixedRight from "../components/CartFixedRight/CartFixedRight";
// import Footer from "../components/Footer/Footer";
// import BackToTop from "../components/ScrollBackToTop";
import Service from "../pages/ServicePage/Service/Service";
import Booking from "../pages/Booking/Booking";
import ProductDetail from "../pages/ShopPage/ProductDetail/ProductDetail";

// import { useMediaQuery } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import Breadcrumb from "../components/GBreadcrumb/GBreadcrumb";
// import ScrollToTopOnMouse from "../components/ScrollToTopOnMouse/ScrollToTopOnMouse";
import Checkout from "../pages/Checkout/Checkout";
import Cart from "../pages/Cart/Cart";
import Payment from "../pages/Payment/Payment";
import Login from "../pages/Login/Login";
import SignIn from "../pages/SignIn/SignIn";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import Products from "../pages/Admin/Products/Products";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdminUser from "../pages/Admin/AdminUser/AdminUser";
import ProductCategory from "../pages/Admin/ProductCategory/ProductCategory";
import CustomerUser from "../pages/Admin/CustomerUser/CustomerUser";
import ProductImage from "../pages/Admin/ProductImage/ProductImage";
import ServiceCategory from "../pages/Admin/ServiceCategory/ServiceCategory";
import Services from "../pages/Admin/Services/Services";
import ServiceImage from "../pages/Admin/ServiceImage/ServiceImage";
import Discount from "../pages/Admin/Discount/Discount";
import AdminUserDetail from "../pages/Admin/AdminUser/AdminUserDetail/AdminUserDetail";

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

export const privateRoutes = [
    {
        path: "/admin",
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: "/admin/admin-user",
        component: AdminUser,
        layout: AdminLayout,
    },
    {
        path: "/admin/admin-user/:adminUserId",
        component: AdminUserDetail,
        layout: AdminLayout,
    },
    {
        path: "/admin/product",
        component: Products,
        layout: AdminLayout,
    },
    {
        path: "/admin/service",
        component: Services,
        layout: AdminLayout,
    },
    {
        path: "/admin/discount",
        component: Discount,
        layout: AdminLayout,
    },
    {
        path: "/admin/productImage/:productId/product",
        component: ProductImage,
        layout: AdminLayout,
    },
    {
        path: "/admin/serviceImage/:serviceId/service",
        component: ServiceImage,
        layout: AdminLayout,
    },
    {
        path: "/admin/product-category",
        component: ProductCategory,
        layout: AdminLayout,
    },
    {
        path: "/admin/service-category",
        component: ServiceCategory,
        layout: AdminLayout,
    },
    {
        path: "/admin/customer",
        component: CustomerUser,
        layout: AdminLayout,
    },
];
