import { Autocomplete, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import GDatePicker, {
    GFormatDate,
} from "../../../components/GDatePicker/GDatePicker";
import { useFormikContext } from "formik";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getBookingById } from "../../../redux/api/apiBooking";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import {
    getAllBookingDetailByBookingId,
    getBookingDetailByBookingId,
} from "../../../redux/api/apiBookingDetail";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { getServiceById } from "../../../redux/api/apiService";
import { getServiceCategoryById } from "../../../redux/api/apiServiceCategory";
import styles from "./DetailBookedSchedule.module.scss";
import classNames from "classnames/bind";
import GButton from "../../../components/MyButton/MyButton";
import { CloseRounded, EditRounded, SaveAsRounded } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);

// Booking time
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

function ServiceInfo({ isEditting, setIsEditting }) {
    dayjs.extend(utc);

    const { handleBlur, setFieldValue, values, handleSubmit, touched, errors } =
        useFormikContext(); // Formik

    const dispatch = useDispatch(); // Redux

    // Responsive
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const { bookingId } = useParams(); // Get bookingId from params

    // Get Redux state
    const user = useSelector((state) => state.auth.login?.currentUser);
    const bookingDetail = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );
    const serviceInBookingDetail = useSelector(
        (state) => state.service.service?.service
    );
    const serviceCategoryInBookingDetail = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategory
    );
    const getAllBookingByUser = useSelector(
        (state) => state.booking.booking?.bookingListByUser
    );
    const getBookingByUser = useSelector(
        (state) => state.booking.booking?.booking
    );
    const bookingDetailList = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailListByBooking
    );

    // Axios JWT -> check token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    // State
    const [bookingDetailClone, setBookingDetailClone] = useState({});
    const [serviceInBookingDetailClone, setServiceInBookingDetailClone] =
        useState({});
    const [
        serviceCategoryInBookingDetailClone,
        setServiceCategoryInBookingDetailClone,
    ] = useState({});
    const [bookingListByUserClone, setbookingListByUserClone] = useState([]);
    const [bookingDetailListByUserClone, setbookingDetailListByUserClone] =
        useState([]);
    const [bookingTime, setBookingTime] = useState([]);
    const [bookingByUserClone, setBookingByUserClone] = useState({});

    // CALL API: get booking detail by bookingId
    useEffect(() => {
        const fetch = async () => {
            await getBookingDetailByBookingId(
                dispatch,
                bookingId,
                user?.accessToken,
                axiosJWT
            );
        };
        fetch();
    }, []);

    // CALL API: Get service - service category
    useEffect(() => {
        const fetch = async () => {
            if (bookingDetailClone.service_id) {
                const service = await getServiceById(
                    dispatch,
                    bookingDetailClone?.service_id,
                    user?.accessToken,
                    axiosJWT
                );
            }
        };
        fetch();
    }, [bookingDetailClone]);

    useEffect(() => {
        const fetch = async () => {
            if (serviceInBookingDetailClone.service_category_id) {
                const serviceCategory = await getServiceCategoryById(
                    serviceInBookingDetailClone?.service_category_id,
                    user?.accessToken,
                    dispatch,
                    axiosJWT
                );
            }
        };
        fetch();
    }, [serviceInBookingDetailClone]);

    useEffect(() => {
        const fetch = async () => {
            if (bookingListByUserClone) {
                for (const item of bookingListByUserClone) {
                    const bookingDetailList =
                        await getAllBookingDetailByBookingId(
                            dispatch,
                            item?.id,
                            user?.accessToken,
                            axiosJWT
                        );

                    bookingDetailListByUserClone.push(bookingDetailList);
                }
            }
        };
        fetch();
    }, [bookingListByUserClone]);

    // Clone data
    useEffect(() => {
        if (bookingDetail)
            setBookingDetailClone(structuredClone(bookingDetail[0]));
        setFieldValue("booking_detail_id", bookingDetail[0]?.id);
    }, [bookingDetail]);

    useEffect(() => {
        if (serviceCategoryInBookingDetail)
            setServiceCategoryInBookingDetailClone(
                structuredClone(serviceCategoryInBookingDetail)
            );
    }, [serviceCategoryInBookingDetail]);

    useEffect(() => {
        if (serviceInBookingDetail)
            setServiceInBookingDetailClone(
                structuredClone(serviceInBookingDetail)
            );
    }, [serviceInBookingDetail]);

    useEffect(() => {
        if (getAllBookingByUser)
            setbookingListByUserClone(structuredClone(getAllBookingByUser));
    }, [getAllBookingByUser]);

    useEffect(() => {
        if (getBookingByUser)
            setBookingByUserClone(structuredClone(getBookingByUser));
    }, [getBookingByUser]);

    // Set value to formik
    useEffect(() => {
        if (bookingDetailClone) {
            const getBookingTime = bookingTimeDefault?.find(
                (t) => t.start_time === bookingDetailClone?.start_time
            );
            setFieldValue("description", bookingDetailClone?.description);
            setFieldValue("date", dayjs(bookingDetailClone?.date));
            setFieldValue("bookingTime_id", getBookingTime?.id);
            setFieldValue("bookingTime_name", getBookingTime?.name);
            setFieldValue("start_time", bookingDetailClone?.start_time);
            setFieldValue("end_time", bookingDetailClone?.end_time);

            if (!isEditting) {
                setFieldValue("date", dayjs(bookingDetailClone?.date));
                setFieldValue("bookingTime_id", getBookingTime?.id);
                setFieldValue("bookingTime_name", getBookingTime?.name);
                setFieldValue("start_time", bookingDetailClone?.start_time);
                setFieldValue("end_time", bookingDetailClone?.end_time);
            }
        }
    }, [bookingDetailClone, isEditting]);

    useEffect(() => {
        if (serviceInBookingDetailClone) {
            setFieldValue("service_name", serviceInBookingDetailClone?.name);
        }
    }, [serviceInBookingDetailClone]);

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
    const handleChangeBookingDate = (value, index) => {
        if (value) {
            setFieldValue(`date`, value);
            const selectedDate = GFormatDate(value, "DD/MM/YYYY").toString();

            const filteredOptions = bookingTimeDefault.filter((option) => {
                const matchingBooking = bookingDetailListByUserClone
                    .flat()
                    .find(
                        (booking) =>
                            GFormatDate(
                                booking.date,
                                "DD/MM/YYYY"
                            ).toString() === selectedDate &&
                            booking.start_time === option.start_time
                    );
                return !matchingBooking;
            });

            // if(filteredOptions?.length ===0) {
            //     setFieldError("")
            // }

            setBookingTime(filteredOptions);
        } else {
            setFieldValue(`date`, null);
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);
        }
    };
    useEffect(() => {
        if (values.date) {
            const selectedDate = GFormatDate(
                values?.date,
                "DD/MM/YYYY"
            ).toString();

            const filteredOptions = bookingTimeDefault.filter((option) => {
                const matchingBooking = bookingDetailListByUserClone
                    .flat()
                    .find(
                        (booking) =>
                            GFormatDate(
                                booking.date,
                                "DD/MM/YYYY"
                            ).toString() === selectedDate &&
                            booking.start_time === option.start_time
                    );
                return !matchingBooking;
            });
            setBookingTime(filteredOptions);
        }
    }, [values.date]);
    const [stateOpen, setStateOpen] = useState(true);
    const handleStateOpen = () => {
        setStateOpen((prev) => !prev);
    };

    return (
        <>
            <div className={cx("service-info-wrapper")}>
                <div className={cx("service-info-title")}>
                    <h3 onClick={handleStateOpen}>Thông tin dịch vụ</h3>
                    {isSmall &&
                        !isEditting &&
                        getBookingByUser?.status !== 5 && (
                            <GButton
                                onClick={() => setIsEditting(!isEditting)}
                                startIcon={<EditRounded />}
                            >
                                Sửa
                            </GButton>
                        )}
                </div>
                <div className={stateOpen ? cx("form", "isOpen") : cx("form")}>
                    <Grid container spacing={2}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Autocomplete
                                disabled
                                options={[]}
                                onBlur={handleBlur}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || ""
                                }
                                onChange={(e, value) => {}}
                                isOptionEqualToValue={(option, value) =>
                                    value === null ||
                                    value === "" ||
                                    option?.id === value?.id
                                }
                                value={
                                    (serviceCategoryInBookingDetailClone?.id && {
                                        id: serviceCategoryInBookingDetailClone?.id,
                                        name: serviceCategoryInBookingDetailClone?.name,
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
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Autocomplete
                                disabled
                                options={[]}
                                onBlur={handleBlur}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || ""
                                }
                                onChange={(e, value) => {}}
                                isOptionEqualToValue={(option, value) =>
                                    value === null ||
                                    value === "" ||
                                    option?.id === value?.id
                                }
                                value={
                                    (serviceInBookingDetailClone?.id && {
                                        id: serviceInBookingDetailClone?.id,
                                        name: serviceInBookingDetailClone?.name,
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
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <GDatePicker
                                disabled={!isEditting}
                                onBlur={handleBlur}
                                size={"small"}
                                label={"Ngày đặt"}
                                fullWidth
                                name="date"
                                onChange={(date) =>
                                    handleChangeBookingDate(date)
                                }
                                value={values?.date || null}
                                error={
                                    touched?.date &&
                                    errors?.date &&
                                    Boolean(errors?.date)
                                }
                                helperText={errors?.date && errors?.date}
                            />
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Autocomplete
                                disabled={!isEditting}
                                options={bookingTime}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || ""
                                }
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
                                    setFieldValue(
                                        "description",
                                        e.target.value
                                    );
                                }}
                                value={values?.description || ""}
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
                                    startIcon={<CloseRounded />}
                                    color={"error"}
                                    variant="outlined"
                                    onClick={() => setIsEditting(!isEditting)}
                                >
                                    Hủy
                                </GButton>
                                <GButton
                                    style={{ marginLeft: 12 }}
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
            </div>
        </>
    );
}

export default ServiceInfo;
