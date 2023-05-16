import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import {
    createServiceCategory,
    updateServiceCategory,
} from "../../../redux/api/apiServiceCategory";

export default function CreateUpdateServiceCategoryModal({
    handleClose,
    handleOpen,
    isOpen,
    selectedServiceCategory,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [serviceCategory, setServiceCategory] = useState({
        name: "",
        description: "",
        image: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCreateServiceCategory = (serviceCategory) => {
        createServiceCategory(
            user?.accessToken,
            dispatch,
            serviceCategory,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
        });
    };

    const handleUpdateServiceCategory = (serviceCategory) => {
        updateServiceCategory(
            user?.accessToken,
            dispatch,
            selectedServiceCategory?.id,
            serviceCategory,
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
        initialValues: serviceCategory,
        validationSchema: validationSchema,
        onSubmit: (data) => {
            if (data?.id) {
                handleUpdateServiceCategory(data);
            } else {
                handleCreateServiceCategory({
                    ...data,
                    admin_user_id: user?.id,
                });
            }
        },
    });

    useEffect(() => {
        if (selectedServiceCategory)
            setServiceCategory(selectedServiceCategory);
    }, [selectedServiceCategory]);

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
                    selectedServiceCategory?.id
                        ? "Cập nhật danh mục dịch vụ"
                        : "Thêm danh mục dịch vụ"
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
                                formik={formik}
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
