import React from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid } from "@mui/material";
import GButton from "../../components/MyButton/MyButton";
import { Google, Facebook } from "@mui/icons-material";
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Formik, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { useToasterStore } from "react-hot-toast";
import { useEffect } from "react";
import * as Yup from "yup";
import GTextFieldNormal from "../../components/GTextField/GTextFieldNormal";
import { loginUser } from "../../redux/api/apiAuth";

const cx = classNames.bind(styles);

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Vui lòng không để trống")
        .min(6, "Tên tài khoản phải có ít nhất 6 kí tự")
        .max(20, "Tên tài khoản tối đa 20 kí tự"),
    password: Yup.string()
        .required("Vui lòng không để trống")
        .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
        .max(20, "Mật khẩu tối đa 20 kí tự"),
});

function Login() {
    const { toasts } = useToasterStore();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        toasts
            .filter((t) => t.visible)
            .filter((_, i) => i >= 1)
            .forEach((t) => toast.dismiss(t.id));
    }, [toasts]);

    const handleSubmit = (value) => {
        loginUser(value, dispatch, navigate);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (data) => {
            handleSubmit(data);
        },
    });

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
                                <div className={cx("signin-form")}>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "login-title"
                                                    )}
                                                >
                                                    <h2>
                                                        Chào mừng bạn quay trở
                                                        lại!
                                                    </h2>
                                                </span>
                                                <span
                                                    className={cx(
                                                        "login-sub-title"
                                                    )}
                                                >
                                                    Hãy đăng nhập để nhận nhiều
                                                    ưu đãi từ Gentle Beauty.
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <GTextFieldNormal
                                                    fullWidth
                                                    label={"Tên đăng nhập"}
                                                    name="username"
                                                    value={
                                                        formik.values?.username
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    formik={formik}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <GTextFieldNormal
                                                    fullWidth
                                                    label={"Mật khẩu"}
                                                    name="password"
                                                    type="password"
                                                    value={
                                                        formik.values?.password
                                                    }
                                                    onChange={
                                                        formik.handleChange
                                                    }
                                                    formik={formik}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "forgot-password"
                                                    )}
                                                >
                                                    <a href="">
                                                        Quên mật khẩu?
                                                    </a>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <GButton
                                                    size="large"
                                                    fullWidth
                                                    type="submit"
                                                    disabled={
                                                        formik.isSubmitting
                                                    }
                                                >
                                                    Đăng nhập
                                                </GButton>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className={cx("divider")}>
                                                    <b /> <span>hoặc</span>{" "}
                                                    <b />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "another-signin"
                                                    )}
                                                >
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <GButton
                                                                startIcon={
                                                                    <Google />
                                                                }
                                                                fullWidth
                                                            >
                                                                Google
                                                            </GButton>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <GButton
                                                                startIcon={
                                                                    <Facebook />
                                                                }
                                                                fullWidth
                                                            >
                                                                Facebook
                                                            </GButton>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx("register")}
                                                >
                                                    Bạn chưa có tài khoản?{" "}
                                                    <a href="#">Đăng ký ngay</a>
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
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

export default Login;
