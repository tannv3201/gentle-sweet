import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";

import { Rating } from "@mui/material";

import { FormatCurrency } from "../../components/FormatCurrency/FormatCurrency";

const cx = classNames.bind(styles);

export default function ProductCard({
    imageSrc,
    categoryName,
    productName,
    productPrice,
    valueRating,
    productSold,
    boxShadow,
}) {
    return (
        <div
            className={
                boxShadow
                    ? cx("product-container", "boxShadow")
                    : cx("product-container")
            }
        >
            <a href="#" className={cx("product-img")}>
                <img src={imageSrc} alt="" />
            </a>
            <div className={cx("product-content")}>
                <div className={cx("product-category")}>
                    <span>{categoryName}</span>
                </div>
                <h3 className={cx("product-name")}>
                    <a href="">{productName}</a>
                </h3>
                <div className={cx("product-price-container")}>
                    <span className={cx("product-price")}>
                        {FormatCurrency(productPrice)}
                    </span>
                </div>
                <div className={cx("product-rating-container")}>
                    <div className={cx("product-rating")}>
                        {/* <Rating
                            readOnly
                            value={valueRating}
                            size="small"
                            className={cx("product-rating-star")}
                        /> */}
                    </div>
                    <div className={cx("product-sold")}>
                        Đã bán: {productSold}
                    </div>
                </div>
                <div className={cx("product-add-to-cart")}>
                    <a href="">Thêm vào giỏ hàng</a>
                </div>
            </div>
        </div>
    );
}
