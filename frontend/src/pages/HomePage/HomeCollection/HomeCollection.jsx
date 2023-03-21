import React from "react";
import styles from "./HomeCollection.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";
import { Grid } from "@material-ui/core";
import { Collection, CollectionSlider } from "./Collection/Collection";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function HomeCollection() {
    return (
        <div className={cx("home-collection-wrapper")}>
            <div className={cx("home-collection-inner")}>
                <Grid container spacing={4}>
                    <Grid item xs={6}>
                        <Collection
                            collectionTitle={"Outlet sale"}
                            collectionDescription={
                                'Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.'
                            }
                            imgPath={images.banner_sale_off_1}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Collection
                            collectionTitle={"Outlet sale"}
                            collectionDescription={
                                'Danh mục những sản phẩm bán tại "giá tốt hơn" chỉ được bán kênh online - Online Only, chúng đã từng làm mưa làm gió một thời gian và hiện đang rơi vào tình trạng bể size, bể số.'
                            }
                            imgPath={images.banner_sale_off_1}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default HomeCollection;
