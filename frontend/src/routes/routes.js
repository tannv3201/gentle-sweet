import HomePage from "../pages/HomePage/HomePage";
import ShopPage from "../pages/ShopPage/ShopPage";
import ServiceOverviewIndex from "../pages/ServicePage/Overview/ServiceOverviewIndex";
import BlogPage from "../pages/BlogPage/BlogPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import SalonSystemPage from "../pages/SalonSystemPage/SalonSystemPage";

import Service from "../pages/ServicePage/Service/Service";
import Booking from "../pages/Booking/Booking";
import ProductDetail from "../pages/ShopPage/ProductDetail/ProductDetail";

import Checkout from "../pages/Checkout/Checkout";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";

import PurchaseOrder from "../pages/PurchaseOrder/PurchaseOrder";
import SignUp from "../pages/SignUp/SignUp";
import NoLayout from "../layouts/NoLayout/NoLayout";
import Account from "../pages/Account/Account";
import ServiceDetailCustomer from "../pages/ServicePage/ServiceDetail/ServiceDetail";
import BookedSchedule from "../pages/BookedSchedule/BookedSchedule";

import ServiceCategoryDetail from "../pages/ServicePage/ServiceCategoryDetail/ServiceCategoryDetail";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyCode from "../pages/ForgotPassword/VerifyCode";
import PasswordChange from "../pages/ForgotPassword/PasswordChange";
import VerifyEmail from "../pages/SignUp/VerifyEmail";
import OrderDetail from "../pages/PurchaseOrder/OrderDetail/OrderDetail";
import BookedDetail from "../pages/BookedSchedule/BookedDetail/BookedDetail";
// public routes

export const publicRoutes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/san-pham",
        component: ShopPage,
    },
    {
        path: "/danh-muc-dich-vu",
        component: ServiceOverviewIndex,
    },
    {
        path: "/danh-muc-dich-vu/:serviceCategoryId",
        component: ServiceCategoryDetail,
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
        path: "/san-pham/:productId",
        component: ProductDetail,
    },
    {
        path: "/danh-muc-dich-vu/dich-vu/:serviceId",
        component: ServiceDetailCustomer,
    },
    {
        path: "/thanh-toan",
        component: Checkout,
    },
    {
        path: "/gio-hang",
        component: Cart,
    },
    {
        path: "/don-mua",
        component: PurchaseOrder,
    },
    {
        path: "/don-mua/:invoiceId",
        component: OrderDetail,
    },
    {
        path: "/quan-ly-lich-dat",
        component: BookedSchedule,
    },
    {
        path: "/quan-ly-lich-dat/:bookingId",
        component: BookedDetail,
        // component: DetailBookedSchedule,
    },
    {
        path: "/tai-khoan",
        component: Account,
    },
    {
        path: "/dang-nhap",
        component: Login,
        layout: null,
    },
    {
        path: "/dang-ky",
        component: SignUp,
        layout: NoLayout,
    },
    {
        path: "/quen-mat-khau",
        component: ForgotPassword,
        layout: null,
    },
    {
        path: "/quen-mat-khau/xac-thuc",
        component: VerifyCode,
        layout: null,
    },
    {
        path: "/dang-ky/xac-thuc",
        component: VerifyEmail,
        layout: null,
    },
    {
        path: "/doi-mat-khau",
        component: PasswordChange,
        layout: null,
    },
];

export const privateRoutes = [
    // {
    //     path: "/admin",
    //     component: Dashboard,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/admin-user",
    //     component: AdminUser,
    //     layout: AdminLayout,
    //     role: 1,
    // },
    // {
    //     path: "/admin/admin-user/:adminUserId",
    //     component: AdminUserDetail,
    //     layout: AdminLayout,
    //     role: 1,
    // },
    // {
    //     path: "/admin/customer-user/:customerUserId",
    //     component: CustomerUserDetail,
    //     layout: AdminLayout,
    //     role: 2,
    // },
    // {
    //     path: "/admin/customer-user",
    //     component: CustomerUser,
    //     layout: AdminLayout,
    //     role: 2,
    // },
    // {
    //     path: "/admin/product",
    //     component: Products,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/product/:productId",
    //     component: ProductDetailAdmin,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/service",
    //     component: Services,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/invoice",
    //     component: Invoice,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/booking",
    //     component: BookingAdmin,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/booking/:bookingId",
    //     component: BookingDetail,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/invoice/:invoiceId",
    //     component: InvoiceDetail,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/service/:serviceId",
    //     component: ServiceDetail,
    //     layout: AdminLayout,
    //     role: 3,
    // },
    // {
    //     path: "/admin/discount",
    //     component: Discount,
    //     layout: AdminLayout,
    //     role: 2,
    // },
    // {
    //     path: "/admin/productImage/:productId/product",
    //     component: ProductImage,
    //     layout: AdminLayout,
    //     role: 2,
    // },
    // {
    //     path: "/admin/serviceImage/:serviceId/service",
    //     component: ServiceImage,
    //     layout: AdminLayout,
    //     role: 2,
    // },
    // {
    //     path: "/admin/product-category",
    //     component: ProductCategory,
    //     layout: AdminLayout,
    //     role: 2,
    // },
    // {
    //     path: "/admin/service-category",
    //     component: ServiceCategory,
    //     layout: AdminLayout,
    //     role: 2,
    // },
];
