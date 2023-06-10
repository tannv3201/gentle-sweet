import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import styles from "./BookingDetail.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GButton from "../../../../components/MyButton/MyButton";
import { ArrowBackIosNew, ModeEditOutlineRounded } from "@mui/icons-material";

import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";

import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { getAdminUserById } from "../../../../redux/api/apiAdminUser";
import ConfirmPopup from "./ConfirmBooking/ConfirmPopup";
import CancelPopup from "./ConfirmBooking/CancelPopup";
import BookingDetailList from "./BookingDetailList";
import { getBookingDetailByBookingId } from "../../../../redux/api/apiBookingDetail";
import { getBookingById } from "../../../../redux/api/apiBooking";
import BookingCustomerInfo from "./BookingCustomerInfo/BookingCustomerInfo";
import BookingServiceInfo from "./BookingServiceInfo/BookingServiceInfo";

const cx = classNames.bind(styles);

export default function BookingDetail() {
    const { bookingId } = useParams();
    dayjs.extend(utc);
    const [isEditting, setIsEditting] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [currCustomerUser, setCurrCustomerUser] = useState({});
    const [currBookingCreator, setCurrBookingCreator] = useState({});
    const [currBooking, setCurrBooking] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const customerUserList = useSelector(
        (state) => state.customerUser.customerUser?.customerUserList
    );

    const getBooking = useSelector((state) => state.booking.booking?.booking);

    const getBookingDetail = useSelector(
        (state) => state.bookingDetail.bookingDetail?.bookingDetailByBooking
    );
    useEffect(() => {
        setCurrBooking(
            structuredClone({
                ...getBooking,
                statusName:
                    getBooking?.status === 1
                        ? "Chờ tiếp nhận"
                        : getBooking?.status === 2
                        ? "Đã tiếp nhận"
                        : getBooking?.status === 3
                        ? "Đã lên lịch"
                        : getBooking?.status === 4
                        ? "Bắt đầu dịch vụ"
                        : getBooking?.status === 5
                        ? "Đã hoàn thành"
                        : getBooking?.status === 6
                        ? "Đã hủy"
                        : getBooking?.status === 7
                        ? "Yêu cầu hủy lịch hẹn"
                        : "",
            })
        );
    }, [getBooking]);

    useEffect(() => {
        const fetchData = async () => {
            await getBookingDetailByBookingId(
                dispatch,
                bookingId,
                user?.accessToken,
                axiosJWT
            );
            const invoice = await getBookingById(
                dispatch,
                bookingId,
                user?.accessToken,
                axiosJWT
            );
            setCurrCustomerUser(
                structuredClone(
                    customerUserList?.find(
                        (item) => item.id === invoice?.customer_user_id
                    )
                )
            );
            if (invoice?.admin_user_id) {
                await getAdminUserById(
                    dispatch,
                    invoice?.admin_user_id,
                    user?.accessToken,
                    axiosJWT
                ).then((invoiceCreator) => {
                    setCurrBookingCreator(structuredClone(invoiceCreator));
                });
            }
        };

        fetchData();
    }, [bookingId]);

    const handleBack = () => {
        navigate("/admin/booking");
    };

    // Confirm invoice
    const [isOpenConfirmBooking, setIsOpenConfirmBooking] = useState(false);

    const handleOpenConfirmBooking = () => {
        setIsOpenConfirmBooking(true);
    };

    const handleCloseConfirmBooking = () => {
        setIsOpenConfirmBooking(false);
    };

    // Cancel invoice
    const [isOpenCancelBooking, setIsOpenCancelBooking] = useState(false);

    const handleOpenCancelBooking = () => {
        setIsOpenCancelBooking(true);
    };

    const handleCloseCancelInvoice = () => {
        setIsOpenCancelBooking(false);
    };

    return (
        <>
            <GButton onClick={handleBack} startIcon={<ArrowBackIosNew />}>
                Trở lại
            </GButton>
            <div className={cx("wrapper")}>
                <div className={cx("invoice-info-header")}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div className={cx("invoice-title")}>
                                <span className={cx("title")}>
                                    LỊCH HẸN #{currBooking?.id}
                                </span>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                            display={"flex"}
                            justifyContent={"flex-end"}
                            alignItems={"center"}
                        >
                            <div className={cx("button-list")}>
                                {currBooking?.status === 1 &&
                                    getBookingDetail?.length > 0 && (
                                        <>
                                            <GButton
                                                onClick={
                                                    handleOpenConfirmBooking
                                                }
                                                color={"success"}
                                            >
                                                Xác nhận
                                            </GButton>
                                        </>
                                    )}
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <BookingCustomerInfo
                    currBooking={currBooking}
                    currCustomerUser={currCustomerUser}
                />
                <BookingServiceInfo
                    currBooking={currBooking}
                    currCustomerUser={currCustomerUser}
                    currBookingCreator={currBookingCreator}
                />
                <BookingDetailList isEditting={isEditting} />
                <ConfirmPopup
                    isOpen={isOpenConfirmBooking}
                    handleOpen={handleOpenConfirmBooking}
                    handleClose={handleCloseConfirmBooking}
                    selectedBooking={{
                        booking_id: bookingId,
                        customer_name:
                            currCustomerUser?.last_name +
                            " " +
                            currCustomerUser?.first_name,
                    }}
                    currCustomerUser={currCustomerUser}
                />

                <CancelPopup
                    isOpen={isOpenCancelBooking}
                    handleOpen={handleOpenCancelBooking}
                    handleClose={handleCloseCancelInvoice}
                    selectedBooking={{
                        booking_id: bookingId,
                        customer_name:
                            currCustomerUser?.last_name +
                            " " +
                            currCustomerUser?.first_name,
                    }}
                />
                {/* <InvoiceDetailForm /> */}
            </div>
        </>
    );
}
