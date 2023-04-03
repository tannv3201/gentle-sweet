import React from "react";
import styles from "./MySlider.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "-50px !important" }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "-50px !important" }}
            onClick={onClick}
        />
    );
}

function MySlider({
    children,
    autoplay,
    infinite,
    autoplaySpeed,
    pauseOnHover,
    slidesToShow,
    slidesToScroll,
}) {
    const settings = {
        infinite: infinite,
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        pauseOnHover: pauseOnHover,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <>
            <Slider {...settings} className={cx("slider")}>
                {children}
            </Slider>
        </>
    );
}

export default MySlider;
