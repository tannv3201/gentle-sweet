import React from "react";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";

const cx = classNames.bind(styles);

function ProductDetail() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={cx()}></div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ProductDetail;
