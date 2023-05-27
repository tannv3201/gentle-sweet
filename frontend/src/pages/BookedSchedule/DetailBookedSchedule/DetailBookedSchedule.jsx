import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./DetailBookedSchedule.module.scss";
import classNames from "classnames/bind";
import GButton from "../../../components/MyButton/MyButton";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CustomerInfo from "./CustomerInfo";
import ServiceInfo from "./ServiceInfo";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import ConfirmUpdateBookingPopup from "./ConfirmUpdateBookingPopup";
const cx = classNames.bind(styles);

function DetailBookedSchedule() {
    const navigate = useNavigate();
    const getBooking = useSelector((state) => state.booking.booking?.booking);
    const [booking, setBooking] = useState();
    useEffect(() => {
        if (getBooking) {
            const newBooking = {
                ...getBooking,
                status_name:
                    getBooking?.status === 5
                        ? "Đã hủy"
                        : getBooking?.status === 1
                        ? "Chờ xác nhận"
                        : getBooking?.status === 2
                        ? "Đã xác nhận"
                        : getBooking?.status === 3
                        ? "Đang giao hàng"
                        : getBooking?.status === 4
                        ? "Đã giao hàng"
                        : "",
            };
            setBooking(structuredClone(newBooking));
        }
    }, [getBooking]);

    const [isEditting, setIsEditting] = useState(false);
    const handleStateIsEditting = () => {
        setIsEditting((prev) => !prev);
    };

    // Handle Update booking detail
    const [bookingUpdate, setBookingUpdate] = useState({});

    const [isOpenUpdateBookingPopup, setIsOpenUpdateBookingPopup] =
        useState(false);

    const handleOpenUpdateBookingPopup = (data) => {
        setBookingUpdate(data);
        setIsOpenUpdateBookingPopup(true);
    };

    const handleCloseUpdateBookingPopup = () => {
        setIsOpenUpdateBookingPopup(false);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("back-btn")}>
                    <GButton
                        onClick={() => navigate("/quan-ly-lich-dat")}
                        startIcon={<ArrowBackIosNewRounded />}
                    >
                        Quay lại
                    </GButton>
                </div>
                <div className={cx("detail-booked-form")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div className={cx("form-header")}>
                                <h3>Chi tiết lịch đặt của bạn</h3>
                                <span className={cx("status")}>
                                    Trạng thái:{" "}
                                    <span
                                        className={
                                            booking?.status === 5
                                                ? cx("status-name", "cancel")
                                                : booking?.status === 1
                                                ? cx("status-name", "pending")
                                                : booking?.status === 2
                                                ? cx("status-name", "received")
                                                : booking?.status === 3
                                                ? cx(
                                                      "status-name",
                                                      "delivering"
                                                  )
                                                : booking?.status === 4
                                                ? cx("status-name", "delivered")
                                                : ""
                                        }
                                    >
                                        {booking?.status_name || ""}
                                    </span>
                                </span>
                                <div className={cx("action-btn")}>
                                    <GButton color={"error"}>Hủy</GButton>
                                    {!isEditting ? (
                                        <GButton
                                            color={"success"}
                                            onClick={handleStateIsEditting}
                                        >
                                            Chỉnh sửa
                                        </GButton>
                                    ) : (
                                        <GButton
                                            variant="outlined"
                                            color={"success"}
                                            onClick={handleStateIsEditting}
                                        >
                                            Hủy
                                        </GButton>
                                    )}
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("form-body")}>
                                <Formik
                                    initialValues={{
                                        date: "",
                                        start_time: "",
                                        end_time: "",
                                    }}
                                    onSubmit={(values) => {
                                        handleOpenUpdateBookingPopup(values);
                                    }}
                                >
                                    <div>
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>
                                                <CustomerInfo />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <ServiceInfo
                                                    isEditting={isEditting}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Formik>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <ConfirmUpdateBookingPopup
                isOpen={isOpenUpdateBookingPopup}
                handleOpen={handleOpenUpdateBookingPopup}
                handleClose={handleCloseUpdateBookingPopup}
                selectedBookingDetail={bookingUpdate}
            />
        </div>
    );
}

export default DetailBookedSchedule;
