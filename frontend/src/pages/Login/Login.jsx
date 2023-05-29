/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid } from "@mui/material";
import GTextField from "../../components/GTextField/GTextField";
import GButton from "../../components/MyButton/MyButton";
import { Google } from "@mui/icons-material";
import { Formik, useFormik } from "formik";
import GTextFieldNormal from "../../components/GTextField/GTextFieldNormal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createAxios } from "../../createInstance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-hot-toast";
import { loginUser, signup } from "../../redux/api/apiAuth";
const cx = classNames.bind(styles);

function Login() {
    dayjs.extend(utc);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customerUser, setCustomerUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
    });

    // Create Axios JWT -> Check token & refresh token

    // Fn Create new Customer User
    const handleLogin = async (value) => {
        await loginUser(value, dispatch, navigate);
    };

    // Fn compare password when create
    const handlePasswordCompare = (password, confirmPassword) => {
        if (password === confirmPassword) {
            return true;
        } else {
            return false;
        }
    };

    // Validation formik
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

    // Create useFormik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            await handleLogin(data);
        },
    });
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("login-form")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={cx("form-header")}>
                                <span className={cx("form-title")}>
                                    Đăng nhập
                                </span>
                                <div
                                    title="Trang chủ"
                                    className={cx("logo-wrapper")}
                                    onClick={() => navigate("/")}
                                >
                                    <img src={images.logo} alt="" />
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <form onSubmit={formik.handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <GTextFieldNormal
                                            autoFocus
                                            formik={formik}
                                            onChange={formik.handleChange}
                                            value={formik.values.username}
                                            name="username"
                                            fullWidth
                                            label={"Tên đăng nhập"}
                                            placeholder="Nhập tên đăng nhập"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <GTextFieldNormal
                                            formik={formik}
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                            name="password"
                                            password={true}
                                            fullWidth
                                            label={"Mật khẩu"}
                                            placeholder="Nhập mật khẩu"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <span className={cx("policy-privacy")}>
                                            Quên mật khẩu?
                                        </span>
                                        <GButton
                                            type="submit"
                                            size="medium "
                                            fullWidth
                                        >
                                            Đăng nhập
                                        </GButton>
                                        <span className={cx("login-question")}>
                                            Bạn chưa có tài khoản?{" "}
                                            <span
                                                onClick={() =>
                                                    navigate("/dang-ky")
                                                }
                                            >
                                                Đăng ký ngay
                                            </span>
                                            .
                                        </span>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Login;
