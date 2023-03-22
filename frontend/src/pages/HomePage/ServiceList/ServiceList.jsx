import React from "react";
import classNames from "classnames/bind";
import styles from "./ServiceList.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import MyButton from "../../../components/MyButton/MyButton";
const cx = classNames.bind(styles);

function ServiceList() {
    return (
        <div className={cx("service-list-wrapper")}>
            <div className={cx("service-list-inner")}>
                <Grid container>
                    <Grid item xs={12} className={cx("service-list-title")}>
                        <h2>Danh mục dịch vụ</h2>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <div className={cx("service-item")}>
                            <div className={cx("service-img")}>
                                <img src={images.service_1} alt="" />
                            </div>
                            <div className={cx("service-content")}>
                                <h3 className={cx("service-title")}>
                                    Cắt và chăm sóc móng
                                </h3>
                                <p className={cx("service-description")}>
                                    Hãy để chúng tôi giúp bạn chăm sóc những bộ
                                    móng xinh xắn.
                                </p>
                                <MyButton
                                    fullWidth
                                    className={cx("service-btn")}
                                >
                                    Đặt lịch ngay
                                </MyButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-item")}>
                            <div className={cx("service-img")}>
                                <img src={images.service_2} alt="" />
                            </div>
                            <div className={cx("service-content")}>
                                <h3 className={cx("service-title")}>
                                    Sơn - vẽ - đắp gel
                                </h3>
                                <p className={cx("service-description")}>
                                    Chúng tôi sẽ tạo ra những tác phẩm nghệ
                                    thuật trên chính bộ móng của các bạn.
                                </p>
                                <MyButton
                                    fullWidth
                                    className={cx("service-btn")}
                                >
                                    Đặt lịch ngay
                                </MyButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("service-item")}>
                            <div className={cx("service-img")}>
                                <img src={images.service_3} alt="" />
                            </div>
                            <div className={cx("service-content")}>
                                <h3 className={cx("service-title")}>
                                    Tháo gen/bột và vệ sinh móng
                                </h3>
                                <p className={cx("service-description")}>
                                    Chúng tôi sẽ giúp bộ móng của bạn trở về
                                    dạng nguyên bản.
                                </p>
                                <MyButton
                                    fullWidth
                                    className={cx("service-btn")}
                                >
                                    Đặt lịch ngay
                                </MyButton>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <div className={cx("service-list-see-more")}>
                    <MyButton className={cx("see-more-btn")}>Xem thêm</MyButton>
                </div>
            </div>
        </div>
    );
}

export default ServiceList;
