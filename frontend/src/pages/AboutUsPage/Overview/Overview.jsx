import React from "react";
import classNames from "classnames/bind";
import styles from "./Overview.module.scss";
import { Grid } from "@mui/material";
import {
    HistoryRounded,
    ApartmentRounded,
    BusinessCenterRounded,
    EmailRounded,
    PhoneRounded,
} from "@mui/icons-material";
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
                    <Grid lg={9} md={9} sm={12} xs={12} item>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <div className={cx("establish")}>
                                        <HistoryRounded
                                            className={cx("establish-icon")}
                                        />
                                        <h3 className={cx("establish-text")}>
                                            Thành lập năm 2019
                                        </h3>
                                    </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <div className={cx("system")}>
                                        <ApartmentRounded
                                            className={cx("system-icon")}
                                        />
                                        <h3 className={cx("system-text")}>
                                            3 chi nhánh - 30 nhân sự
                                        </h3>
                                    </div>
                                </Grid>
                                {/* <Grid item lg={4} md={4} sm={12} xs={12}>
                                    <div className={cx("extend")}>
                                        <BusinessCenterRounded
                                            className={cx("extend-icon")}
                                        />
                                        <h3 className={cx("extend-text")}>
                                            Nhận được sự tin tưởng
                                        </h3>
                                    </div>
                                </Grid> */}
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <div className={cx("extend")}>
                                        <PhoneRounded
                                            className={cx("extend-icon")}
                                        />
                                        <h3 className={cx("extend-text")}>
                                            0399 859 634
                                        </h3>
                                    </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <div className={cx("extend")}>
                                        <EmailRounded
                                            className={cx("extend-icon")}
                                        />
                                        <h3
                                            className={cx(
                                                "extend-text",
                                                "isEmail"
                                            )}
                                        >
                                            <a href="mailto: gentlebeauty.cskh@gmail.com">
                                                gentlebeauty.cskh@gmail.com
                                            </a>
                                        </h3>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Overview;
