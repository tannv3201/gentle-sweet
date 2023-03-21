import React from "react";
import styles from "./Collection.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";
import { Grid } from "@material-ui/core";

const cx = classNames.bind(styles);

function Collection({ imgPath, alt, collectionTitle, collectionDescription }) {
    return (
        <div className={cx("collection-wrapper")}>
            <div className={cx("collection-inner")}>
                <Grid container>
                    <Grid item xs={12} className={cx("collection-img-wrapper")}>
                        <a href="#">
                            <img
                                className={cx("collection-img")}
                                src={imgPath}
                                alt={alt}
                            />
                        </a>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        className={cx("collection-content-wrapper")}
                    >
                        <h3 className={cx("collection-content__title")}>
                            <a href="#">{collectionTitle}</a>
                        </h3>
                        <h5 className={cx("collection-content__description")}>
                            <p>{collectionDescription}</p>
                        </h5>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

const NextArrow = () => {
    return <></>;
};
const PrevArrow = () => {
    return <></>;
};

function CollectionSlider({
    imgPath,
    alt,
    collectionTitle,
    collectionDescription,
}) {
    const settings = {
        dots: true,
        // infinite: true,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        // pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className={cx("collection-slider-wrapper")}>
            <div className={cx("collection-slider-inner")}>
                <Slider {...settings}>
                    <div className={cx("collection-slider-item")}>
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                className={cx("collection-img-wrapper")}
                            >
                                <a href="#">
                                    <img
                                        className={cx("collection-img")}
                                        src={imgPath}
                                        alt={alt}
                                    />
                                </a>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={cx("collection-content-wrapper")}
                            >
                                <h3 className={cx("collection-content__title")}>
                                    <a href="#">{collectionTitle}</a>
                                </h3>
                                <h5
                                    className={cx(
                                        "collection-content__description"
                                    )}
                                >
                                    <p>{collectionDescription}</p>
                                </h5>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={cx("collection-slider-item")}>
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                className={cx("collection-img-wrapper")}
                            >
                                <a href="#">
                                    <img
                                        className={cx("collection-img")}
                                        src={imgPath}
                                        alt={alt}
                                    />
                                </a>
                            </Grid>
                            {/* <Grid
                                item
                                xs={12}
                                className={cx("collection-content-wrapper")}
                            >
                                <h3 className={cx("collection-content__title")}>
                                    <a href="#">{collectionTitle}</a>
                                </h3>
                                <h5
                                    className={cx(
                                        "collection-content__description"
                                    )}
                                >
                                    <p>{collectionDescription}</p>
                                </h5>
                            </Grid> */}
                        </Grid>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export { Collection, CollectionSlider };
