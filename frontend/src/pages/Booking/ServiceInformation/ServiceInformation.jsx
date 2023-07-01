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
    DateFieldMobile,
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
import {
    getAllBookingDetailByUser,
    getBookingTimeList,
} from "../../../redux/api/apiBookingDetail";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RequiredLabelWrapper, {
    RequiredMark,
} from "../../../components/RequiredLabel/RequiredLabel";
const cx = classNames.bind(styles);

export default function ServiceInformation() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const location = useLocation();
    const getBranch = useSelector((state) => state.branch.branch?.branchList);

    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const {
        handleBlur,
        handleChange,
        setFieldValue,
        values,
        setFieldTouched,
        touched,
        errors,
    } = useFormikContext();
    const [serviceCategoryClone, setServiceCategoryClone] = useState([]);
    const [serviceClone, setServiceClone] = useState([]);
    const [selectedServiceLocation, setSelectedServiceLocation] = useState({});
    const [
        selectedServiceCategoryLocation,
        setSelectedServiceCategoryLocation,
    ] = useState({});
    const selectedService = location.state?.selectedService;
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
            navigate("/danh-muc-dich-vu");
            // toast("Vui lòng chọn dịch vụ để đặt lịch.", {
            //     icon: "😅",
            // });
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

    const getBookingDetailByUser = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByUser
    );

    const [bookingDetailClone, setBookingDetailClone] = useState([]);

    useEffect(() => {
        if (getBookingDetailByUser?.length > 0) {
            setBookingDetailClone(getBookingDetailByUser);
        }
    }, [getBookingDetailByUser]);

    useEffect(() => {
        const fetch = async () => {
            await getAllBookingDetailByUser(
                dispatch,
                user?.id,
                user?.accessToken,
                axiosJWT
            );
        };
        fetch();
    }, []);

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

    const [selectedBranch, setSelectedBranch] = useState({});
    const [bookingTime, setBookingTime] = useState([]);

    const handleChangeBranch = async (value) => {
        if (value) {
            setFieldValue("branch_id", value?.id);
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);

            setSelectedBranch(value);

            if (values?.date) {
                const date = GFormatDate(values?.date, "YYYY-MM-DD").toString();

                const bookingTimeList = await getBookingTimeList(
                    user?.accessToken,
                    user?.id,
                    value?.id,
                    date,
                    axiosJWT
                );

                setBookingTime(bookingTimeList);
            }
        } else {
            setFieldValue("branch_id", null);
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);
            setSelectedBranch("");
            setBookingTime([]);
        }
    };

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

    const handleChangeBookingDate = async (value, index) => {
        if (errors?.date) {
            setBookingTime([]);
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);
        }

        if (value) {
            setFieldValue(`date`, value);
            const date = GFormatDate(value, "YYYY-MM-DD").toString();
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);

            if (values?.branch_id) {
                const bookingTimeList = await getBookingTimeList(
                    user?.accessToken,
                    user?.id,
                    values?.branch_id,
                    date,
                    axiosJWT
                );

                setBookingTime(bookingTimeList);
            }
        } else {
            setFieldValue(`bookingTime_id`, null);
            setFieldValue(`bookingTime_name`, null);
            setFieldValue(`start_time`, null);
            setFieldValue(`end_time`, null);
            setFieldValue(`date`, null);
            setBookingTime([]);
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
                                    <RequiredLabelWrapper
                                        label={<h3>Thông tin dịch vụ</h3>}
                                    />
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                                <Grid item lg={6} md={6} sm={12} xs={12}>
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
                                <Grid item xs={12}>
                                    <Autocomplete
                                        options={getBranch}
                                        onBlur={handleBlur}
                                        getOptionLabel={(option) =>
                                            option.name || ""
                                        }
                                        isOptionEqualToValue={(option, value) =>
                                            value?.id === option?.id
                                        }
                                        onChange={(event, value) => {
                                            handleChangeBranch(value);
                                        }}
                                        value={selectedBranch || null}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                fullWidth
                                                color="secondary"
                                                label="Chọn cơ sở"
                                                variant="outlined"
                                                name="branch_id"
                                                size="small"
                                                error={
                                                    touched?.branch_id &&
                                                    Boolean(errors?.branch_id)
                                                }
                                                helperText={
                                                    touched?.branch_id &&
                                                    errors?.branch_id
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                {!isSmall && (
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <GDatePicker
                                            size={"small"}
                                            label={
                                                <>
                                                    Chọn ngày <RequiredMark />
                                                </>
                                            }
                                            fullWidth
                                            name="date"
                                            onBlurFormik={handleBlur}
                                            onChange={(date) =>
                                                handleChangeBookingDate(date)
                                            }
                                            value={values?.date || null}
                                            error={
                                                touched?.date &&
                                                Boolean(errors?.date)
                                            }
                                            helperText={
                                                touched?.date && errors?.date
                                            }
                                        />
                                    </Grid>
                                )}
                                {isSmall && (
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <DateFieldMobile
                                            size={"small"}
                                            label={
                                                <>
                                                    Chọn ngày <RequiredMark />
                                                </>
                                            }
                                            fullWidth
                                            name="date"
                                            onBlur={handleBlur}
                                            onChange={(date) =>
                                                handleChangeBookingDate(date)
                                            }
                                            value={values?.date || null}
                                            error={
                                                touched?.date &&
                                                Boolean(errors?.date)
                                            }
                                            helperText={
                                                touched?.date && errors?.date
                                            }
                                        />
                                    </Grid>
                                )}
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                    <Autocomplete
                                        onBlur={handleBlur}
                                        noOptionsText={
                                            !values?.branch_id
                                                ? "Vui lòng chọn cơ sở"
                                                : values?.date
                                                ? "Bạn đang có lịch hẹn trùng, vui lòng chọn ngày khác hoặc chọn cơ sở khác."
                                                : "Vui lòng chọn ngày."
                                        }
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
                                                {...params}
                                                onBlur={handleBlur}
                                                color="secondary"
                                                size="small"
                                                fullWidth
                                                label={
                                                    <>
                                                        Khung thời gian{" "}
                                                        <RequiredMark />
                                                    </>
                                                }
                                                name="bookingTime_id"
                                                error={
                                                    touched?.bookingTime_id &&
                                                    Boolean(
                                                        errors?.bookingTime_id
                                                    )
                                                }
                                                helperText={
                                                    touched?.bookingTime_id &&
                                                    errors?.bookingTime_id
                                                }
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <GTextFieldNormal
                                        fullWidth
                                        label={"Ghi chú"}
                                        multiline={true}
                                        rows={2}
                                        name={"note"}
                                        onChange={handleChange}
                                        value={values?.note}
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
