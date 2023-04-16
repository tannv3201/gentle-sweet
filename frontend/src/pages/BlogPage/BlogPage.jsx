import React from "react";
import classNames from "classnames/bind";
import styles from "./BlogPage.module.scss";
import { Grid } from "@mui/material";
import images from "../../assets/images";

import GTextField from "../../components/MyTextField/GTextField";
import GButton from "../../components/MyButton/MyButton";
const cx = classNames.bind(styles);

function BlogPage() {
    return (
        <div style={{ position: "relative", height: "1000px" }}>
            <div
                style={{
                    position: "sticky",
                    height: "100px",
                    backgroundColor: "red",
                    top: "120px",
                }}
            >
                <div className={cx("advise-form")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={cx("advise-img")}>
                                <img src={images.signin_advise} alt="" />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <GTextField
                                label="Họ và tên"
                                fullWidth
                                requiredlabel
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextField
                                label="Số điện thoại"
                                fullWidth
                                requiredlabel
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("signin-advise")}>
                                <GButton
                                    variant="outlined"
                                    className={cx("signin-advise-btn")}
                                >
                                    Đăng ký
                                </GButton>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default BlogPage;
