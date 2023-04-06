import React from "react";
import styles from "./OutstandingService.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@material-ui/core";
import { ArrowForwardRounded } from "@material-ui/icons";
import images from "../../../assets/images";
const cx = classNames.bind(styles);

function ServiceItem({ imageSrc, title }) {
    return (
        <div className={cx("service-wrapper")}>
            <div className={cx("service-img")}>
                <img src={imageSrc} alt="" />
            </div>
            <div className={cx("service-info")}>
                <div className={cx("service-title")}>
                    <h3>{title}</h3>
                </div>
                <a className={cx("service-see-detail")} href="#">
                    Xem chi tiết
                </a>
            </div>
        </div>
    );
}

function OutstandingService() {
    return (
        <div className={cx("outstanding-service-wrapper")}>
            <div className={cx("outstanding-service-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={12} md={12} className={cx("title")}>
                        <b></b>
                        <h2>Dịch vụ nổi bật</h2>
                        <b></b>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        lg={12}
                        md={12}
                        className={cx("sub-title")}
                    >
                        <p>
                            Hoàn thiện vẻ đẹp, hạnh phúc viên mãn có lẽ là ước
                            mơ của mọi phụ nữ trên thế giới này. Đó cũng chính
                            là điều mà Gentle Beauty mong muốn dành cho phụ nữ
                            Việt. Chỉ khi bạn thật sự khỏe từ bên trong, đẹp từ
                            bên ngoài thì bạn mới tự tin hưởng trọn mọi khoảnh
                            khắc yêu thương của cuộc sống.
                        </p>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item lg={4} md={6} sm={12} xs={12}>
                        <ServiceItem
                            imageSrc={images.service_1}
                            title="Vệ sinh và chăm sóc móng"
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <ServiceItem
                            imageSrc={images.service_2}
                            title="Thiết kế & vẽ móng"
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <ServiceItem
                            imageSrc={images.hair_care_service}
                            title="Phục hồi tóc"
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <ServiceItem
                            imageSrc={images.hair_design_service}
                            title="Thiết kế & tạo mẫu tóc"
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <ServiceItem
                            imageSrc={images.hair_chemistry_service}
                            title="Các dịch vụ hóa chất tóc"
                        />
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                        <ServiceItem
                            imageSrc={images.other_service}
                            title="Dịch vụ khác"
                        />
                    </Grid>
                </Grid>
                <div className={cx("outstanding-service-see-more")}>
                    <a href="#" className={cx("see-more-btn")}>
                        <span>Xem thêm</span> <ArrowForwardRounded />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default OutstandingService;
