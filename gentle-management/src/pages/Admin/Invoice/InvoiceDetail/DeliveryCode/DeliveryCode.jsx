import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../../../components/MyButton/MyButton";
import { Autocomplete, Grid, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../../../common/GModal/GModal";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import { createAxios } from "../../../../../createInstance";
import GTextFieldNormal from "../../../../../components/GTextField/GTextFieldNormal";
import GDatePicker from "../../../../../components/GDatePicker/GDatePicker";
import {
    getDistrict,
    getProvince,
    getWard,
} from "../../../../../redux/api/apiProvince";
import { createCustomerUser } from "../../../../../redux/api/apiCustomerUser";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useParams } from "react-router-dom";
import { updateDelivery } from "../../../../../redux/api/apiDelivery";

export default function DeliveryCodePopup({ handleOpen, isOpen, ...props }) {
    const { invoiceId } = useParams();
    // Get logged user
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    // Initial Formik state
    const [deliveryCode, setDeliveryCode] = useState({
        delivery_code: "",
        delivery_unit: "",
    });

    // Create Axios JWT -> Check token & refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Validation formik
    const validationSchema = Yup.object().shape({
        delivery_code: Yup.string().required("Vui lòng không để trống"),
        delivery_unit: Yup.string().required("Vui lòng không để trống"),
    });

    useEffect(() => {
        if (deliveryByInvoiceId?.delivery_unit) {
            setDeliveryCode({
                delivery_code: deliveryByInvoiceId?.delivery_code,
                delivery_unit: deliveryByInvoiceId?.delivery_unit,
            });
        }
    }, [deliveryByInvoiceId?.delivery_unit, invoiceId]);

    // Create useFormik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: deliveryCode,
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            await updateDelivery(
                user?.accessToken,
                dispatch,
                deliveryByInvoiceId?.id,
                data,
                axiosJWT,
                invoiceId
            ).then(() => {
                handleCloseModal();
            });
        },
    });

    // Fn handle close modal create/update
    const handleCloseModal = () => {
        formik.resetForm();
        formik.setFieldValue("delivery_code", "");
        formik.setFieldValue("delivery_unit", "");
        props.handleClose();
    };

    return (
        <>
            <GModal
                handleClose={handleCloseModal}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={"Cập nhật mã vận đơn"}
            >
                <div style={{ width: 500 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Đơn vị vận chuyển"
                                    fullWidth
                                    name="delivery_unit"
                                    value={formik.values?.delivery_unit || ""}
                                    formik={formik}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GTextFieldNormal
                                    onChange={formik.handleChange}
                                    label="Mã vận đơn"
                                    fullWidth
                                    name="delivery_code"
                                    value={formik.values?.delivery_code || ""}
                                    formik={formik}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GButton type="submit">Lưu</GButton>
                                <GButton
                                    style={{ marginLeft: "12px" }}
                                    color="text"
                                    onClick={handleCloseModal}
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
