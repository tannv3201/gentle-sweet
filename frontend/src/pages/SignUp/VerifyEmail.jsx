/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import styles from "./SignUp.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GButton from "../../components/MyButton/MyButton";
import { Formik, useFormik } from "formik";
import GTextFieldNormal from "../../components/GTextField/GTextFieldNormal";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import {
    checkVerifyCode,
    resetPassword,
} from "../../redux/api/apiResetPassword";
import Layout from "../ForgotPassword/Layout";
import {
    checkRegisterVerifyCode,
    sendVerifyCode,
} from "../../redux/api/apiRegisterVerify";
import { signup } from "../../redux/api/apiAuth";
import { useDispatch } from "react-redux";
const cx = classNames.bind(styles);

function VerifyEmail() {
    const location = useLocation();
    const verifyCodeIdFirst = location.state?.verifyCodeId;
    const customerUser = location.state?.customerUser;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resendTime, setResendTime] = useState(60);
    const [verifyCodeIdResend, setVerifyCodeIdResend] = useState();
    useEffect(() => {
        if (!customerUser) {
            navigate("/dang-nhap");
        }
    }, [customerUser]);

    useEffect(() => {
        document.title = "Xác thực Email";
    }, []);

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

    const [isVerifyAccount, setIsVerifyAccount] = useState(false);
    const handleVerifyAccount = async (value) => {
        setIsVerifyAccount(true);
        let verifyCodeId;
        if (verifyCodeIdResend) {
            verifyCodeId = verifyCodeIdResend;
        } else {
            verifyCodeId = verifyCodeIdFirst;
        }
        const resCheck = await checkRegisterVerifyCode(
            value?.code,
            verifyCodeId
        );
        if (resCheck?.status === 200) {
            setIsVerifyAccount(false);
            await signup(customerUser, dispatch, navigate);
            toast.success(resCheck?.msg);
        } else {
            setIsVerifyAccount(false);
            toast.error(resCheck?.msg);
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
            await handleVerifyAccount(data);
        },
    });

    const handleResendVerifyCode = async () => {
        setResendTime(60);
        await sendVerifyCode({ email: customerUser?.email }).then((res) => {
            setVerifyCodeIdResend(res?.codeId);
        });
    };

    return (
        <>
            <Layout formTitle={"Xác thực email"}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <span className={cx("enter-code-label")}>
                                Nhập mã gửi về email:{" "}
                                <h3>{customerUser?.email}</h3>
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
                                    onClick={handleResendVerifyCode}
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
                                    formik.isSubmitting && isVerifyAccount
                                }
                                type="submit"
                                size="medium "
                                fullWidth
                            >
                                Xác thực
                            </GButton>
                            <span className={cx("navigate-question")}>
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

export default VerifyEmail;
