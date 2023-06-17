import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CartProductSummary.module.scss";
import { Grid } from "@mui/material";
import GButton from "../../../../components/MyButton/MyButton";
import { FormatCurrency } from "../../../../components/FormatCurrency/FormatCurrency";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const cx = classNames.bind(styles);

function CartProductSummary({ selectedProductCartList }) {
    const navigate = useNavigate();
    const handleCheckoutButtonClick = () => {
        if (selectedProductCartList?.length === 0) {
            toast.error("Vui lòng chọn sản phẩm");
        } else {
            navigate("/thanh-toan", {
                state: {
                    selectedProductCartList: selectedProductCartList,
                },
            });
        }
    };

    const [priceTotal, setPriceTotal] = useState(0);
    useEffect(() => {
        if (selectedProductCartList) {
            const priceTotal = selectedProductCartList.reduce(
                (accumulator, currentValue) => {
                    if (currentValue?.unit_price_onsale > 0) {
                        return (
                            accumulator +
                            parseFloat(currentValue?.unit_price_onsale) *
                                currentValue?.product_quantity
                        );
                    } else {
                        return (
                            accumulator +
                            parseFloat(currentValue?.unit_price) *
                                currentValue?.product_quantity
                        );
                    }
                },
                0
            );
            setPriceTotal(priceTotal);
        }
    }, [selectedProductCartList]);

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
                                {FormatCurrency(priceTotal)}
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
                                {FormatCurrency(priceTotal)}
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
                            Tạo đơn hàng
                        </GButton>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default CartProductSummary;
