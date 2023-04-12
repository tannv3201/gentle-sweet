import React from "react";
import classNames from "classnames/bind";
import styles from "./Services.module.scss";
import { Grid } from "@mui/material";
import images from "../../../assets/images";
import { FilterVintageRounded } from "@mui/icons-material";

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
                                    Gentle cung cấp dịch vụ làm nails và chăm
                                    sóc da tay chân để bạn trải nghiệm chăm sóc
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
                                    Gentle không chỉ làm cho mái tóc của bạn
                                    trông đẹp hơn, mà còn giúp tóc của bạn khỏe
                                    mạnh và chắc khỏe từ bên trong, để bạn có
                                    thể tự tin hơn.
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
                                    Tận hưởng những giây phút thư giãn tuyệt vời
                                    và được chăm sóc chu đáo tại Gentle với
                                    nhiều dịch vụ đa dạng và chất lượng.
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
