import React from "react";
import styles from "./HomeBlog.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";
import "./style.css";
import images from "../../../assets/images";
import { ArrowLeftRounded, ArrowRightRounded } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import MyButton from "../../../components/MyButton/MyButton";

const cx = classNames.bind(styles);

function SliderItem({ src, alt, title }) {
    return (
        <div className={cx("slider-item")}>
            <h1 className={cx("slider-item__title")}>{title}</h1>
            <img className={cx("slider-item__img")} src={src} alt={alt} />
        </div>
    );
}

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
function HomeBlog() {
    const settings = {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className={cx("home-blog-wrapper")}>
            <div className={cx("home-blog-inner")}>
                <div className={cx("home-blog-title")}>
                    <h2>Tin tức & bài viết</h2>
                </div>
                <Slider {...settings} className={cx("slider")}>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className={cx("slider-item-wrapper")}>
                        <div className={cx("slider-item")}>
                            <div className={cx("slider-blog-img")}>
                                <img src={images.collection_1} />
                            </div>
                            <div className={cx("slider-blog-content")}>
                                <h3 className={cx("blog-content-title")}>
                                    <a href="#">URBAS CORLURAY PACK</a>
                                </h3>
                                <h3 className={cx("blog-content-description")}>
                                    <p>
                                        Urbas Corluray Pack đem đến lựa chọn
                                        “làm mới mình” với sự kết hợp 5 gam màu
                                        mang sắc thu; phù hợp với những người
                                        trẻ năng động, mong muốn thể
                                    </p>
                                </h3>
                                <h3 className={cx("blog-content-detail")}>
                                    <a href="">Đọc thêm</a>
                                </h3>
                            </div>
                        </div>
                    </div>
                </Slider>
                <div className={cx("home-blog-see-more")}>
                    <MyButton className={cx("see-more-btn")}>Xem thêm</MyButton>
                </div>
            </div>
        </div>
    );
}

export default HomeBlog;
