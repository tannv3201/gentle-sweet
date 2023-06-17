import React from "react";
import styles from "./ItemDetailDescription.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import { API_IMAGE_URL } from "../../LocalConstants";
import GImage from "../../components/GImage/GImage";

const cx = classNames.bind(styles);

function ItemDetailDescription({ itemDetail }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <article className={cx("product-description-text")}>
                            <p>{itemDetail?.description}</p>
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
                                itemDetail.image_url
                                    ? `${API_IMAGE_URL}/${itemDetail?.image_url}`
                                    : ""
                            }
                            caption={itemDetail?.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <article className={cx("product-description-text")}>
                            <p>{itemDetail?.description}</p>
                        </article>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ItemDetailDescription;
