/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
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
import { signup } from "../../redux/api/apiAuth";
const cx = classNames.bind(styles);

function SignUp() {
    dayjs.extend(utc);
    const [checkedPolicy, setCheckedPolicy] = useState(false);
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
    const handleCreateCustomerUser = async (customerUser) => {
        await signup(customerUser, dispatch, navigate);
    };

    // Fn compare password when create
    const handlePasswordCompare = (password, confirmPassword) => {
        if (password === confirmPassword) {
            return true;
        } else {
            return false;
        }
    };

    const handleAgreePolicy = (e) => {
        setCheckedPolicy(e.target?.checked);
    };

    // Validation formik
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Vui lòng không để trống")
            .min(6, "Tên tài khoản phải có ít nhất 6 kí tự")
            .max(20, "Tên tài khoản tối đa 20 kí tự"),
        password: Yup.string()
            .required("Vui lòng không để trống")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(20, "Mật khẩu tối đa 20 kí tự"),
        confirmPassword: Yup.string().required("Vui lòng không để trống"),
        first_name: Yup.string().required("Vui lòng không để trống"),
        last_name: Yup.string().required("Vui lòng không để trống"),
        phone_number: Yup.string()
            .matches(/^\d+$/, "Số điện thoại chỉ bao gồm các ký tự số")
            .matches(phoneRegExp, "Số điện thoại không hợp lệ")
            .required("Vui lòng nhập số điện thoại"),
        email: Yup.string()
            .email("Vui lòng nhập địa chỉ email hợp lệ")
            .required("Vui lòng không để trống"),
    });

    // Create useFormik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: customerUser,
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            const { confirmPassword, ...restData } = data;

            const passwordCompare = handlePasswordCompare(
                data?.password,
                data?.confirmPassword
            );
            if (passwordCompare) {
                if (!checkedPolicy) {
                    toast.error("Vui Lòng kiểm tra điều khoản & bảo mật");
                } else {
                    await handleCreateCustomerUser(restData);
                }
            } else {
                toast.error("Mật khẩu phải giống nhau");
            }
        },
    });
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("sign-up-form")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={cx("form-header")}>
                                <span className={cx("form-title")}>
                                    Đăng ký
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
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GTextFieldNormal
                                            formik={formik}
                                            onChange={formik.handleChange}
                                            value={formik.values.last_name}
                                            name="last_name"
                                            fullWidth
                                            label={"Họ"}
                                            placeholder="Nhập họ"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GTextFieldNormal
                                            formik={formik}
                                            onChange={formik.handleChange}
                                            value={formik.values.first_name}
                                            name="first_name"
                                            fullWidth
                                            label={"Tên"}
                                            placeholder="Nhập tên"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <GTextFieldNormal
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
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GTextFieldNormal
                                            formik={formik}
                                            onChange={formik.handleChange}
                                            value={formik.values.phone_number}
                                            name="phone_number"
                                            fullWidth
                                            label={"Số điện thoại"}
                                            placeholder="Nhập số điện thoại"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
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
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
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
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GTextFieldNormal
                                            formik={formik}
                                            onChange={formik.handleChange}
                                            value={
                                                formik.values.confirmPassword
                                            }
                                            name="confirmPassword"
                                            password={true}
                                            fullWidth
                                            label={"Xác nhận mật khẩu"}
                                            placeholder="Nhập lại mật khẩu"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormGroup
                                            style={{ marginBottom: "12px" }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={
                                                            handleAgreePolicy
                                                        }
                                                    />
                                                }
                                                label={
                                                    <span
                                                        className={cx(
                                                            "policy-privacy"
                                                        )}
                                                    >
                                                        {" "}
                                                        Đồng ý với{" "}
                                                        <span
                                                            className={cx(
                                                                "link"
                                                            )}
                                                        >
                                                            Điều khoản
                                                        </span>{" "}
                                                        &{" "}
                                                        <span
                                                            className={cx(
                                                                "link"
                                                            )}
                                                        >
                                                            Chính sách bảo mật
                                                        </span>{" "}
                                                    </span>
                                                }
                                            />
                                        </FormGroup>
                                        <GButton
                                            type="submit"
                                            size="medium"
                                            fullWidth
                                        >
                                            Đăng ký
                                        </GButton>
                                        <span className={cx("login-question")}>
                                            Bạn đã có tài khoản?{" "}
                                            <span
                                                onClick={() =>
                                                    navigate("/dang-nhap")
                                                }
                                            >
                                                Đăng nhập ngay
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

export default SignUp;
