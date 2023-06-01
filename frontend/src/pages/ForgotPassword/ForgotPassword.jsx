/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createAxios } from "../../createInstance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-hot-toast";
import { loginUser, signup } from "../../redux/api/apiAuth";
import { resetPassword } from "../../redux/api/apiResetPassword";
import Layout from "./Layout";
const cx = classNames.bind(styles);

function ForgotPassword() {
    const navigate = useNavigate();
    // Fn Create new Customer User
    const handleResetPassword = async (value) => {
        await resetPassword(value.email).then((res) => {
            if (res) {
                toast.success("Email tồn tại");
                navigate("/quen-mat-khau/xac-nhan", {
                    state: {
                        email: res?.email,
                        codeId: res?.codeId,
                    },
                });
            } else {
                toast.success("Email không tồn tại");
            }
        });
    };
    // Validation formik
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Vui lòng nhập địa chỉ email hợp lệ")
            .required("Vui lòng không để trống"),
    });

    // Create useFormik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            await handleResetPassword(data);
        },
    });
    return (
        <>
            <Layout formTitle={"Quên mật khẩu"}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                formik={formik}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                name="email"
                                fullWidth
                                label={"Email"}
                                placeholder="Nhập email"
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

export default ForgotPassword;
