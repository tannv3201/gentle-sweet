import React from "react";
import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SummaryCheckout from "./SummaryCheckout/SummaryCheckout";
import CheckoutInformation from "./CheckoutInformation/CheckoutInformation";
import { useLocation } from "react-router-dom";
const cx = classNames.bind(styles);

function Checkout() {
    const location = useLocation();
    const selectedProductCartList = location.state?.selectedProductCartList;

    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <main>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <Grid container spacing={2}>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <div style={{ height: "100%", width: "100%" }}>
                                <SummaryCheckout />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </main>
    );
}

export default Checkout;
