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
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createAxios } from "../../createInstance";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { toast } from "react-hot-toast";
import { loginUser, signup } from "../../redux/api/apiAuth";
import {
    checkVerifyCode,
    resetPassword,
} from "../../redux/api/apiResetPassword";
const cx = classNames.bind(styles);

function Layout({ formTitle, children }) {
    const navigate = useNavigate();

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("login-form")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={cx("form-header")}>
                                <span className={cx("form-title")}>
                                    {formTitle}
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
                            {children}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Layout;
