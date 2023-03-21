import React from "react";
import classNames from "classnames/bind";
import styles from "./ServiceList.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";

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
                <Grid container className={cx("service-list")} spacing={3}>
                    <Grid item xs={3} className={cx("service-item")}>
                        <div className={cx("service-item-bg")}>
                            <div className={cx("black-bg")}></div>
                            <img src={images.shopping_list_1} alt="" />
                        </div>
                        <div className={cx("service-item-group")}>
                            <a className={cx("title")} href="#">
                                Giày nam
                            </a>
                            <a className={cx("sub")} href="#">
                                New Arrivals
                            </a>
                            <a className={cx("sub")} href="#">
                                Best Seller
                            </a>
                            <a className={cx("sub")} href="#">
                                Sale-off
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={cx("service-item")}>
                        <div className={cx("service-item-bg")}>
                            <div className={cx("black-bg")}></div>
                            <img src={images.shopping_list_1} alt="" />
                        </div>
                        <div className={cx("service-item-group")}>
                            <a className={cx("title")} href="#">
                                Giày nam
                            </a>
                            <a className={cx("sub")} href="#">
                                New Arrivals
                            </a>
                            <a className={cx("sub")} href="#">
                                Best Seller
                            </a>
                            <a className={cx("sub")} href="#">
                                Sale-off
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={cx("service-item")}>
                        <div className={cx("service-item-bg")}>
                            <div className={cx("black-bg")}></div>
                            <img src={images.shopping_list_1} alt="" />
                        </div>
                        <div className={cx("service-item-group")}>
                            <a className={cx("title")} href="#">
                                Giày nam
                            </a>
                            <a className={cx("sub")} href="#">
                                New Arrivals
                            </a>
                            <a className={cx("sub")} href="#">
                                Best Seller
                            </a>
                            <a className={cx("sub")} href="#">
                                Sale-off
                            </a>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={cx("service-item")}>
                        <div className={cx("service-item-bg")}>
                            <div className={cx("black-bg")}></div>
                            <img src={images.shopping_list_1} alt="" />
                        </div>
                        <div className={cx("service-item-group")}>
                            <a className={cx("title")} href="#">
                                Giày nam
                            </a>
                            <a className={cx("sub")} href="#">
                                New Arrivals
                            </a>
                            <a className={cx("sub")} href="#">
                                Best Seller
                            </a>
                            <a className={cx("sub")} href="#">
                                Sale-off
                            </a>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ServiceList;
