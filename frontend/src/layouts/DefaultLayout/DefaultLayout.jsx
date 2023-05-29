import React from "react";
import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import GBreadcrumb from "../components/GBreadcrumb/GBreadcrumb";
import CartFixedRight from "../components/CartFixedRight/CartFixedRight";

import ScrollToTopOnMouse from "../components/ScrollToTopOnMouse/ScrollToTopOnMouse";
import ScrollBackToTop from "../components/ScrollBackToTop";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <>
            <div className={cx("wrapper")}>
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
                        {/* {!isMedium && <CartFixedRight />} */}
                        <GBreadcrumb />
                        {children}
                    </div>
                    <Footer />
                </ScrollBackToTop>
            </div>
        </>
    );
}

export default DefaultLayout;
