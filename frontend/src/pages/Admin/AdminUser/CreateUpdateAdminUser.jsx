import React, { useEffect } from "react";
import axios from "axios";
import { Formik, FastField, useFormik } from "formik";
// import TextField from "../../../components/GTextField/TextField";
import GButton from "../../../components/MyButton/MyButton";
import { Grid, TextField } from "@mui/material";
import { useState } from "react";
// import TextField from "../../../common/Form/TextField";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import { createAdminUser } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import GentleTextField from "../../../common/Form/GentleTextField";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";

const validationSchema = Yup.object({
    role_id: Yup.string().required("Vui lòng không để trống"),
    username: Yup.string().required("Vui lòng không để trống"),
    password: Yup.string().required("Vui lòng không để trống"),
    first_name: Yup.string().required("Vui lòng không để trống"),
    last_name: Yup.string().required("Vui lòng không để trống"),
});
function CreateUpdateAdminUser({
    handleClose,
    handleOpen,
    isOpen,
    selectedUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [adminUser, setAdminUser] = useState({
        role_id: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleSubmit = (adminUser) => {
        createAdminUser(user?.accessToken, dispatch, adminUser, axiosJWT).then(
            () => {
                handleClose();
            }
        );
    };

    useEffect(() => {
        if (selectedUser) setAdminUser(selectedUser);
    }, [selectedUser]);
    console.log(adminUser);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: adminUser,
        validationSchema: validationSchema,
        onSubmit: (data) => {
            console.log(data);
            handleSubmit(data);
        },
    });

    return (
        <>
            <GModal
                handleClose={() => {
                    formik.resetForm();
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Thêm người dùng mới"
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Quyền hạn"
                                fullWidth
                                name="role_id"
                                id="role_id"
                                value={formik.values?.role_id || ""}
                                error={
                                    formik.touched?.role_id &&
                                    Boolean(formik.errors?.role_id)
                                }
                                helperText={
                                    formik.touched.role_id &&
                                    formik.errors?.role_id
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Tên đăng nhập"
                                fullWidth
                                name="username"
                                id="username"
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
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Mật khẩu"
                                fullWidth
                                name="password"
                                id="username"
                                value={formik.values?.password || ""}
                                error={
                                    formik.touched?.password &&
                                    Boolean(formik.errors?.password)
                                }
                                helperText={
                                    formik.touched?.password &&
                                    formik.errors?.password
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Họ"
                                fullWidth
                                name="last_name"
                                id="last_name"
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
                                id="first_name"
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
                            <GButton type="submit">Thêm mới</GButton>
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
