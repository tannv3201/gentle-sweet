import React from "react";
import classNames from "classnames/bind";
import styles from "./Payment.module.scss";
import { Grid } from "@mui/material";

import SummaryPayment from "./SummaryPayment/SummaryPayment";
import PaymentInformation from "./PaymentInformation/PaymentInformation";
const cx = classNames.bind(styles);

function Payment() {
    return (
        <main>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <Grid container spacing={2}>
                        <Grid item lg={8} md={12} sm={12} xs={12}>
                            <PaymentInformation />
                        </Grid>
                        <Grid item lg={4} md={12} sm={12} xs={12}>
                            <div style={{ height: "100%", width: "100%" }}>
                                <SummaryPayment />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </main>
    );
}

export default Payment;
