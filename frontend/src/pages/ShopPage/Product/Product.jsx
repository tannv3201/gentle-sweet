import React from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

function Product() {
    return (
        <div className={cx("product-wrapper")}>
            <div className={cx("product-inner")}>Product page</div>
        </div>
    );
}

export default Product;
