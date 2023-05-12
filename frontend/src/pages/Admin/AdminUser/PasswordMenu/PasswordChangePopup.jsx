import React from "react";
import { useFormik } from "formik";

import { Grid, IconButton, InputAdornment } from "@mui/material";
import * as Yup from "yup";
import GModal from "../../../../common/GModal/GModal";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import GButton from "../../../../components/MyButton/MyButton";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/authSlice";
import { passwordChange } from "../../../../redux/apiRequest";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordChangePopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handlePasswordChange = (data) => {
        if (data?.newPassword !== data?.confirmNewPassword) {
            toast.error("Mật khẩu mới phải giống nhau");
            return;
        } else {
            passwordChange(
                user?.accessToken,
                dispatch,
                selectedUser?.id,
                data,
                axiosJWT
            ).then((res) => {
                if (res?.status === 200) {
                    handleClose();
                }
            });
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        // validationSchema: validationSchema,
        onSubmit: (data) => {
            handlePasswordChange(data);
        },
    });

    return (
        <>
            <GModal
                handleClose={() => {
                    setShowPassword(false);
                    handleClose();
                }}
                handleOpen={() => {
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
                                    error={
                                        formik.touched?.currentPassword &&
                                        Boolean(formik.errors?.currentPassword)
                                    }
                                    helperText={
                                        formik.touched?.currentPassword &&
                                        formik.errors?.currentPassword
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Mật khẩu mới"
                                    fullWidth
                                    name="newPassword"
                                    value={formik.values?.newPassword || ""}
                                    error={
                                        formik.touched?.newPassword &&
                                        Boolean(formik.errors?.newPassword)
                                    }
                                    helperText={
                                        formik.touched?.newPassword &&
                                        formik.errors?.newPassword
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Xác nhận mật khẩu"
                                    fullWidth
                                    name="confirmNewPassword"
                                    value={
                                        formik.values?.confirmNewPassword || ""
                                    }
                                    error={
                                        formik.touched?.confirmNewPassword &&
                                        Boolean(
                                            formik.errors?.confirmNewPassword
                                        )
                                    }
                                    helperText={
                                        formik.touched?.confirmNewPassword &&
                                        formik.errors?.confirmNewPassword
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GButton type={"submit"}>Cập nhật</GButton>
                                <GButton
                                    color={"text"}
                                    style={{ marginLeft: "12px" }}
                                    onClick={handleClose}
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
