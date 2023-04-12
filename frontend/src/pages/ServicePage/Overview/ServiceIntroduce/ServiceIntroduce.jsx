import React from "react";
import classNames from "classnames/bind";
import styles from "./ServiceIntroduce.module.scss";
import images from "../../../../assets/images";
import { Grid } from "@mui/material";

const cx = classNames.bind(styles);

function ServiceIntroduce() {
    return (
        <Grid container spacing={2} className={cx("overview-wrapper")}>
            <Grid item xs={12} className={cx("title")}>
                <h2>Dịch vụ làm đẹp tại Gentle Beauty</h2>
            </Grid>
            <Grid item xs={12} className={cx("description")}>
                <p>
                    Gentle là thương hiệu dịch vụ chăm sóc sắc đẹp hàng đầu,
                    cung cấp hơn 100 dịch vụ từ spa, tóc, nails, trang điểm cho
                    phái đẹp. Với đội ngũ chuyên viên giàu kinh nghiệm và được
                    đào tạo chuyên sâu, Gentle cam kết mang đến cho khách hàng
                    trải nghiệm chăm sóc sắc đẹp hoàn hảo và tuyệt vời.
                </p>
            </Grid>
            <Grid item xs={12}>
                <div className={cx("img")}>
                    <img src={images.photo_realistic} alt="" />
                </div>
            </Grid>
        </Grid>
    );
}

export default ServiceIntroduce;
