import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Grid, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import { createDiscount, updateDiscount } from "../../../redux/api/apiDiscount";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";

export default function CreateUpdateDiscountModal({
    handleClose,
    handleOpen,
    isOpen,
    selectedDiscount,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [productCategory, setProductCategory] = useState({
        name: "",
        description: "",
        image: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCreateProductCategory = (discountData) => {
        createDiscount(
            user?.accessToken,
            dispatch,
            discountData,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
        });
    };

    const handleUpdateProductCategory = (discountData) => {
        updateDiscount(
            user?.accessToken,
            dispatch,
            selectedDiscount?.id,
            discountData,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
        });
    };

    // Validate
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Vui lòng không để trống"),
        discount_percent: Yup.number()
            .required("Vui lòng không để trống")
            .positive("Phần trăm giảm phải là một số dương")
            .max(100, "Phần trăm giảm không được vượt quá 100"),
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
        if (selectedDiscount) setProductCategory(selectedDiscount);
    }, [selectedDiscount]);

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
                    selectedDiscount?.id
                        ? "Cập nhật chương trình giảm giá"
                        : "Thêm chương trình giảm giá"
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Tên chương trình"
                                fullWidth
                                name="name"
                                value={formik.values?.name || ""}
                                formik={formik}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (
                                        value === "" ||
                                        parseFloat(value) >= 0
                                    ) {
                                        formik.handleChange(e);
                                    }
                                }}
                                label="Phần trăm giảm"
                                fullWidth
                                name="discount_percent"
                                value={formik.values?.discount_percent || ""}
                                formik={formik}
                                type={"number"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            %
                                        </InputAdornment>
                                    ),
                                }}
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
