import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Autocomplete, Grid, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import { createAdminUser, updateAdminUser } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const roleList = [
    {
        role_name: "ADMIN",
        role_id: "eaff3c47-28b5-4315-8bc7-384b72fe039a",
    },
    {
        role_name: "STAFF",
        role_id: "16d0f7f9-e6cc-42d3-b748-5930044b3893",
    },
];

function CreateUpdateAdminUser({
    handleClose,
    handleOpen,
    isOpen,
    selectedUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [adminUser, setAdminUser] = useState({
        id: "",
        role_id: "",
        role_name: "",
        username: "",
        password: "",
        confirmPassword: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCreateAdminUser = (adminUser) => {
        createAdminUser(user?.accessToken, dispatch, adminUser, axiosJWT).then(
            () => {
                handleClose();
            }
        );
    };

    const handleUpdateAdminUser = (adminUser) => {
        updateAdminUser(
            user?.accessToken,
            dispatch,
            selectedUser?.id,
            adminUser,
            axiosJWT
        ).then(() => {
            handleClose();
        });
    };

    useEffect(() => {
        if (selectedUser) setAdminUser(selectedUser);
    }, [selectedUser]);

    // Validate
    const validationSchema = Yup.object().shape({
        role_id: Yup.string().required("Vui lòng không để trống"),
        username: Yup.string()
            .required("Vui lòng không để trống")
            .min(6, "Tên tài khoản phải có ít nhất 6 kí tự")
            .max(20, "Tên tài khoản tối đa 20 kí tự"),
        password: selectedUser?.editState
            ? Yup.string()
            : Yup.string()
                  .required("Vui lòng không để trống")
                  .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
                  .max(20, "Mật khẩu tối đa 20 kí tự"),
        first_name: Yup.string().required("Vui lòng không để trống"),
        last_name: Yup.string().required("Vui lòng không để trống"),
        email: Yup.string()
            .email("Vui lòng nhập địa chỉ email hợp lệ")
            .required("Vui lòng không để trống"),
        confirmPassword: selectedUser?.editState
            ? Yup.string()
            : Yup.string().required("Vui lòng không để trống"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: adminUser,
        validationSchema: validationSchema,
        onSubmit: (data) => {
            const { role_name, editState, confirmPassword, ...updateData } =
                data;
            if (data?.id) {
                handleUpdateAdminUser(updateData);
            } else {
                handleCreateAdminUser(data);
            }
        },
    });
    return (
        <>
            <GModal
                handleClose={() => {
                    formik.resetForm();
                    setShowPassword(false);
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={
                    selectedUser?.editState
                        ? "Cập nhật thông tin"
                        : "Thêm người dùng mới"
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/* <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Quyền hạn"
                                fullWidth
                                name="role_id"
                                value={formik.values?.role_id || ""}
                                error={
                                    formik.touched?.role_id &&
                                    Boolean(formik.errors?.role_id)
                                }
                                helperText={
                                    formik.touched.role_id &&
                                    formik.errors?.role_id
                                }
                            /> */}
                            <Autocomplete
                                options={roleList}
                                getOptionLabel={(option) =>
                                    `${option?.role_name}` || ""
                                }
                                onChange={(e, value) => {
                                    formik.setFieldValue(
                                        "role_id",
                                        value?.role_id
                                    );
                                    formik.setFieldValue(
                                        "role_name",
                                        value?.role_name || ""
                                    );
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === null ||
                                    value === "" ||
                                    option?.role_id === value?.role_id
                                }
                                value={
                                    (formik.values.role_id && {
                                        role_id: formik.values?.role_id,
                                        role_name: formik.values?.role_name,
                                    }) ||
                                    null
                                }
                                renderInput={(params) => (
                                    <GTextFieldNormal
                                        {...params}
                                        name="role_id"
                                        fullWidth
                                        label="Quyền hạn"
                                        error={
                                            formik.touched?.role_id &&
                                            Boolean(formik.errors?.role_id)
                                        }
                                        helperText={
                                            formik.touched.role_id &&
                                            formik.errors?.role_id
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Tên đăng nhập"
                                fullWidth
                                name="username"
                                value={formik.values?.username || ""}
                                error={
                                    formik.touched?.username &&
                                    Boolean(formik.errors?.username)
                                }
                                helperText={
                                    formik.touched?.username &&
                                    formik.errors?.username
                                }
                            />
                        </Grid>
                        {!selectedUser?.editState && (
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Mật khẩu"
                                    fullWidth
                                    name="password"
                                    value={formik.values?.password || ""}
                                    error={
                                        formik.touched?.password &&
                                        Boolean(formik.errors?.password)
                                    }
                                    helperText={
                                        formik.touched?.password &&
                                        formik.errors?.password
                                    }
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        )}
                        {!selectedUser?.editState && (
                            <Grid item xs={6}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Nhập lại mật khẩu"
                                    fullWidth
                                    name="confirmPassword"
                                    value={formik.values?.confirmPassword || ""}
                                    error={
                                        formik.touched?.confirmPassword &&
                                        Boolean(formik.errors?.confirmPassword)
                                    }
                                    helperText={
                                        formik.touched?.confirmPassword &&
                                        formik.errors?.confirmPassword
                                    }
                                    type={showPassword ? "text" : "password"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleClickShowPassword
                                                    }
                                                    onMouseDown={
                                                        handleMouseDownPassword
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        )}
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Họ"
                                fullWidth
                                name="last_name"
                                value={formik.values?.last_name || ""}
                                error={
                                    formik.touched?.last_name &&
                                    Boolean(formik.errors?.last_name)
                                }
                                helperText={
                                    formik.touched?.last_name &&
                                    formik.errors?.last_name
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Tên"
                                fullWidth
                                name="first_name"
                                value={formik.values?.first_name || ""}
                                error={
                                    formik.touched?.first_name &&
                                    Boolean(formik.errors?.first_name)
                                }
                                helperText={
                                    formik.touched?.first_name &&
                                    formik.errors?.first_name
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Email"
                                fullWidth
                                name="email"
                                value={formik.values?.email || ""}
                                error={
                                    formik.touched?.email &&
                                    Boolean(formik.errors?.email)
                                }
                                helperText={
                                    formik.touched?.email &&
                                    formik.errors?.email
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            @
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GButton type="submit">Lưu</GButton>
                            <GButton
                                style={{ marginLeft: "12px" }}
                                color="text"
                                onClick={() => {
                                    formik.resetForm();
                                    handleClose();
                                }}
                            >
                                Hủy
                            </GButton>
                        </Grid>
                    </Grid>
                </form>
            </GModal>
        </>
    );
}

export default CreateUpdateAdminUser;
