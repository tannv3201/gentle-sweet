import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../../components/MyButton/MyButton";
import { Autocomplete, Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../../common/GModal/GModal";
import {
    createDiscount,
    updateDiscount,
} from "../../../../redux/api/apiDiscount";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { createAxios } from "../../../../createInstance";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import { useNavigate } from "react-router-dom";
// import styles from "./Invoice.module.scss";
import classNames from "classnames/bind";
import { createInvoice } from "../../../../redux/api/apiInvoice";
import { getAllCustomerUser } from "../../../../redux/api/apiCustomerUser";
import { updateInvoiceDetail } from "../../../../redux/api/apiInvoiceDetail";
import { toast } from "react-hot-toast";

// const cx = classNames.bind(styles);

export default function UpdateServiceBookingDetail({
    handleClose,
    handleOpen,
    isOpen,
    selectedProduct,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const customerUserList = useSelector(
        (state) => state.customerUser.customerUser?.customerUserList
    );

    useEffect(() => {
        if (customerUserList?.length === 0) {
            getAllCustomerUser(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const [product, setProductCategory] = useState({
        product_name: "",
        product_quantity: "",
        unit_price: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Validate
    const validationSchema = Yup.object().shape({});

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: product,
        validationSchema: validationSchema,
        onSubmit: (data) => {
            const { product_quantity, id, unit_price, ...rest } = data;
            if (product?.product_quantity !== product_quantity) {
                updateInvoiceDetail(
                    user?.accessToken,
                    dispatch,
                    id,
                    product?.invoice_id,
                    {
                        invoice_id: product?.invoice_id,
                        product_quantity: product_quantity,
                    },
                    axiosJWT
                ).then(() => {
                    handleClose();
                });
            }
        },
    });

    useEffect(() => {
        if (selectedProduct) setProductCategory(selectedProduct);
    }, [selectedProduct]);

    const handleChangeQuantity = (value) => {
        if (value === "" || value > 0) {
            formik.setFieldValue("product_quantity", value);
        }
    };

    return (
        <>
            <GModal
                handleClose={() => {
                    formik.resetForm();
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={"Cập nhật số lượng"}
            >
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div>
                                    <GTextFieldNormal
                                        disabled={true}
                                        label={"Sản phẩm"}
                                        fullWidth
                                        size="medium"
                                        name={"product_name"}
                                        value={
                                            formik.values?.product_name || ""
                                        }
                                        onChange={formik.handleChange}
                                        formik={formik}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <GTextFieldNormal
                                        label={"Số lượng"}
                                        fullWidth
                                        size="medium"
                                        value={
                                            formik.values?.product_quantity ||
                                            ""
                                        }
                                        name={"product_quantity"}
                                        formik={formik}
                                        type="number"
                                        onChange={(e) =>
                                            handleChangeQuantity(e.target.value)
                                        }
                                    />
                                </div>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                display={"flex"}
                                justifyContent={"flex-end"}
                            >
                                <div>
                                    <GButton
                                        color={"success"}
                                        type="submit"
                                        // disabled={formik.isSubmitting}
                                    >
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
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </GModal>
        </>
    );
}
