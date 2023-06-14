import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Autocomplete, Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import { createDiscount, updateDiscount } from "../../../redux/api/apiDiscount";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { getAllCustomerUser } from "../../../redux/api/apiCustomerUser";
import { useNavigate } from "react-router-dom";
import styles from "./Booking.module.scss";
import classNames from "classnames/bind";
import { createInvoice } from "../../../redux/api/apiInvoice";
import { createBooking } from "../../../redux/api/apiBooking";

const cx = classNames.bind(styles);

export default function CreateInvoiceModal({
    handleClose,
    handleOpen,
    isOpen,
    selectedDiscount,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const customerUserList = useSelector(
        (state) => state.customerUser.customerUser?.customerUserList
    );

    const handleChangeCustomerUser = (value) => {
        if (value) {
            formik.setFieldValue("id", value?.id);
            formik.setFieldValue("first_name", value?.first_name);
            formik.setFieldValue("last_name", value?.last_name);
        } else {
            formik.setFieldValue("id", null);
            formik.setFieldValue("first_name", null);
            formik.setFieldValue("last_name", null);
        }
    };

    useEffect(() => {
        if (customerUserList?.length === 0) {
            getAllCustomerUser(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const [invoice, setInvoice] = useState({
        first_name: "",
        last_name: "",
        id: "",
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
    const validationSchema = Yup.object().shape({});

    const handleCreateInvoice = (bookingdata) => {
        createBooking(user?.accessToken, dispatch, bookingdata, axiosJWT).then(
            (bookingId) => {
                navigate(`/admin/booking/${bookingId}`);
                formik.handleReset();
                handleClose();
            }
        );
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: invoice,
        validationSchema: validationSchema,
        onSubmit: (data) => {
            const { id } = data;
            const bookingData = {
                admin_user_id: user?.id,
                customer_user_id: id,
            };
            handleCreateInvoice(bookingData);
        },
    });

    useEffect(() => {
        if (selectedDiscount) setInvoice(selectedDiscount);
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
                title={"Tạo lịch hẹn"}
            >
                <div className={cx("create-invoice-form")}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className={cx("select-customer-user")}>
                                    <Autocomplete
                                        options={customerUserList}
                                        onBlur={formik.handleBlur}
                                        getOptionLabel={(option) =>
                                            `${option?.last_name} ${option?.first_name}` ||
                                            ""
                                        }
                                        onChange={(e, value) => {
                                            handleChangeCustomerUser(value);
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            value === null ||
                                            value === "" ||
                                            option?.id === value?.id
                                        }
                                        value={
                                            (formik.values.id && {
                                                id: formik.values?.id,
                                                first_name:
                                                    formik.values?.first_name,
                                                last_name:
                                                    formik.values?.last_name,
                                            }) ||
                                            null
                                        }
                                        renderInput={(params) => (
                                            <GTextFieldNormal
                                                {...params}
                                                name="id"
                                                fullWidth
                                                label="Chọn khách hàng"
                                                formik={formik}
                                                size="medium"
                                            />
                                        )}
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
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </GModal>
        </>
    );
}
