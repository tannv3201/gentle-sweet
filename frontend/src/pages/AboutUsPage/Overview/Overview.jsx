import React from "react";
import classNames from "classnames/bind";
import styles from "./Overview.module.scss";
import { Grid } from "@material-ui/core";
import {
    HistoryRounded,
    ApartmentRounded,
    BusinessCenterRounded,
} from "@material-ui/icons";
const cx = classNames.bind(styles);

function Overview() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className={cx("overview-title")}>
                            <h2>Gentle Beauty</h2>
                            <h2 className={cx("overview-title-normal")}>
                                Thư giãn tối đa, sắc đẹp tối ưu
                            </h2>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className={cx("establish")}>
                            <HistoryRounded className={cx("establish-icon")} />
                            <h3 className={cx("establish-text")}>
                                Thành lập năm 2016
                            </h3>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className={cx("system")}>
                            <ApartmentRounded className={cx("system-icon")} />
                            <h3 className={cx("system-text")}>
                                6 chi nhánh - 30 nhân sự
                            </h3>
                        </div>
                    </Grid>
                    <Grid item lg={3} md={3} sm={12} xs={12}>
                        <div className={cx("extend")}>
                            <BusinessCenterRounded
                                className={cx("extend-icon")}
                            />
                            <h3 className={cx("extend-text")}>
                                Nhận được sự tin tưởng
                            </h3>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Overview;
