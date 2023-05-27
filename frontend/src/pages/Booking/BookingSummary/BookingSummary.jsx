/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import classNames from "classnames/bind";
import styles from "./BookingSummary.module.scss";
import { Grid } from "@mui/material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { GInfoGroup } from "../../../common/GInfoGroup/GInfoGroup";
import GButton from "../../../components/MyButton/MyButton";
import { useFormikContext } from "formik";
import { useLocation } from "react-router-dom";
import { GFormatDate } from "../../../components/GDatePicker/GDatePicker";

const cx = classNames.bind(styles);

function BookingSummary() {
    const location = useLocation();
    const selectedService = location.state?.selectedService;
    const { submitForm, values } = useFormikContext();

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("booking-summary")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <span className={cx("booking-summary-title")}>
                                <h2>Dịch vụ của bạn</h2>
                            </span>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("booked-service")}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GInfoGroup
                                            label="Tên dịch vụ"
                                            title={selectedService?.name}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GInfoGroup
                                            label="Giá"
                                            title={FormatCurrency(
                                                selectedService?.price_onsale >
                                                    0
                                                    ? selectedService?.price_onsale
                                                    : selectedService?.price ||
                                                          null
                                            )}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <GInfoGroup
                                            label="Ngày đặt"
                                            title={
                                                values.date
                                                    ? GFormatDate(
                                                          values?.date,
                                                          "DD-MM-YYYY"
                                                      )
                                                    : "DD - MM - YYYY"
                                            }
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={6}>
                                        <GInfoGroup
                                            label="Khung giờ"
                                            title={
                                                values.bookingTime_name
                                                    ? values.bookingTime_name
                                                    : " -- : --"
                                            }
                                        />
                                    </Grid>
                                    {/* <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GInfoGroup
                                            label="Thời gian bắt đầu"
                                            title={bookedService?.startTime}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={12} sm={12} xs={12}>
                                        <GInfoGroup
                                            label="Thời gian kết thúc"
                                            title={bookedService?.endTime}
                                        />
                                    </Grid> */}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={cx("price-summary")}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span>
                                        <h3>Tóm tắt giá</h3>
                                    </span>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("child-price-summary")}>
                                        <span
                                            className={cx("child-price-title")}
                                        >
                                            Dịch vụ:
                                        </span>
                                        <span className={cx("child-price")}>
                                            {FormatCurrency(
                                                selectedService?.price_onsale >
                                                    0
                                                    ? selectedService?.price_onsale
                                                    : selectedService?.price ||
                                                          null
                                            )}
                                        </span>
                                    </div>
                                    <div className={cx("child-price-summary")}>
                                        <span
                                            className={cx("child-price-title")}
                                        >
                                            VAT:
                                        </span>
                                        <span className={cx("child-price")}>
                                            0
                                        </span>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <hr />
                                    <div
                                        className={cx(
                                            "temporary-price-wrapper"
                                        )}
                                    >
                                        <span
                                            className={cx(
                                                "temporary-price-title"
                                            )}
                                        >
                                            Tạm tính:
                                        </span>
                                        <span className={cx("temporary-price")}>
                                            {FormatCurrency(
                                                selectedService?.price_onsale >
                                                    0
                                                    ? selectedService?.price_onsale
                                                    : selectedService?.price ||
                                                          null
                                            )}
                                        </span>
                                    </div>
                                    <div className={cx("total-price-wrapper")}>
                                        <span
                                            className={cx("total-price-title")}
                                        >
                                            Tổng tiền:
                                        </span>
                                        <span className={cx("total-price")}>
                                            {FormatCurrency(
                                                selectedService?.price_onsale >
                                                    0
                                                    ? selectedService?.price_onsale
                                                    : selectedService?.price ||
                                                          null
                                            )}
                                        </span>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <GButton
                                        fullWidth
                                        type={"submit"}
                                        onClick={submitForm}
                                    >
                                        Xác nhận đặt lịch
                                    </GButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default BookingSummary;
