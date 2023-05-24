import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CartProductSummary.module.scss";
import { Grid } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function CartProductSummary() {
    const navigate = useNavigate();
    const handleCheckoutButtonClick = () => {
        navigate("/thu-tuc-thanh-toan");
    };

    const cartList = useSelector((state) => state.cart.cart?.cartList);
    const [priceTotal, setPriceTotal] = useState(0);
    const discountListCustomer = useSelector(
        (state) => state.discount.discount?.discountListCustomer
    );

    const getProductList = useSelector(
        (state) => state.product.product?.productListSearchLimit
    );

    useEffect(() => {
        if (cartList) {
            const newCartList = cartList?.map((item) => {
                let discount_percent;
                const getProduct = getProductList?.find(
                    (p) => p.id === parseInt(item?.product_id)
                );

                if (getProduct.discount_id) {
                    const getDiscount = discountListCustomer?.find(
                        (d) => d.id === parseInt(getProduct.discount_id)
                    );

                    discount_percent = getDiscount?.discount_percent;
                }
                return {
                    ...item,
                    unit_price_onsale:
                        item?.unit_price -
                        (item?.unit_price * discount_percent) / 100,
                    discount_percent: discount_percent,
                };
            });

            const priceTotal = newCartList.reduce(
                (accumulator, currentValue) => {
                    if (currentValue?.discount_percent) {
                        const discountedPrice =
                            parseFloat(currentValue?.unit_price) -
                            (parseFloat(currentValue?.unit_price) *
                                currentValue?.discount_percent) /
                                100;

                        return (
                            accumulator +
                            parseFloat(discountedPrice) *
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
    }, [cartList]);

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
                            Thanh toán ngay
                        </GButton>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default CartProductSummary;
