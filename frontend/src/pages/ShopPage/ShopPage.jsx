import React from "react";
import classNames from "classnames/bind";
import styles from "./ShopPage.module.scss";
import { Grid } from "@material-ui/core";
import ProductPortfolio from "./ProductPortfolio/ProductPortfolio";
import Product from "./Product/Product";

const cx = classNames.bind(styles);

function ShopPage() {
    return (
        <div className={cx("shop-page-wrapper")}>
            <div className={cx("shop-page-inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <ProductPortfolio />
                    </Grid>
                    <Grid item xs={9}>
                        <Product />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ShopPage;
