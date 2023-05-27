import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import GDatePicker from "../../../components/GDatePicker/GDatePicker";
import { useFormikContext } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBookingById } from "../../../redux/api/apiBooking";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { getBookingDetailByBookingId } from "../../../redux/api/apiBookingDetail";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { getServiceById } from "../../../redux/api/apiService";
import { getServiceCategoryById } from "../../../redux/api/apiServiceCategory";
import styles from "./DetailBookedSchedule.module.scss";
import classNames from "classnames/bind";
import GButton from "../../../components/MyButton/MyButton";
import { SaveAsRounded } from "@mui/icons-material";

function ServiceInfo({ isEditting }) {
    dayjs.extend(utc);
    const location = useLocation();
    const { bookingId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedBooking, setSelectedBooking] = useState({});
    const user = useSelector((state) => state.auth.login?.currentUser);
    const bookingDetailByBooking = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );
    const serviceInBooking = useSelector(
        (state) => state.service.service?.service
    );
    const serviceCategoryInBooking = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategory
    );
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const { handleBlur, handleChange, setFieldValue, values, handleSubmit } =
        useFormikContext();

    useEffect(() => {
        const fetch = async () => {
            if (bookingId) {
                await getBookingDetailByBookingId(
                    dispatch,
                    bookingId,
                    user?.accessToken,
                    axiosJWT
                );
                await getBookingById(
                    dispatch,
                    bookingId,
                    user?.accessToken,
                    axiosJWT
                );
            }
        };
        fetch();
    }, [bookingId]);

    useEffect(() => {
        if (bookingDetailByBooking)
            setSelectedBooking(bookingDetailByBooking[0]);
        setFieldValue("booking_detail_id", bookingDetailByBooking[0].id);
    }, [bookingDetailByBooking]);

    useEffect(() => {
        if (selectedBooking) {
            const getBookingTime = bookingTimeDefault?.find(
                (t) => t.start_time === selectedBooking?.start_time
            );
            setFieldValue("description", selectedBooking?.description);
            setFieldValue("date", dayjs(selectedBooking?.date));
            setFieldValue("bookingTime_id", getBookingTime?.id);
            setFieldValue("bookingTime_name", getBookingTime?.name);
            setFieldValue("start_time", selectedBooking?.start_time);
            setFieldValue("end_time", selectedBooking?.end_time);

            if (!isEditting) {
                setFieldValue("date", dayjs(selectedBooking?.date));
                setFieldValue("bookingTime_id", getBookingTime?.id);
                setFieldValue("bookingTime_name", getBookingTime?.name);
                setFieldValue("start_time", selectedBooking?.start_time);
                setFieldValue("end_time", selectedBooking?.end_time);
            }
        }
        if (serviceInBooking) {
            setFieldValue("service_name", serviceInBooking?.name);
        }
    }, [selectedBooking, isEditting]);
    console.log(selectedBooking);

    useEffect(() => {
        const fetch = async () => {
            if (selectedBooking.service_id) {
                const service = await getServiceById(
                    dispatch,
                    selectedBooking?.service_id,
                    user?.accessToken,
                    axiosJWT
                );

                if (serviceInBooking.service_category_id) {
                    const serviceCategory = await getServiceCategoryById(
                        serviceInBooking?.service_category_id,
                        user?.accessToken,
                        dispatch,
                        axiosJWT
                    );
                }
            }
        };
        fetch();
    }, [selectedBooking]);

    const handleChangeBookingTime = (value, index) => {
        if (value) {
            setFieldValue(`bookingTime_id`, value?.id);
            setFieldValue(`bookingTime_name`, value?.name);
            setFieldValue(`start_time`, value?.start_time);
            setFieldValue(`end_time`, value?.end_time);
        } else {
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);
        }
    };
    const [serviceCategoryClone, setServiceCategoryClone] = useState([]);
    const [serviceClone, setServiceClone] = useState([]);
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
    const handleChangeBookingDate = (value, index) => {
        if (value) {
            setFieldValue(`date`, value);
        } else {
            setFieldValue(`date`, null);
            setBookingTime([]);
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);
        }
    };

    // console.log(serviceInBooking);
    // console.log(serviceCategoryInBooking);
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h3>Thông tin dịch vụ</h3>
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disabled
                        options={[]}
                        onBlur={handleBlur}
                        getOptionLabel={(option) => `${option?.name}` || ""}
                        onChange={(e, value) => {}}
                        isOptionEqualToValue={(option, value) =>
                            value === null ||
                            value === "" ||
                            option?.id === value?.id
                        }
                        value={
                            (serviceCategoryInBooking.id && {
                                id: serviceCategoryInBooking.id,
                                name: serviceCategoryInBooking.name,
                            }) ||
                            null
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                disabled
                                size="small"
                                color="secondary"
                                name="service_category_id"
                                fullWidth
                                label="Danh mục dịch vụ"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disabled
                        options={[]}
                        onBlur={handleBlur}
                        getOptionLabel={(option) => `${option?.name}` || ""}
                        onChange={(e, value) => {}}
                        isOptionEqualToValue={(option, value) =>
                            value === null ||
                            value === "" ||
                            option?.id === value?.id
                        }
                        value={
                            (serviceInBooking?.id && {
                                id: serviceInBooking?.id,
                                name: serviceInBooking?.name,
                            }) ||
                            null
                        }
                        renderInput={(params) => (
                            <TextField
                                disabled
                                {...params}
                                size="small"
                                color="secondary"
                                name="service_id"
                                fullWidth
                                label="Dịch vụ"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6}>
                    <GDatePicker
                        disabled={!isEditting}
                        size={"small"}
                        label={"Ngày đặt"}
                        fullWidth
                        name="date"
                        onBlur={handleBlur}
                        onChange={(date) => handleChangeBookingDate(date)}
                        value={values?.date || null}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        disabled={!isEditting}
                        options={bookingTimeDefault}
                        getOptionLabel={(option) => `${option?.name}` || ""}
                        onChange={(e, value) => {
                            handleChangeBookingTime(value);
                        }}
                        value={
                            values?.bookingTime_id
                                ? {
                                      id: values?.bookingTime_id,
                                      name: values?.bookingTime_name,
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
                                disabled={!isEditting}
                                {...params}
                                color="secondary"
                                size="small"
                                fullWidth
                                label="Khung thời gian"
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        disabled={!isEditting}
                        color="secondary"
                        fullWidth
                        label="Ghi chú"
                        size="large"
                        multiline
                        rows={2}
                        onChange={(e) => {
                            setFieldValue("description", e.target.value);
                        }}
                        value={values?.description}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                {isEditting && (
                    <Grid
                        item
                        xs={12}
                        display={"flex"}
                        justifyContent={"flex-end"}
                    >
                        <GButton
                            startIcon={<SaveAsRounded />}
                            color={"success"}
                            type={"submit"}
                            onClick={handleSubmit}
                        >
                            Lưu
                        </GButton>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

export default ServiceInfo;
