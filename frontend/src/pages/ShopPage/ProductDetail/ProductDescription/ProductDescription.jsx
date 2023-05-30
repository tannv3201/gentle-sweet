import React from "react";
import styles from "./ProductDescription.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GImage from "../../../../common/GImage/GImage";
import { API_IMAGE_URL } from "../../../../LocalConstants";

const cx = classNames.bind(styles);

function ProductDescription({ productDetail }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <article className={cx("product-description-text")}>
                            <p>{productDetail?.description}</p>
                        </article>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        <GImage
                            imgSrc={
                                productDetail?.image_url
                                    ? `${API_IMAGE_URL}/${productDetail?.image_url}`
                                    : ""
                            }
                            caption={productDetail?.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <article className={cx("product-description-text")}>
                            <p>{productDetail?.description}</p>
                        </article>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ProductDescription;
