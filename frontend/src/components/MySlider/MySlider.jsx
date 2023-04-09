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
    ...props
}) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 3000,
        autoplay: true,
        responsive: [
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: false,
                },
            },
        ],
    };

    return (
        <>
            <Slider {...settings} {...props} className={cx("slider")}>
                {children}
            </Slider>
        </>
    );
}

export default MySlider;
