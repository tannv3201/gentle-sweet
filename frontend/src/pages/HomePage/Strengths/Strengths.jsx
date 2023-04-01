import React from "react";
import classNames from "classnames/bind";
import styles from "./Strengths.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import MyButton from "../../../components/MyButton/MyButton";
import { FavoriteRounded } from "@material-ui/icons";

const cx = classNames.bind(styles);

function Strengths() {
    return (
        <div className={cx("advantage-wrapper")}>
            <div className={cx("advantage-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} className={cx("title")}>
                        <b></b>

                        <h2>
                            <FavoriteRounded />
                            <span>
                                Gentle luôn là điểm đến làm đẹp lý tưởng
                            </span>
                        </h2>
                        <b></b>
                    </Grid>
                </Grid>
                <Grid container spacing={3} className={cx("advantage")}>
                    <Grid item xs={6}>
                        <ul>
                            <li>Là sự lựa chọn của 1000 khách hàng mỗi ngày</li>
                            <li>Kỹ thuật viên nhiều năm kinh nghiệm</li>
                            <li>Luôn cam kết hiệu quả mọi dịch vụ</li>
                        </ul>
                    </Grid>
                    <Grid item xs={6}>
                        <ul>
                            <li>Cơ sở vật chất hiện đại</li>
                            <li>Luôn dẫn đầu về các công nghệ làm đẹp</li>
                            <li>
                                Luôn tư vấn và chuyên gia đưa ra liệu trình phù
                                hợp
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    container
                    spacing={3}
                    className={cx("photo-realistic")}
                >
                    <Grid item xs={3}>
                        <div className={cx("photo-realistic-img")}>
                            <img src={images.photo_realistic} alt="" />
                            <span>Không gian làm việc</span>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={cx("photo-realistic-img")}>
                            <img src={images.photo_realistic} alt="" />
                            <span>Máy móc & công cụ</span>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={cx("photo-realistic-img")}>
                            <img src={images.photo_realistic} alt="" />
                            <span>Đội ngũ nhân viên</span>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div className={cx("photo-realistic-img")}>
                            <img src={images.photo_realistic} alt="" />
                            <span>Đa dạng dịch vụ</span>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Strengths;
