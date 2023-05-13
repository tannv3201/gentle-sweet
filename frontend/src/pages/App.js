import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import "../assets/scss/Global.scss";
import { privateRoutes, publicRoutes } from "../routes";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import { Fragment } from "react";
import { Toaster } from "react-hot-toast";

import { useSelector } from "react-redux";
import GProgress from "../components/GProgress/GProgress";

function App() {
    const isFetching = useSelector((state) => {
        return (
            state.adminUser.adminUser?.isFetching ||
            state.product.product?.isFetching ||
            state.productCategory.productCategory?.isFetching
        );
    });

    return (
        <Router>
            <div className="App">
                <Toaster position="top-right" />
                <GProgress isLoading={isFetching} />
                <Routes>
                    {publicRoutes?.map((route, index) => {
                        const Page = route?.component;

                        let Layout = DefaultLayout;
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

                        let Layout = DefaultLayout;
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
                                    // currentUser?.role_name === "SUPER_ADMIN" ? (
                                    <Layout>
                                        <Page />
                                    </Layout>
                                    // ) : (
                                    //     <Navigate to="/dang-nhap" replace />
                                    // )
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
