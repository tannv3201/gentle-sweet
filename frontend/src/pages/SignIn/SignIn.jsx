/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./SignIn.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid } from "@mui/material";
import GTextField from "../../components/GTextField/GTextField";
import GButton from "../../components/MyButton/MyButton";
import { Google } from "@mui/icons-material";
import { Formik } from "formik";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
const cx = classNames.bind(styles);

function SignIn() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const [user, setUser] = useState({
    //     username: "",
    //     password: "",
    // });
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={cx("col-left")}>
                            <img src={images.login_bg} alt="" />
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={cx("col-right")}>
                            <div className={cx("signin-form-wrapper")}>
                                <Formik>
                                    {(props) => (
                                        <form onSubmit={props.handleSubmit}>
                                            <div className={cx("signin-form")}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <span
                                                            className={cx(
                                                                "login-title"
                                                            )}
                                                        >
                                                            <h2>
                                                                Tạo tài khoản
                                                            </h2>
                                                        </span>
                                                        <span
                                                            className={cx(
                                                                "login-sub-title"
                                                            )}
                                                        >
                                                            Hãy đăng ký để nhận
                                                            nhiều ưu đãi từ
                                                            Gentle Beauty.
                                                        </span>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <GTextField
                                                            fullWidth
                                                            label={"Họ"}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <GTextField
                                                            fullWidth
                                                            label={"Tên"}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <GTextField
                                                            fullWidth
                                                            label={
                                                                "Tên hiển thị"
                                                            }
                                                            disabled
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <GTextField
                                                            fullWidth
                                                            label={"Email"}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <GTextField
                                                            fullWidth
                                                            label={
                                                                "Số điện thoại"
                                                            }
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <GTextField
                                                            fullWidth
                                                            label={"Mật khẩu"}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <GButton
                                                            size="large"
                                                            fullWidth
                                                        >
                                                            Đăng ký
                                                        </GButton>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "divider"
                                                            )}
                                                        >
                                                            <b />{" "}
                                                            <span>hoặc</span>{" "}
                                                            <b />
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "another-signin"
                                                            )}
                                                        >
                                                            <GButton
                                                                startIcon={
                                                                    <Google />
                                                                }
                                                                fullWidth
                                                            >
                                                                Google
                                                            </GButton>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <span
                                                            className={cx(
                                                                "register"
                                                            )}
                                                        >
                                                            Bạn đã có tài khoản?{" "}
                                                            <a href="#">
                                                                Đăng nhập
                                                            </a>
                                                        </span>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </form>
                                    )}
                                </Formik>
                                <div className={cx("copy-right")}>
                                    <span>2023 © ALL RIGHT RESERVED</span>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default SignIn;
