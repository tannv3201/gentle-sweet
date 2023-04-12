import React from "react";
import classNames from "classnames/bind";
import styles from "./CoreValues.module.scss";
import { Grid } from "@mui/material";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function CoreValues() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={3}>
                    <Grid
                        item
                        lg={4}
                        md={4}
                        sm={12}
                        xs={12}
                        className={cx("core-values-title")}
                    >
                        <h1>Giá trị cốt lõi</h1>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                        <div className={cx("core-values-col")}>
                            <h3>Trung thành</h3>
                            <span>
                                Gắn kết, kiên định một lòng vượt mọi thử thách.
                            </span>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                        <div className={cx("core-values-col")}>
                            <h3>Trách nhiệm</h3>
                            <span>
                                Chịu trách nhiệm 100% với hành vi, hành động,
                                việc làm của mình.
                            </span>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                        <div className={cx("core-values-col")}>
                            <h3>Tỏa sáng</h3>
                            <span>
                                Toả sáng từ trong suy nghĩ cho đến hành động.
                            </span>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={6} xs={6}>
                        <div className={cx("core-values-col")}>
                            <h3>Tích cực</h3>
                            <span>
                                tích cực từ trong suy nghĩ, luôn vui vẻ & hạnh
                                phúc.
                            </span>
                        </div>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <div className={cx("core-values-col")}>
                            <h3>Tận tâm</h3>
                            <span>
                                Kiên trì theo đuổi mục tiêu đến cùng, học hỏi
                                những thất bại, cố gắng hết sức, làm hết trách
                                nhiệm và hết khả năng của bản thân
                            </span>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default CoreValues;
