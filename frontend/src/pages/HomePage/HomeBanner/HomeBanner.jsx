import React from "react";
import styles from "./HomeBanner.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";
import "./style.css";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function SliderItem({ src, alt, title }) {
    return (
        <div className={cx("slider-item")}>
            <h1 className={cx("slider-item__title")}>{title}</h1>
            <img className={cx("slider-item__img")} src={src} alt={alt} />
        </div>
    );
}

const NextArrow = () => {
    return <></>;
};
const PrevArrow = () => {
    return <></>;
};

function HomeBanner() {
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
        <div className={cx("home-banner-wrapper")}>
            <div className={cx("home-banner-inner")}>
                <Slider {...settings} className={cx("slider")}>
                    <SliderItem src={images.home_banner_slider_2} />
                    <SliderItem src={images.home_banner_slider_1} />
                </Slider>
            </div>
        </div>
    );
}

export default HomeBanner;
