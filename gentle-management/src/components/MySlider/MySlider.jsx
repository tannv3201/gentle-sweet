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
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        prevArrow: <PrevArrow />,
        nextArrow: <PrevArrow />,
    };

    return (
        <>
            <Slider
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
                {...settings}
                {...props}
                className={cx("slider")}
            >
                {children}
            </Slider>
        </>
    );
}

export default MySlider;
