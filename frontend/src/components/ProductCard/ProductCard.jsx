/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";

import { Rating } from "@mui/material";

import { useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/slice/authSlice";
import { useDispatch } from "react-redux";
import {
    createCart,
    getCartByUserId,
    updateCart,
} from "../../redux/api/apiCart";
import { toast } from "react-hot-toast";
import { FormatCurrency } from "../../utils/FormatCurrency/formatCurrency";

const cx = classNames.bind(styles);

export default function ProductCard({
    imageSrc,
    categoryName,
    productName,
    productPrice,
    valueRating,
    productSold,
    boxShadow,
    href,
    onSale,
    onClick,
    product,
}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const cartList = useSelector((state) => state.cart.cart?.cartList);

    useEffect(() => {
        const fetch = async () => {
            if (user) {
                await getCartByUserId(
                    user?.accessToken,
                    dispatch,
                    user?.id,
                    axiosJWT
                );
            }
        };
        fetch();
    }, [user?.id]);

    const handleAddToCart = async () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
            return;
        }
        const cartExist = cartList?.find((p) => p.product_id === product?.id);

        if (cartExist) {
            await updateCart(
                user?.accessToken,
                dispatch,
                user?.id,
                cartExist?.id,
                {
                    product_quantity: parseInt(cartExist?.product_quantity) + 1,
                },
                axiosJWT
            );
        } else {
            await createCart(
                user?.accessToken,
                dispatch,
                {
                    customer_user_id: user?.id,
                    product_id: product?.id,
                    product_name: product?.name,
                    product_quantity: 1,
                    unit_price: parseFloat(product?.price),
                    image_url: product?.image_url,
                },
                axiosJWT
            );
        }
    };

    return (
        <div
            className={
                boxShadow
                    ? cx("product-container", "boxShadow")
                    : cx("product-container")
            }
        >
            <div onClick={onClick} href={href} className={cx("product-img")}>
                <img src={imageSrc} alt="" />
                {onSale > 0 && (
                    <span
                        className={cx("label-sale")}
                    >{`Giảm ${onSale}%`}</span>
                )}
            </div>
            <div className={cx("product-content")}>
                <div className={cx("product-category")}>
                    <span>{categoryName}</span>
                </div>
                <div className={cx("product-name")}>
                    <h3 onClick={onClick}>{productName}</h3>
                </div>
                <div
                    className={
                        onSale > 0
                            ? cx("product-price-container", "onSale")
                            : cx("product-price-container")
                    }
                >
                    <span className={cx("product-price-default")}>
                        {FormatCurrency(productPrice)}
                    </span>
                    {onSale > 0 && (
                        <span className={cx("product-price-onsale")}>
                            {FormatCurrency(
                                productPrice - (productPrice * onSale) / 100
                            )}
                        </span>
                    )}
                </div>
                <div className={cx("product-rating-container")}>
                    <div className={cx("product-rating")}>
                        <Rating
                            readOnly
                            value={valueRating}
                            size="small"
                            className={cx("product-rating-star")}
                        />
                    </div>
                    <div className={cx("product-sold")}>
                        Đã bán:{" "}
                        {product?.productQuantitySold
                            ? product?.productQuantitySold
                            : 0}
                    </div>
                </div>
                <div className={cx("product-add-to-cart")}>
                    <div
                        onClick={handleAddToCart}
                        className={cx("product-add-to-cart-btn")}
                        href="#"
                    >
                        Thêm vào giỏ hàng
                    </div>
                </div>
            </div>
        </div>
    );
}
