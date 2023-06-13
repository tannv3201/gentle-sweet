/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styles from "./Layout.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid } from "@mui/material";
import GTextField from "../../components/GTextField/GTextField";
import GButton from "../../components/MyButton/MyButton";
import { Google } from "@mui/icons-material";
import { Formik, useFormik } from "formik";
import GTextFieldNormal from "../../components/GTextField/GTextFieldNormal";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createAxios } from "../../createInstance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-hot-toast";
import { loginUser, signup } from "../../redux/api/apiAuth";
import {
    checkVerifyCode,
    passwordChangeWhenReset,
    resetPassword,
} from "../../redux/api/apiResetPassword";
import Layout from "./Layout";
const cx = classNames.bind(styles);

function PasswordChange() {
    const location = useLocation();
    const customerUserId = location.state?.customerUserId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!customerUserId) {
            navigate("/dang-nhap");
        }
    }, [customerUserId]);
    const handlePasswordChange = async (data) => {
        if (data?.password !== data?.confirmPassword) {
            toast.error("Hai mật khẩu phải giống nhau");
            return;
        } else {
            passwordChangeWhenReset(customerUserId, {
                password: data?.password,
            }).then((res) => {
                if (res?.status === 200) {
                    navigate("/dang-nhap");
                }
            });
        }
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required("Vui lòng không để trống")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(20, "Mật khẩu tối đa 20 kí tự"),
        confirmPassword: Yup.string()
            .required("Vui lòng không để trống")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(20, "Mật khẩu tối đa 20 kí tự"),
    });

    // Create useFormik
    const formik = useFormik({
        validationSchema: validationSchema,
        enableReinitialize: true,
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        onSubmit: async (data) => {
            await handlePasswordChange(data);
        },
    });
    return (
        <>
            <Layout formTitle={"Cập nhật mật khẩu"}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                password
                                formik={formik}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                name="password"
                                fullWidth
                                label={"Mật khẩu"}
                                placeholder="Nhập mật khẩu"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                password
                                formik={formik}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                name="confirmPassword"
                                fullWidth
                                label={"Nhập lại mật khẩu"}
                                placeholder="Nhập lại mật khẩu"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GButton type="submit" size="medium " fullWidth>
                                Đặt lại mật khẩu
                            </GButton>
                            <span className={cx("login-question")}>
                                Trở lại{" "}
                                <span onClick={() => navigate("/dang-ky")}>
                                    Đăng ký
                                </span>
                                {" - "}
                                <span onClick={() => navigate("/dang-nhap")}>
                                    Đăng nhập
                                </span>
                                .
                            </span>
                        </Grid>
                    </Grid>
                </form>
            </Layout>
        </>
    );
}

export default PasswordChange;
