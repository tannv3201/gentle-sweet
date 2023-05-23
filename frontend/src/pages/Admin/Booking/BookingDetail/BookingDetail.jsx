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
        setCurrBooking(structuredClone(getBooking));
    }, [getBooking]);

    useEffect(() => {
        setCurrBooking(structuredClone(getBooking));
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
                                    THÔNG TIN LỊCH HẸN
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
                                            <GButton
                                                onClick={
                                                    handleOpenCancelBooking
                                                }
                                                color={"error"}
                                            >
                                                Hủy
                                            </GButton>
                                        </>
                                    )}
                                {!isEditting ? (
                                    <GButton
                                        onClick={() => setIsEditting(true)}
                                        startIcon={<ModeEditOutlineRounded />}
                                        color={"info"}
                                    >
                                        Chỉnh sửa
                                    </GButton>
                                ) : (
                                    <GButton
                                        onClick={() => setIsEditting(false)}
                                        startIcon={<ModeEditOutlineRounded />}
                                        color={"success"}
                                    >
                                        Lưu lại
                                    </GButton>
                                )}
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={cx("invoice-info-body")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Khách hàng:{" "}
                                        </span>
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        >
                                            {currCustomerUser?.last_name +
                                                " " +
                                                currCustomerUser?.first_name}
                                        </span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Trạng thái:{" "}
                                        </span>
                                        {currBooking?.status === 5 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "cancel"
                                                )}
                                            >
                                                Đã hủy
                                            </span>
                                        ) : currBooking?.status === 1 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "pending"
                                                )}
                                            >
                                                Chờ xác nhận
                                            </span>
                                        ) : currBooking?.status === 2 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "received"
                                                )}
                                            >
                                                Đã đã xác nhận
                                            </span>
                                        ) : currBooking?.status === 3 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "delivering"
                                                )}
                                            >
                                                Đang giao hàng
                                            </span>
                                        ) : currBooking?.status === 4 ? (
                                            <span
                                                className={cx(
                                                    "invoice-info-content",
                                                    "delivered"
                                                )}
                                            >
                                                Giao hàng thành công
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Ngày tạo:{" "}
                                        </span>
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        >
                                            {dayjs(
                                                currBooking?.created_at
                                            ).format("DD/MM/YYYY")}
                                        </span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <span
                                            className={cx("invoice-info-label")}
                                        >
                                            Người tạo:{" "}
                                        </span>
                                        <span
                                            className={cx(
                                                "invoice-info-content"
                                            )}
                                        >
                                            {currBooking?.customer_user_id
                                                ? `STAFF - ${
                                                      currBookingCreator?.last_name +
                                                      " " +
                                                      currBookingCreator?.first_name
                                                  }`
                                                : `CUSTOMER - ${currCustomerUser?.last_name} ${currCustomerUser?.first_name}`}
                                        </span>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <BookingDetailList isEditting={isEditting} />
                <ConfirmPopup
                    isOpen={isOpenConfirmBooking}
                    handleOpen={handleOpenConfirmBooking}
                    handleClose={handleCloseConfirmBooking}
                    selectedInvoice={{
                        invoice_id: bookingId,
                        customer_name:
                            currCustomerUser?.last_name +
                            " " +
                            currCustomerUser?.first_name,
                    }}
                />

                <CancelPopup
                    isOpen={isOpenCancelBooking}
                    handleOpen={handleOpenCancelBooking}
                    handleClose={handleCloseCancelInvoice}
                    selectedInvoice={{
                        invoice_id: bookingId,
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
