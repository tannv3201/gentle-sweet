/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import classNames from "classnames/bind";
import styles from "./ServiceInformation.module.scss";
import { Autocomplete, Grid, TextField, useForkRef } from "@mui/material";

import { useState } from "react";

import ModalPolycyGuideline from "./ModalPolycyGuideline/ModalPolycyGuideline";
import { useFormikContext } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import GDatePicker, {
    GFormatDate,
} from "../../../components/GDatePicker/GDatePicker";
import { useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { getAllServiceCategory } from "../../../redux/api/apiServiceCategory";
import { useEffect } from "react";
import { getAllService } from "../../../redux/api/apiService";
import { toast } from "react-hot-toast";
import { getAllBookingByUser } from "../../../redux/api/apiBooking";
import { getBookingDetailByBookingId } from "../../../redux/api/apiBookingDetail";

const cx = classNames.bind(styles);

export default function ServiceInformation() {
    const location = useLocation();

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const { handleBlur, handleChange, setFieldValue, values, setFieldError } =
        useFormikContext();
    const [serviceCategoryClone, setServiceCategoryClone] = useState([]);
    const [serviceClone, setServiceClone] = useState([]);
    const [selectedServiceLocation, setSelectedServiceLocation] = useState({});
    const [
        selectedServiceCategoryLocation,
        setSelectedServiceCategoryLocation,
    ] = useState({});
    const selectedService = location.state?.selectedService;
    // console.log(selectedService);
    const serviceCategoryList = useSelector(
        (state) => state.serviceCategory.serviceCategory?.serviceCategoryList
    );
    const user = useSelector((state) => state.auth.login?.currentUser);
    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );
    const getBookingDetail = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (!selectedService) {
            navigate("/dich-vu");
            toast("Vui lòng chọn dịch vụ để đặt lịch.", {
                icon: "😅",
            });
        }
        const fetch = async () => {
            await getAllServiceCategory(user?.accessToken, dispatch, axiosJWT);
            await getAllService(user?.accessToken, dispatch, axiosJWT);
            await getAllBookingByUser(
                user?.id,
                user?.accessToken,
                dispatch,
                axiosJWT
            );
        };
        fetch();
    }, []);

    const [bookingDetailListByUser, setBookingDetailListByUser] = useState([]);
    const getBookingListByUser = useSelector(
        (state) => state.booking.booking?.bookingListByUser
    );
    // console.log(getBookingListByUser);
    useEffect(() => {
        const fetch = async () => {
            if (getBookingListByUser?.length !== 0) {
                for (const item of getBookingListByUser) {
                    const bookingDetailList = await getBookingDetailByBookingId(
                        dispatch,
                        item?.id,
                        user?.accessToken,
                        axiosJWT
                    );
                    bookingDetailListByUser.push(bookingDetailList);
                }
            }
        };
        fetch();
    }, []);

    console.log(bookingDetailListByUser);
    useEffect(() => {
        if (serviceCategoryList)
            setServiceCategoryClone(structuredClone(serviceCategoryList));
    }, [serviceCategoryList]);

    useEffect(() => {
        if (serviceList) setServiceClone(structuredClone(serviceList));
    }, [serviceList]);

    useEffect(() => {
        if (selectedService) {
            const category = serviceCategoryList?.find(
                (c) => c?.id === selectedService?.service_category_id
            );
            setSelectedServiceCategoryLocation(category);
            setSelectedServiceLocation(selectedService);
            setFieldValue("service_category_id", category?.id);
            setFieldValue("service_category_name", category?.name);

            setFieldValue("service_id", selectedService?.id);
            setFieldValue("service_name", selectedService?.name);
        }
    }, [selectedService]);

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
            const selectedDate = GFormatDate(value, "DD/MM/YYYY").toString();

            const filteredOptions = bookingTimeDefault.filter((option) => {
                const matchingBooking = bookingDetailListByUser
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
            setBookingTime([]);
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);
        }
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h3>Thông tin dịch vụ</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        disabled
                                        options={serviceCategoryClone}
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
                                            (values.service_category_id && {
                                                id: values?.service_category_id,
                                                name: values?.service_category_name,
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
                                        options={serviceClone}
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
                                            (values.service_id && {
                                                id: values?.service_id,
                                                name: values?.service_name,
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
                                        size={"small"}
                                        label={"Chọn ngày"}
                                        fullWidth
                                        name="date"
                                        onBlur={handleBlur}
                                        onChange={(date) =>
                                            handleChangeBookingDate(date)
                                        }
                                        value={values?.date || null}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        options={bookingTime}
                                        getOptionLabel={(option) =>
                                            `${option?.name}` || ""
                                        }
                                        onChange={(e, value) => {
                                            handleChangeBookingTime(value);
                                        }}
                                        isOptionEqualToValue={(option, value) =>
                                            value === null ||
                                            value === "" ||
                                            option?.id === value?.id
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                color="secondary"
                                                size="small"
                                                fullWidth
                                                label="Khung thời gian"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className={cx("note")}>
                                        <span className={cx("note-title")}>
                                            Lưu ý{" "}
                                            <span
                                                style={{
                                                    color: "red",
                                                    fontSize: "1.6rem",
                                                }}
                                            >
                                                *
                                            </span>
                                        </span>
                                        <div className={cx("note-description")}>
                                            <ol>
                                                <li>
                                                    Quý khách không thể đặt lịch
                                                    có thời gian trùng với các
                                                    lịch đặt trước đây.
                                                </li>
                                                <li>
                                                    Quý khách hàng vui lòng kiểm
                                                    tra đầy đủ thông tin cá
                                                    nhân, thông tin dịch vụ muốn
                                                    đặt.
                                                </li>
                                                <li>
                                                    Yêu cầu quý khách hàng tuân
                                                    thủ chính sách đặt/hủy lịch
                                                    của chúng tôi. <br />
                                                    <a
                                                        className={cx(
                                                            "polycies-guidelines-link"
                                                        )}
                                                        onClick={
                                                            handleOpenModal
                                                        }
                                                    >
                                                        Chi tiết xem tại đây.
                                                    </a>
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                <ModalPolycyGuideline
                    isOpen={isOpen}
                    handleClose={handleCloseModal}
                    handleOpen={handleOpenModal}
                />
            </div>
        </div>
    );
}
