import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductPortfolio.module.scss";

const cx = classNames.bind(styles);

function ProductPortfolio() {
    return (
        <div className={cx("product-portfolio-wrapper")}>
            <div className={cx("product-portfolio-inner")}>
                ProductPortfolio page
            </div>
        </div>
    );
}

export default ProductPortfolio;
