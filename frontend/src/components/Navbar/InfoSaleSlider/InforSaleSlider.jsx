import React from "react";
import styles from "./InforSaleSlider.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./style.css";

const cx = classNames.bind(styles);

function InfoSaleSlider() {
    const settings = {
        // dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Slider {...settings} className={cx("slider")}>
                    <div className={cx("slider-item")}>
                        <h5>Free shipping với hóa đơn trên 500k!</h5>
                    </div>
                    <div className={cx("slider-item")}>
                        <h5>Ra mắt BST "Mùa hè rực rỡ"</h5>
                    </div>
                    <div className={cx("slider-item")}>
                        <h5>Giảm giá 10% khi mua từ 2 loại sơn</h5>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default InfoSaleSlider;
