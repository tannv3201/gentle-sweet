import React from "react";
import styles from "./ProductDescription.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GImage from "../../../../common/GImage/GImage";

const cx = classNames.bind(styles);

function ProductDescription({ productInfor }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <article className={cx("product-description-text")}>
                            <p>{productInfor?.description1}</p>
                        </article>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <GImage
                            imgSrc={productInfor?.image}
                            caption={productInfor?.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <article className={cx("product-description-text")}>
                            <p>{productInfor?.description2}</p>
                        </article>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ProductDescription;
