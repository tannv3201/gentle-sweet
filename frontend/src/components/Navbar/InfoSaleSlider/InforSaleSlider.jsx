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
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Slider {...settings} className={cx("slider")}>
                    <div className={cx("slider-item")}>
                        <h5>FREE SHIPPING VỚI HOÁ ĐƠN TỪ 800K !</h5>
                    </div>
                    <div className={cx("slider-item")}>
                        <h5>BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN</h5>
                    </div>
                    <div className={cx("slider-item")}>
                        <h5>HÀNG 2 TUẦN NHẬN ĐỔI - GIÀY NỬA NĂM BẢO HÀNH</h5>
                    </div>
                    <div className={cx("slider-item")}>
                        <h5>
                            BUY 2 GET 10% OFF - ÁP DỤNG VỚI TẤT CẢ BASIC TEE
                        </h5>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default InfoSaleSlider;
