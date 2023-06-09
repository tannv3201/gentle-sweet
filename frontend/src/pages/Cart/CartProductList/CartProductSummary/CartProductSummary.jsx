import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CartProductSummary.module.scss";
import { Grid } from "@mui/material";
import GButton from "../../../../components/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FormatCurrency } from "../../../../utils/FormatCurrency/formatCurrency";
import { checkQuantityAllowList } from "../../../../redux/api/apiProduct";

const cx = classNames.bind(styles);

function CartProductSummary({ selectedProductCartList }) {
    const navigate = useNavigate();
    const [productErrorList, setProductErrorList] = useState([]);
    const handleCheckoutButtonClick = async () => {
        if (selectedProductCartList?.length === 0) {
            toast.error("Vui lòng chọn sản phẩm");
            return;
        }
        const isAllow = await checkQuantityAllowList(selectedProductCartList);
        if (isAllow?.isAllow) {
            navigate("/thanh-toan", {
                state: {
                    selectedProductCartList: selectedProductCartList,
                },
            });
        } else {
            toast.error(
                `Có ${productErrorList?.length} sản phẩm không đủ số lượng có sẵn.`
            );
        }
    };

    const [priceTotal, setPriceTotal] = useState(0);
    useEffect(() => {
        if (selectedProductCartList) {
            const priceTotal = selectedProductCartList.reduce(
                (accumulator, currentValue) => {
                    if (currentValue?.product_price_onsale > 0) {
                        return (
                            accumulator +
                            parseFloat(currentValue?.product_price_onsale) *
                                currentValue?.product_quantity
                        );
                    } else {
                        return (
                            accumulator +
                            parseFloat(currentValue?.product_price) *
                                currentValue?.product_quantity
                        );
                    }
                },
                0
            );

            const filterProductError = selectedProductCartList?.filter(
                (p) => p?.isAllow === false
            );
            setProductErrorList(filterProductError);
            setPriceTotal(priceTotal);
        }
    }, [selectedProductCartList]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <div className={cx("subtotal")}>
                            <span className={cx("subtotal-title")}>
                                Tạm tính
                            </span>
                            <div className={cx("subtotal-price-wrapper")}>
                                {selectedProductCartList?.length > 0 && (
                                    <span className={cx("product-quantity")}>
                                        &#40;
                                        {selectedProductCartList?.length} sản
                                        phẩm&#41;
                                    </span>
                                )}
                                <div className={cx("subtotal-price")}>
                                    {FormatCurrency(priceTotal)}
                                </div>
                            </div>
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
                            disabled={selectedProductCartList?.length === 0}
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
