import React, { useEffect } from "react";
import axios from "axios";
import { Formik, FastField } from "formik";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import GButton from "../../../components/MyButton/MyButton";
import { Grid } from "@mui/material";
import { useState } from "react";
import GentleTextField from "../../../common/Form/GentleTextField";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import { createAdminUser } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";

const validationSchema = Yup.object({
    title: Yup.string().required("Vui lòng không để trống"),
    category: Yup.string().required("Vui lòng không để trống"),
    price: Yup.number()
        .required("Vui lòng không để trống")
        .positive("Vui lòng nhập số dương")
        .typeError("Vui lòng nhập số")
        .integer("Vui lòng nhập số nguyên"),
    on_sale: Yup.number()
        .required("Vui lòng không để trống")
        .positive("Vui lòng nhập số dương")
        .typeError("Vui lòng nhập số")
        .integer("Vui lòng nhập số nguyên"),
    description: Yup.string().required("Vui lòng không để trống"),
    image: Yup.string().required("Vui lòng không để trống"),
});
function CreateUpdateAdminUser({ handleClose, handleOpen, isOpen }) {
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

    return (
        <>
            <GModal
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Thêm người dùng mới"
            >
                <Formik
                    initialValues={adminUser}
                    onSubmit={(values, actions) => {
                        handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                    // validationSchema={validationSchema}
                >
                    {(props) => (
                        <form onSubmit={props.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <GentleTextField
                                        onChange={props.handleChange}
                                        label="Quyền hạn"
                                        fullWidth
                                        name="role_id"
                                        value={props.values.role_id}
                                        error={
                                            props.touched.role_id &&
                                            Boolean(props.errors.role_id)
                                        }
                                        helperText={
                                            props.touched.role_id &&
                                            props.errors.role_id
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <GentleTextField
                                        onChange={props.handleChange}
                                        label="Tên đăng nhập"
                                        fullWidth
                                        name="username"
                                        value={props.values.username}
                                        error={
                                            props.touched.username &&
                                            Boolean(props.errors.username)
                                        }
                                        helperText={
                                            props.touched.username &&
                                            props.errors.username
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <GentleTextField
                                        onChange={props.handleChange}
                                        label="Mật khẩu"
                                        fullWidth
                                        name="password"
                                        value={props.values.password}
                                        error={
                                            props.touched.password &&
                                            Boolean(props.errors.password)
                                        }
                                        helperText={
                                            props.touched.password &&
                                            props.errors.password
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <GentleTextField
                                        onChange={props.handleChange}
                                        label="Họ"
                                        fullWidth
                                        name="last_name"
                                        value={props.values.last_name}
                                        error={
                                            props.touched.last_name &&
                                            Boolean(props.errors.last_name)
                                        }
                                        helperText={
                                            props.touched.last_name &&
                                            props.errors.last_name
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <GentleTextField
                                        onChange={props.handleChange}
                                        label="Tên"
                                        fullWidth
                                        name="first_name"
                                        value={props.values.first_name}
                                        error={
                                            props.touched.first_name &&
                                            Boolean(props.errors.first_name)
                                        }
                                        helperText={
                                            props.touched.first_name &&
                                            props.errors.first_name
                                        }
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <GButton type="submit">Thêm mới</GButton>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </GModal>
        </>
    );
}

export default CreateUpdateAdminUser;
