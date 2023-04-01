import React from "react";
import styles from "./OutstandingService.module.scss";
import Slider from "react-slick";
import classNames from "classnames/bind";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import MyButton from "../../../components/MyButton/MyButton";
const cx = classNames.bind(styles);

function OutstandingService() {
    return (
        <div className={cx("outstanding-service-wrapper")}>
            <div className={cx("outstanding-service-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={cx("title")}>
                        <b></b>
                        <h2>Dịch vụ nổi bật</h2>
                        <b></b>
                    </Grid>
                    <Grid item xs={12} className={cx("sub-title")}>
                        <p>
                            Hoàn thiện vẻ đẹp, hạnh phúc viên mãn có lẽ là ước
                            mơ của mọi phụ nữ trên thế giới này. Đó cũng chính
                            là điều mà Gentle Beauty mong muốn dành cho phụ nữ
                            Việt. Chỉ khi bạn thật sự khỏe từ bên trong, đẹp từ
                            bên ngoài thì bạn mới tự tin hưởng trọn mọi khoảnh
                            khắc yêu thương của cuộc sống.
                        </p>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-wrapper")}>
                            <div className={cx("service-img")}>
                                <img src={images.service_1} alt="" />
                            </div>
                            <div className={cx("service-info")}>
                                <div className={cx("service-title")}>
                                    <h3>Vệ sinh và chăm sóc móng</h3>
                                </div>
                                <a
                                    className={cx("service-see-detail")}
                                    href="#"
                                >
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-wrapper")}>
                            <div className={cx("service-img")}>
                                <img src={images.service_2} alt="" />
                            </div>
                            <div className={cx("service-info")}>
                                <div className={cx("service-title")}>
                                    <h3>Thiết kế & vẽ móng</h3>
                                </div>
                                <a
                                    className={cx("service-see-detail")}
                                    href="#"
                                >
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-wrapper")}>
                            <div className={cx("service-img")}>
                                <img src={images.hair_care_service} alt="" />
                            </div>
                            <div className={cx("service-info")}>
                                <div className={cx("service-title")}>
                                    <h3>Phục hồi tóc</h3>
                                </div>
                                <a
                                    className={cx("service-see-detail")}
                                    href="#"
                                >
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-wrapper")}>
                            <div className={cx("service-img")}>
                                <img src={images.hair_design_service} alt="" />
                            </div>
                            <div className={cx("service-info")}>
                                <div className={cx("service-title")}>
                                    <h3>Thiết kế & tạo mẫu tóc</h3>
                                </div>
                                <a
                                    className={cx("service-see-detail")}
                                    href="#"
                                >
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-wrapper")}>
                            <div className={cx("service-img")}>
                                <img
                                    src={images.hair_chemistry_service}
                                    alt=""
                                />
                            </div>
                            <div className={cx("service-info")}>
                                <div className={cx("service-title")}>
                                    <h3>Các dịch vụ hóa chất tóc</h3>
                                </div>
                                <a
                                    className={cx("service-see-detail")}
                                    href="#"
                                >
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-wrapper")}>
                            <div className={cx("service-img")}>
                                <img src={images.other_service} alt="" />
                            </div>
                            <div className={cx("service-info")}>
                                <div className={cx("service-title")}>
                                    <h3>Dịch vụ khác</h3>
                                </div>
                                <a
                                    className={cx("service-see-detail")}
                                    href="#"
                                >
                                    Xem chi tiết
                                </a>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className={cx("outstanding-service-see-more")}>
                    <MyButton className={cx("see-more-btn")}>Xem thêm</MyButton>
                </div>
            </div>
        </div>
    );
}

export default OutstandingService;
