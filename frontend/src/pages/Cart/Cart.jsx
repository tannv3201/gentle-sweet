import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Grid } from "@mui/material";
import CartProductList from "./CartProductList/CartProductList";
// import CartProductSummary from "./CartProductSummary/CartProductSummary";

const cx = classNames.bind(styles);

function Cart() {
    useEffect(() => {
        document.title = "Giỏ hàng";
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <CartProductList />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Cart;
