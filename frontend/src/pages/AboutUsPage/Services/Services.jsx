import React from "react";
import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";
import { FilterVintageRounded } from "@material-ui/icons";

const cx = classNames.bind(styles);

function Services() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("services-title")}>
                            <h1>Các dịch vụ của chúng tôi</h1>
                            <p>
                                Gentle là thương hiệu dịch vụ chăm sóc sắc đẹp
                                hàng đầu, cung cấp hơn 100 dịch vụ từ spa, tóc,
                                nails, trang điểm cho phái đẹp. Với đội ngũ
                                chuyên viên giàu kinh nghiệm và được đào tạo
                                chuyên sâu, Gentle cam kết mang đến cho khách
                                hàng trải nghiệm chăm sóc sắc đẹp hoàn hảo và
                                tuyệt vời.
                            </p>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("service-item")}>
                            <div className={cx("service-item-img")}>
                                <img src={images.service_2} alt="" />
                            </div>
                            <div className={cx("service-item-content")}>
                                <div className={cx("service-item-title")}>
                                    <FilterVintageRounded
                                        className={cx("service-title-icon")}
                                    />
                                    <h3 className={cx("service-title-text")}>
                                        Dịch vụ Nails
                                    </h3>
                                </div>
                                <p className={cx("service-item-description")}>
                                    Gentle không chỉ cung cấp dịch vụ làm nails
                                    đa dạng mà còn chăm sóc và nuôi dưỡng làn da
                                    tay và chân, để bạn có trải nghiệm chăm sóc
                                    sắc đẹp toàn diện.
                                </p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("service-item")}>
                            <div className={cx("service-item-img")}>
                                <img src={images.hair_design_service} alt="" />
                            </div>
                            <div className={cx("service-item-content")}>
                                <div className={cx("service-item-title")}>
                                    <FilterVintageRounded
                                        className={cx("service-title-icon")}
                                    />
                                    <h3 className={cx("service-title-text")}>
                                        Dịch vụ Hair
                                    </h3>
                                </div>
                                <p className={cx("service-item-description")}>
                                    Zema không chỉ mang đến những mẫu nails đa
                                    phong cách mà còn chăm sóc làn da tay, chân
                                    mịn màng.
                                </p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div className={cx("service-item")}>
                            <div className={cx("service-item-img")}>
                                <img src={images.service_spa} alt="" />
                            </div>
                            <div className={cx("service-item-content")}>
                                <div className={cx("service-item-title")}>
                                    <FilterVintageRounded
                                        className={cx("service-title-icon")}
                                    />
                                    <h3 className={cx("service-title-text")}>
                                        Dịch vụ Spa
                                    </h3>
                                </div>
                                <p className={cx("service-item-description")}>
                                    Zema không chỉ mang đến những mẫu nails đa
                                    phong cách mà còn chăm sóc làn da tay, chân
                                    mịn màng.
                                </p>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Services;
