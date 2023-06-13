import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import {
    createProductCategory,
    updateProductCategory,
} from "../../../redux/api/apiProductCategory";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";

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

    // Validate
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng không để trống"),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: productCategory,
        validationSchema: validationSchema,
        onSubmit: (data) => {
            if (data?.id) {
                handleUpdateProductCategory(data);
            } else {
                handleCreateProductCategory({
                    ...data,
                    admin_user_id: user?.id,
                });
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
                                formik={formik}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Mô tả"
                                fullWidth
                                name="description"
                                value={formik.values?.description || ""}
                                multiline
                                rows={3}
                            />
                        </Grid>
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
