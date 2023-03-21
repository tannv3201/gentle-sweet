import React from "react";
import styles from "./HomeBanner.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

function HomeBanner() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Slider {...settings} className={cx("slider")}>
                    <SliderItem
                        src={images.home_banner_slider_1}
                        // title={
                        //     "Tác phẩm nghệ thuật trên chính đôi bàn tay của bạn"
                        // }
                    />
                    <SliderItem src={images.home_banner_slider_2} />
                </Slider>
            </div>
        </div>
    );
}

export default HomeBanner;
