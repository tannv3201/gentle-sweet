import Login from "../pages/Login/Login";
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
import CustomerUserDetail from "../pages/Admin/CustomerUser/CustomerUserDetail/CustomerUserDetail";
import ProductDetailAdmin from "../pages/Admin/Products/ProductDetail/ProductDetail";
import ServiceDetail from "../pages/Admin/Services/ServiceDetail/ServiceDetail";
import Invoice from "../pages/Admin/Invoice/Invoice";
import InvoiceDetail from "../pages/Admin/Invoice/InvoiceDetail/InvoiceDetail";
import BookingAdmin from "../pages/Admin/Booking/Booking";
import BookingDetail from "../pages/Admin/Booking/BookingDetail/BookingDetail";
import SignUp from "../pages/SignUp/SignUp";
import NoLayout from "../layouts/NoLayout/NoLayout";

import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import VerifyCode from "../pages/ForgotPassword/VerifyCode";
import PasswordChange from "../pages/ForgotPassword/PasswordChange";
import VerifyEmail from "../pages/SignUp/VerifyEmail";
// public routes

export const publicRoutes = [
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
    {
        path: "/",
        component: Dashboard,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/admin-user",
        component: AdminUser,
        layout: AdminLayout,
        role: 1,
    },
    {
        path: "/admin-user/:adminUserId",
        component: AdminUserDetail,
        layout: AdminLayout,
        role: 1,
    },
    {
        path: "/customer-user/:customerUserId",
        component: CustomerUserDetail,
        layout: AdminLayout,
        role: 2,
    },
    {
        path: "/customer-user",
        component: CustomerUser,
        layout: AdminLayout,
        role: 2,
    },
    {
        path: "/product",
        component: Products,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/product/:productId",
        component: ProductDetailAdmin,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/service",
        component: Services,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/invoice",
        component: Invoice,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/booking",
        component: BookingAdmin,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/booking/:bookingId",
        component: BookingDetail,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/invoice/:invoiceId",
        component: InvoiceDetail,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/service/:serviceId",
        component: ServiceDetail,
        layout: AdminLayout,
        role: 3,
    },
    {
        path: "/discount",
        component: Discount,
        layout: AdminLayout,
        role: 2,
    },
    {
        path: "/productImage/:productId/product",
        component: ProductImage,
        layout: AdminLayout,
        role: 2,
    },
    {
        path: "/serviceImage/:serviceId/service",
        component: ServiceImage,
        layout: AdminLayout,
        role: 2,
    },
    {
        path: "/product-category",
        component: ProductCategory,
        layout: AdminLayout,
        role: 2,
    },
    {
        path: "/service-category",
        component: ServiceCategory,
        layout: AdminLayout,
        role: 2,
    },
];
