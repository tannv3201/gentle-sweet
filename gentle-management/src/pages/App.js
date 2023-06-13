import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import "../assets/scss/Global.scss";
import { privateRoutes, publicRoutes } from "../routes";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import GProgress from "../components/GProgress/GProgress";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

function App() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isFetching = useSelector((state) => {
        return (
            state.adminUser.adminUser?.isFetching ||
            state.customerUser.customerUser?.isFetching ||
            state.product.product?.isFetching ||
            state.productCategory.productCategory?.isFetching ||
            state.service.service?.isFetching ||
            state.serviceCategory.serviceCategory?.isFetching ||
            state.discount.discount?.isFetching
        );
    });
    const user = useSelector((state) => state.auth.login?.currentUser);

    return (
        <Router>
            <div className="App">
                <Toaster position={isMedium ? "top-center" : "top-right"} />
                <GProgress isLoading={isFetching} />
                <Routes>
                    {publicRoutes?.map((route, index) => {
                        const Page = route?.component;

                        let Layout;
                        if (route?.layout) {
                            Layout = route.layout;
                        } else if (route?.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route?.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes?.map((route, index) => {
                        const Page = route?.component;
                        let accessRoute;
                        if (user?.role_id <= route?.role) {
                            accessRoute = true;
                        } else {
                            accessRoute = false;
                        }

                        let Layout;
                        if (route?.layout) {
                            Layout = route.layout;
                        } else if (route?.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={route?.path}
                                element={
                                    accessRoute ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to="/dang-nhap" replace />
                                    )
                                }
                            />
                        );
                    })}
                    <Route path="/*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
