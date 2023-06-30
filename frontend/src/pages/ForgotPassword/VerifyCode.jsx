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
    resetPassword,
} from "../../redux/api/apiResetPassword";
import Layout from "./Layout";
const cx = classNames.bind(styles);

function VerifyCode() {
    const location = useLocation();
    const verifyCodeIdFirst = location.state?.codeId;
    const resetEmail = location.state?.email;
    const navigate = useNavigate();
    const [resendTime, setResendTime] = useState(60);
    const [verifyCodeIdResend, setVerifyCodeIdResend] = useState();

    useEffect(() => {
        if (!resetEmail) {
            navigate("/dang-nhap");
        }
    }, [resetEmail]);

    useEffect(() => {
        let countdown = setInterval(() => {
            setResendTime((prevTime) => prevTime - 1);
        }, 1000);

        if (resendTime === 0) {
            clearInterval(countdown);
        }

        return () => {
            clearInterval(countdown);
        };
    }, [resendTime]);

    const [isResetPassword, setIsResetPassword] = useState(false);
    const handleResetPassword = async (value) => {
        setIsResetPassword(true);
        let verifyCodeId;
        if (verifyCodeIdResend) {
            verifyCodeId = verifyCodeIdResend;
        } else {
            verifyCodeId = verifyCodeIdFirst;
        }
        const resCheck = await checkVerifyCode(value?.code, verifyCodeId);
        setIsResetPassword(false);
        if (resCheck?.status === 200) {
            navigate("/doi-mat-khau", {
                state: {
                    customerUserId: resCheck?.customerUserId,
                },
            });
        }
    };
    const validationSchema = Yup.object().shape({
        code: Yup.string().required("Vui lòng nhập mã"),
    });
    // Create useFormik
    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            code: "",
        },
        onSubmit: async (data) => {
            await handleResetPassword(data);
        },
    });

    const handleResenVerifyCode = async () => {
        setResendTime(60);
        await resetPassword(resetEmail).then((res) => {
            setVerifyCodeIdResend(res?.codeId);
            toast.success("Gửi lại mã thành công");
        });
    };

    return (
        <>
            <Layout formTitle={"Xác nhận email"}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <span className={cx("enter-code-label")}>
                                Nhập mã gửi về email: <h3>{resetEmail}</h3>
                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                formik={formik}
                                onChange={formik.handleChange}
                                value={formik.values.code}
                                name="code"
                                fullWidth
                                label={"Mã xác nhận"}
                                placeholder="Nhập code"
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-9]*",
                                    maxLength: 6,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("resend-code")}>
                                <GButton
                                    onClick={handleResenVerifyCode}
                                    disabled={resendTime > 0}
                                    color={"text"}
                                >
                                    Gửi lại mã
                                </GButton>
                                {resendTime > 0 && (
                                    <span className={cx("resend-time")}>
                                        {resendTime}
                                    </span>
                                )}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <GButton
                                disabled={
                                    formik.isSubmitting && isResetPassword
                                }
                                type="submit"
                                size="medium "
                                fullWidth
                            >
                                Xác nhận
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

export default VerifyCode;
