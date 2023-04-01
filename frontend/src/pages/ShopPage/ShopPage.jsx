import React from "react";
import classNames from "classnames/bind";
import styles from "./ShopPage.module.scss";
import { Grid } from "@material-ui/core";
import ProductPortfolio from "./ProductPortfolio/ProductPortfolio";
import Product from "./Product/Product";
import FilterGroup from "./FilterGroup/FilterGroup";
const cx = classNames.bind(styles);

function ShopPage() {
    return (
        <div className={cx("shop-page-wrapper")}>
            <FilterGroup />
            <Product />
        </div>
    );
}

export default ShopPage;
