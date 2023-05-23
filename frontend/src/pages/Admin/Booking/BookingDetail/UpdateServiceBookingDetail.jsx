import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../../components/MyButton/MyButton";
import { Autocomplete, Grid, TextField } from "@mui/material";
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
import GDatePicker, {
    GFormatDate,
} from "../../../../components/GDatePicker/GDatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { updateBookingDetail } from "../../../../redux/api/apiBookingDetail";

export default function UpdateServiceBookingDetail({
    handleClose,
    handleOpen,
    isOpen,
    selectedService,
}) {
    dayjs.extend(utc);
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

    const [service, setService] = useState({
        service_name: "",
        service_id: "",
        date: "",
        start_time: "",
        end_time: "",
        unit_price: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Validate
    const validationSchema = Yup.object().shape({});

    const handleUpdateService = async (data) => {
        await updateBookingDetail(
            user?.accessToken,
            dispatch,
            data?.id,
            data?.booking_id,
            data,
            axiosJWT
        ).then(() => {
            handleClose();
        });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: service,
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            const {
                bookingTime_id,
                bookingTime_name,
                service_name,
                price_total,
                created_at,
                updated_at,
                status,
                unit_price,
                description,
                tableData,
                ...rest
            } = data;
            const dataUpdate = {
                ...rest,
                date: dayjs
                    .utc(rest?.date)
                    .utcOffset("+07:00")
                    .format("YYYY/MM/DD"),
            };

            await handleUpdateService(dataUpdate);
        },
    });

    useEffect(() => {
        if (selectedService) {
            setService({
                ...selectedService,
                date: selectedService?.date
                    ? dayjs(selectedService?.date)
                    : null,
            });
        }
        if (selectedService?.date) {
            const selectedDate = GFormatDate(
                selectedService?.date,
                "DD/MM/YYYY"
            ).toString();

            const filteredOptions = bookingTimeDefault.filter((option) => {
                const matchingBooking = getBookingDetail.find(
                    (booking) =>
                        GFormatDate(booking.date, "DD/MM/YYYY").toString() ===
                            selectedDate &&
                        booking.start_time === option.start_time
                );
                return !matchingBooking;
            });

            setBookingTime(filteredOptions);
        }
    }, [selectedService]);

    const getBookingDetail = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );

    const [bookingTime, setBookingTime] = useState([]);
    const bookingTimeDefault = [
        {
            id: 1,
            name: "7:00 - 09:00",
            start_time: "07:00:00",
            end_time: "09:00:00",
        },
        {
            id: 2,
            name: "09:00 - 11:00",
            start_time: "09:00:00",
            end_time: "11:00:00",
        },
        {
            id: 3,
            name: "13:00 - 15:00",
            start_time: "13:00:00",
            end_time: "15:00:00",
        },
        {
            id: 4,
            name: "15:00 - 17:00",
            start_time: "15:00:00",
            end_time: "17:00:00",
        },
    ];
    const handleChangeBookingDate = (value) => {
        if (value) {
            formik.setFieldValue("date", value);
            const selectedDate = GFormatDate(value, "DD/MM/YYYY").toString();

            const filteredOptions = bookingTimeDefault.filter((option) => {
                const matchingBooking = getBookingDetail.find(
                    (booking) =>
                        GFormatDate(booking.date, "DD/MM/YYYY").toString() ===
                            selectedDate &&
                        booking.start_time === option.start_time
                );
                return !matchingBooking;
            });

            // console.log(getBookingDetail?.find((b) => b?.date === ""));

            setBookingTime(filteredOptions);
        } else {
            formik.setFieldValue("date", null);
            setBookingTime([]);
            formik.setFieldValue("bookingTime_id", null);
            formik.setFieldValue("bookingTime_name", null);
            formik.setFieldValue("start_time", null);
            formik.setFieldValue("end_time", null);
        }
    };

    const handleChangeBookingTime = (value) => {
        if (value) {
            formik.setFieldValue("bookingTime_id", value?.id);
            formik.setFieldValue("bookingTime_name", value?.name);
            formik.setFieldValue("start_time", value?.start_time);
            formik.setFieldValue("end_time", value?.end_time);
        } else {
            formik.setFieldValue("bookingTime_id", null);
            formik.setFieldValue("bookingTime_name", null);
            formik.setFieldValue("start_time", null);
            formik.setFieldValue("end_time", null);
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
                                        label={"Tên dịch vụ"}
                                        fullWidth
                                        size="medium"
                                        name={"service_name"}
                                        value={
                                            formik.values?.service_name || ""
                                        }
                                        onChange={formik.handleChange}
                                        formik={formik}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <GDatePicker
                                    size={"medium"}
                                    label={"Chọn ngày"}
                                    onBlur={formik.handleBlur}
                                    fullWidth
                                    name="date"
                                    onChange={(date) =>
                                        handleChangeBookingDate(date)
                                    }
                                    value={formik.values?.date || null}
                                    formik={formik}
                                    error={
                                        formik?.touched?.date &&
                                        Boolean(formik?.errors?.date)
                                    }
                                    helperText={
                                        formik?.touched?.date &&
                                        formik?.errors?.date
                                    }
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Autocomplete
                                    options={bookingTime}
                                    onBlur={formik.handleBlur}
                                    getOptionLabel={(option) =>
                                        `${option?.name}` || ""
                                    }
                                    onChange={(e, value) => {
                                        handleChangeBookingTime(value);
                                    }}
                                    value={
                                        formik.values.start_time
                                            ? {
                                                  id: bookingTimeDefault?.find(
                                                      (t) =>
                                                          t.start_time ===
                                                          formik.values
                                                              .start_time
                                                  )?.id,
                                                  name: bookingTimeDefault?.find(
                                                      (t) =>
                                                          t.start_time ===
                                                          formik.values
                                                              .start_time
                                                  )?.name,
                                              }
                                            : null
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                        value === null ||
                                        value === "" ||
                                        option?.id === value?.id
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            color="secondary"
                                            size="medium"
                                            fullWidth
                                            label="Khung thời gian"
                                        />
                                    )}
                                />
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
