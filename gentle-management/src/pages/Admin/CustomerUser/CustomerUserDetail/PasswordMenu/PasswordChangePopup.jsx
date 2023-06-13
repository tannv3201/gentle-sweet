import React from "react";
import { useFormik } from "formik";

import { Grid } from "@mui/material";
import * as Yup from "yup";
import GModal from "../../../../../common/GModal/GModal";
import GButton from "../../../../../components/MyButton/MyButton";
import GTextFieldNormal from "../../../../../components/GTextField/GTextFieldNormal";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import { useState } from "react";
import { customerUserPasswordChange } from "../../../../../redux/api/apiCustomerUser";

function PasswordChangePopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handlePasswordChange = (data) => {
        if (data?.newPassword !== data?.confirmNewPassword) {
            toast.error("Mật khẩu mới phải giống nhau");
            return;
        } else {
            customerUserPasswordChange(
                user?.accessToken,
                dispatch,
                selectedUser?.id,
                data,
                axiosJWT
            ).then((res) => {
                if (res?.status === 200) {
                    formik.handleReset();
                    handleClose();
                }
            });
        }
    };

    // Validate
    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .required("Vui lòng không để trống")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(20, "Mật khẩu tối đa 20 kí tự"),
        newPassword: Yup.string()
            .required("Vui lòng không để trống")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(20, "Mật khẩu tối đa 20 kí tự"),
        confirmNewPassword: Yup.string()
            .required("Vui lòng không để trống")
            .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
            .max(20, "Mật khẩu tối đa 20 kí tự"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: validationSchema,
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        onSubmit: (data) => {
            handlePasswordChange(data);
        },
    });

    // handle showing password
    const [isShowPassword, setIsShowPassword] = useState(true);

    return (
        <>
            <GModal
                handleClose={() => {
                    formik.handleReset();
                    setIsShowPassword(false);
                    handleClose();
                }}
                handleOpen={() => {
                    setIsShowPassword(false);
                    handleOpen();
                }}
                isOpen={isOpen}
                title="Đổi mật khẩu"
            >
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    password
                                    onChange={formik.handleChange}
                                    label="Mật khẩu hiện tại"
                                    fullWidth
                                    name="currentPassword"
                                    value={formik.values?.currentPassword || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    password
                                    onChange={formik.handleChange}
                                    label="Mật khẩu mới"
                                    fullWidth
                                    name="newPassword"
                                    value={formik.values?.newPassword || ""}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    password
                                    label="Xác nhận mật khẩu"
                                    fullWidth
                                    name="confirmNewPassword"
                                    onChange={formik.handleChange}
                                    value={
                                        formik.values?.confirmNewPassword || ""
                                    }
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GButton type={"submit"}>Cập nhật</GButton>
                                <GButton
                                    color={"text"}
                                    style={{ marginLeft: "12px" }}
                                    onClick={() => {
                                        formik.handleReset();
                                        setIsShowPassword(false);
                                        handleClose();
                                    }}
                                >
                                    Hủy
                                </GButton>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </GModal>
        </>
    );
}

export default PasswordChangePopup;
