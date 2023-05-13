import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Autocomplete, Grid, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import {
    createAdminUser,
    createProductCategory,
    updateAdminUser,
    updateProductCategory,
} from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";

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

export default function CreateUpdateProductCategoryModal({
    handleClose,
    handleOpen,
    isOpen,
    selectedProductCategory,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [productCategory, setProductCategory] = useState({
        name: "",
        description: "",
        image: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCreateProductCategory = (productCategory) => {
        createProductCategory(
            user?.accessToken,
            dispatch,
            productCategory,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
        });
    };

    const handleUpdateProductCategory = (productCategory) => {
        updateProductCategory(
            user?.accessToken,
            dispatch,
            selectedProductCategory?.id,
            productCategory,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
        });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: productCategory,
        // validationSchema: validationSchema,
        onSubmit: (data) => {
            if (data?.id) {
                handleUpdateProductCategory(data);
            } else {
                handleCreateProductCategory({
                    ...data,
                    admin_user_id: user?.id,
                });
                // console.log("create", {
                //     ...data,
                //     admin_user_id: user?.id,
                // });
            }
        },
    });

    useEffect(() => {
        if (selectedProductCategory)
            setProductCategory(selectedProductCategory);
    }, [selectedProductCategory]);

    return (
        <>
            <GModal
                handleClose={() => {
                    formik.resetForm();
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={
                    selectedProductCategory?.id
                        ? "Cập nhật danh mục sản phẩm"
                        : "Thêm danh mục sản phẩm"
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Tên danh mục"
                                fullWidth
                                name="name"
                                value={formik.values?.name || ""}
                                error={
                                    formik.touched?.name &&
                                    Boolean(formik.errors?.name)
                                }
                                helperText={
                                    formik.touched?.name && formik.errors?.name
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Mô tả"
                                fullWidth
                                name="description"
                                value={formik.values?.description || ""}
                                error={
                                    formik.touched?.description &&
                                    Boolean(formik.errors?.description)
                                }
                                helperText={
                                    formik.touched?.description &&
                                    formik.errors?.description
                                }
                                multiline
                                rows={3}
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <UploadImage setImage={setImage} />
                        </Grid> */}
                        <Grid item xs={12}>
                            <GButton color={"success"} type="submit">
                                Lưu
                            </GButton>
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
