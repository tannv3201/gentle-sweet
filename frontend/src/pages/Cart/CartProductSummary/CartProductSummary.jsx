import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CartProductSummary.module.scss";
import { Grid } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import { DeleteRounded } from "@mui/icons-material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import { useNavigate } from "react-router-dom";

import {
    HorizontalRuleRounded,
    AddRounded,
    AddShoppingCartRounded,
} from "@mui/icons-material";

const cx = classNames.bind(styles);

function CartProductSummary() {
    const navigate = useNavigate();
    const handleCheckoutButtonClick = () => {
        navigate("/thu-tuc-thanh-toan");
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("subtotal")}>
                            <span className={cx("subtotal-title")}>
                                Tạm tính
                            </span>
                            <span className={cx("subtotal-price")}>
                                {FormatCurrency(175000)}
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("discount")}>
                            <span className={cx("discount-title")}>
                                Giảm giá
                            </span>
                            <span className={cx("discount-price")}>
                                {FormatCurrency(0)}
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("total")}>
                            <span className={cx("total-title")}>Tổng tiền</span>
                            <span className={cx("total-price")}>
                                {FormatCurrency(175000)}
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <GButton
                            className={cx("checkout-now-btn")}
                            fullWidth
                            size="medium"
                            onClick={handleCheckoutButtonClick}
                        >
                            Thanh toán ngay
                        </GButton>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default CartProductSummary;
