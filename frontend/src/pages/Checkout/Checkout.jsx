import React from "react";
import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import { Grid } from "@mui/material";
import RelatedInformation from "./RelatedInformation/RelatedInformation";
import images from "../../assets/images";
import CheckoutInformation from "./CheckoutInformation/CheckoutInformation";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SummaryCheckout from "./SummaryCheckout/SummaryCheckout";
const cx = classNames.bind(styles);

function Checkout() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <main>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <Grid container spacing={2}>
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                            <CheckoutInformation />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
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
