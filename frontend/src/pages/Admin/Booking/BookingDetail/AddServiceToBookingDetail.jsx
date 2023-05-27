import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import styles from "./BookingDetail.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";

import GButton from "../../../../components/MyButton/MyButton";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { string, object, array } from "yup";
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";

import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import {
    createInvoiceDetail,
    updateInvoiceDetail,
} from "../../../../redux/api/apiInvoiceDetail";
import GModal from "../../../../common/GModal/GModal";
import { getAllProduct } from "../../../../redux/api/apiProduct";
import GDatePicker, {
    GFormatDate,
} from "../../../../components/GDatePicker/GDatePicker";
import { createBookingDetail } from "../../../../redux/api/apiBookingDetail";

const cx = classNames.bind(styles);

export default function AddServiceToBookingDetail({
    handleOpen,
    isOpen,
    ...props
}) {
    const { bookingId } = useParams();
    dayjs.extend(utc);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const getBookingDetail = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );

    const dispatch = useDispatch();
    const [cloneData, setCloneData] = useState([]);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const validationSchema = object({
        services: array(
            object({
                service_id: string().required("Vui lòng chọn sản phẩm"),
                bookingTime_id: string().required("Vui lòng chọn khung giờ"),
                date: string().required("Vui lòng chọn ngày"),
            })
        ),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        enableReinitialize: true,
        initialValues: {
            services: [
                {
                    service_id: "",
                    service_name: "",
                    bookingTime_id: "",
                    bookingTime_name: "",
                    date: "",
                    start_time: "",
                    end_time: "",
                    unit_price: "",
                },
            ],
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            await handleCreateBookingDetail(values);
        },
    });

    const serviceList = useSelector(
        (state) => state.service.service?.serviceList
    );

    useEffect(() => {
        setCloneData(structuredClone(serviceList));
    }, [serviceList]);

    const handleCreateBookingDetail = async (values) => {
        const data = values?.services?.map((service) => {
            const {
                bookingTime_id,
                bookingTime_name,
                date,
                service_name,
                ...data
            } = service;
            const dataCreate = {
                ...data,
                date: GFormatDate(date, "YYYY-MM-DD"),
                booking_id: bookingId,
            };
            return dataCreate;
        });

        for (const item of data) {
            await createBookingDetail(
                bookingId,
                user?.accessToken,
                dispatch,
                item,
                axiosJWT
            ).then(() => {
                handleCloseModal();
            });
        }
    };

    const handleChangeService = (value, index) => {
        if (value) {
            formik.setFieldValue(`services[${index}].service_id`, value?.id);
            formik.setFieldValue(
                `services[${index}].service_name`,
                value?.name
            );
            formik.setFieldValue(`services[${index}].unit_price`, value?.price);
        } else {
            formik.setFieldValue(`services[${index}].service_id`, null);
            formik.setFieldValue(`services[${index}].service_name`, null);
            formik.setFieldValue(`services[${index}].unit_price`, null);
        }
    };
    const handleChangeBookingTime = (value, index) => {
        if (value) {
            formik.setFieldValue(
                `services[${index}].bookingTime_id`,
                value?.id
            );
            formik.setFieldValue(
                `services[${index}].bookingTime_name`,
                value?.name
            );
            formik.setFieldValue(
                `services[${index}].start_time`,
                value?.start_time
            );
            formik.setFieldValue(
                `services[${index}].end_time`,
                value?.end_time
            );
        } else {
            formik.setFieldValue(`services[${index}].bookingTime_id`, null);
            formik.setFieldValue(`services[${index}].bookingTime_name`, null);
            formik.setFieldValue(`services[${index}].start_time`, null);
            formik.setFieldValue(`services[${index}].end_time`, null);
        }
    };

    const [bookingTime, setBookingTime] = useState([]);

    const handleChangeBookingDate = (value, index) => {
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
        if (value) {
            formik.setFieldValue(`services[${index}].date`, value);
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

            setBookingTime(filteredOptions);
        } else {
            formik.setFieldValue(`services[${index}].date`, null);
            setBookingTime([]);
            formik.setFieldValue(`services[${index}].bookingTime_id`, null);
            formik.setFieldValue(`services[${index}].bookingTime_name`, null);
            formik.setFieldValue(`services[${index}].start_time`, null);
            formik.setFieldValue(`services[${index}].end_time`, null);
        }
    };
    const handleCloseModal = () => {
        props.handleClose();
        formik.resetForm();
        setBookingTime([]);
    };

    return (
        <div className={cx("invoice-detail-wrapper")}>
            <GModal
                handleClose={handleCloseModal}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={"Thêm dịch vụ"}
            >
                <div className={cx("invoice-detail-form")}>
                    <div className={cx("form-body")}>
                        <FormikProvider value={formik}>
                            <form onSubmit={formik.handleSubmit}>
                                <FieldArray name="services">
                                    {({ insert, remove, push }) => (
                                        <>
                                            {formik.values.services.length >
                                                0 &&
                                                formik.values.services.map(
                                                    (product, index) => (
                                                        <div
                                                            className={cx(
                                                                "service-info-item"
                                                            )}
                                                            key={index}
                                                        >
                                                            <Grid
                                                                container
                                                                spacing={2}
                                                                display={"flex"}
                                                                alignItems={
                                                                    "center"
                                                                }
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={11}
                                                                >
                                                                    <div>
                                                                        <Grid
                                                                            container
                                                                            spacing={
                                                                                2
                                                                            }
                                                                        >
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    12
                                                                                }
                                                                            >
                                                                                <Autocomplete
                                                                                    options={
                                                                                        cloneData
                                                                                    }
                                                                                    onBlur={
                                                                                        formik.handleBlur
                                                                                    }
                                                                                    getOptionLabel={(
                                                                                        option
                                                                                    ) =>
                                                                                        `${option?.name}` ||
                                                                                        ""
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                        value
                                                                                    ) => {
                                                                                        handleChangeService(
                                                                                            value,
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                    isOptionEqualToValue={(
                                                                                        option,
                                                                                        value
                                                                                    ) =>
                                                                                        value ===
                                                                                            null ||
                                                                                        value ===
                                                                                            "" ||
                                                                                        option?.id ===
                                                                                            value?.id
                                                                                    }
                                                                                    value={
                                                                                        formik
                                                                                            .values
                                                                                            ?.services[
                                                                                            index
                                                                                        ]
                                                                                            ?.service_id
                                                                                            ? {
                                                                                                  id: formik
                                                                                                      .values
                                                                                                      ?.services[
                                                                                                      index
                                                                                                  ]
                                                                                                      ?.service_id,
                                                                                                  name: formik
                                                                                                      .values
                                                                                                      ?.services[
                                                                                                      index
                                                                                                  ]
                                                                                                      ?.service_name,
                                                                                              }
                                                                                            : null
                                                                                    }
                                                                                    renderInput={(
                                                                                        params
                                                                                    ) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            color="secondary"
                                                                                            name={`services.${index}.service_id`}
                                                                                            size="medium"
                                                                                            fullWidth
                                                                                            label="Chọn dịch vụ"
                                                                                            error={
                                                                                                formik
                                                                                                    .touched
                                                                                                    .services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services &&
                                                                                                Boolean(
                                                                                                    formik
                                                                                                        .errors
                                                                                                        ?.services[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.service_id
                                                                                                )
                                                                                            }
                                                                                            helperText={
                                                                                                formik
                                                                                                    .touched
                                                                                                    .services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services[
                                                                                                    index
                                                                                                ]
                                                                                                    ?.service_id
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    6
                                                                                }
                                                                            >
                                                                                <GDatePicker
                                                                                    size={
                                                                                        "medium"
                                                                                    }
                                                                                    label={
                                                                                        "Chọn ngày"
                                                                                    }
                                                                                    onBlur={
                                                                                        formik.handleBlur
                                                                                    }
                                                                                    fullWidth
                                                                                    name="date"
                                                                                    onChange={(
                                                                                        date
                                                                                    ) =>
                                                                                        handleChangeBookingDate(
                                                                                            date,
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                    value={
                                                                                        formik
                                                                                            .values
                                                                                            ?.services[
                                                                                            index
                                                                                        ]
                                                                                            ?.date ||
                                                                                        null
                                                                                    }
                                                                                    error={
                                                                                        formik
                                                                                            .touched
                                                                                            .services &&
                                                                                        formik
                                                                                            .errors
                                                                                            ?.services &&
                                                                                        Boolean(
                                                                                            formik
                                                                                                .errors
                                                                                                ?.services[
                                                                                                index
                                                                                            ]
                                                                                                ?.date
                                                                                        )
                                                                                    }
                                                                                    helperText={
                                                                                        formik
                                                                                            .errors
                                                                                            ?.services &&
                                                                                        formik
                                                                                            .errors
                                                                                            ?.services[
                                                                                            index
                                                                                        ]
                                                                                            ?.date
                                                                                    }
                                                                                />
                                                                            </Grid>
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    6
                                                                                }
                                                                            >
                                                                                <Autocomplete
                                                                                    options={
                                                                                        bookingTime
                                                                                    }
                                                                                    onBlur={
                                                                                        formik.handleBlur
                                                                                    }
                                                                                    getOptionLabel={(
                                                                                        option
                                                                                    ) =>
                                                                                        `${option?.name}` ||
                                                                                        ""
                                                                                    }
                                                                                    onChange={(
                                                                                        e,
                                                                                        value
                                                                                    ) => {
                                                                                        handleChangeBookingTime(
                                                                                            value,
                                                                                            index
                                                                                        );
                                                                                    }}
                                                                                    isOptionEqualToValue={(
                                                                                        option,
                                                                                        value
                                                                                    ) =>
                                                                                        value ===
                                                                                            null ||
                                                                                        value ===
                                                                                            "" ||
                                                                                        option?.id ===
                                                                                            value?.id
                                                                                    }
                                                                                    value={
                                                                                        formik
                                                                                            .values
                                                                                            ?.services[
                                                                                            index
                                                                                        ]
                                                                                            ?.bookingTime_id
                                                                                            ? {
                                                                                                  id: formik
                                                                                                      .values
                                                                                                      ?.services[
                                                                                                      index
                                                                                                  ]
                                                                                                      ?.bookingTime_id,
                                                                                                  name: formik
                                                                                                      .values
                                                                                                      ?.services[
                                                                                                      index
                                                                                                  ]
                                                                                                      ?.bookingTime_name,
                                                                                              }
                                                                                            : null
                                                                                    }
                                                                                    renderInput={(
                                                                                        params
                                                                                    ) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            color="secondary"
                                                                                            name={`services.${index}.service_id`}
                                                                                            size="medium"
                                                                                            fullWidth
                                                                                            label="Khung thời gian"
                                                                                            error={
                                                                                                formik
                                                                                                    .touched
                                                                                                    .services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services &&
                                                                                                Boolean(
                                                                                                    formik
                                                                                                        .errors
                                                                                                        ?.services[
                                                                                                        index
                                                                                                    ]
                                                                                                        ?.bookingTime_id
                                                                                                )
                                                                                            }
                                                                                            helperText={
                                                                                                formik
                                                                                                    .touched
                                                                                                    .services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services &&
                                                                                                formik
                                                                                                    .errors
                                                                                                    ?.services[
                                                                                                    index
                                                                                                ]
                                                                                                    ?.bookingTime_id
                                                                                            }
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                </Grid>

                                                                <Grid
                                                                    item
                                                                    xs={1}
                                                                >
                                                                    <div
                                                                        className={cx(
                                                                            "remove-btn-wrapper"
                                                                        )}
                                                                    >
                                                                        <IconButton
                                                                            color="error"
                                                                            onClick={() =>
                                                                                remove(
                                                                                    index
                                                                                )
                                                                            }
                                                                        >
                                                                            <RemoveRounded color="error" />
                                                                        </IconButton>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    )
                                                )}
                                            <div>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <GButton
                                                            color="success"
                                                            startIcon={
                                                                <AddRounded />
                                                            }
                                                            onClick={() =>
                                                                push({
                                                                    service_id:
                                                                        "",
                                                                    service_name:
                                                                        "",
                                                                    product_quantity: 1,
                                                                    unit_price:
                                                                        "",
                                                                })
                                                            }
                                                        >
                                                            Thêm sản phẩm
                                                        </GButton>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>
                                    )}
                                </FieldArray>
                                <div className={cx("submit-btn-wrapper")}>
                                    <GButton color={"success"} type="submit">
                                        Lưu
                                    </GButton>
                                    <GButton
                                        color={"text"}
                                        onClick={handleCloseModal}
                                    >
                                        Hủy
                                    </GButton>
                                </div>
                            </form>
                        </FormikProvider>
                    </div>
                </div>
            </GModal>
        </div>
    );
}
