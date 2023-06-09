import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AutorenewRounded, PasswordRounded } from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./BookingStatusMenu.module.scss";

import { useState } from "react";
import GButton from "../../../../../components/MyButton/MyButton";
import CofirmCancelInvoicePopup from "./ConfirmCancelBookingRequestPopup";
import { updateDelivery } from "../../../../../redux/api/apiDelivery";
import { createAxios } from "../../../../../createInstance";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import { updateInvoice } from "../../../../../redux/api/apiInvoice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import ConfirmCancelBookingPopup from "./ConfirmCancelBookingPopup";
import { updateBooking } from "../../../../../redux/api/apiBooking";

const cx = classNames.bind(styles);

export default function BookingStatusMenu({ selectedUser }) {
    const { bookingId } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    const getBooking = useSelector((state) => state.booking.booking?.booking);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [
        isOpenConfirmCancelBookingPopup,
        setIsOpenConfirmCancelInvoicePopup,
    ] = useState(false);
    const handleOpenConfirmCancelBookingModal = () => {
        setIsOpenConfirmCancelInvoicePopup(true);
    };

    const handleCloseConfirmCancelBookingModal = () => {
        setIsOpenConfirmCancelInvoicePopup(false);
    };
    const handleChangeStatusProductWaiting = async () => {
        if (getBooking?.status === 3) {
            return;
        } else {
            await updateBooking(
                user?.accessToken,
                dispatch,
                bookingId,
                { status: 3 },
                axiosJWT
            );
        }
    };

    const handleChangeStatusDelivering = async () => {
        if (getBooking?.status === 4) {
            return;
        } else if (getBooking?.status === 2) {
            toast.error("Vui lòng lên kế hoạch lịch hẹn");
        } else {
            await updateBooking(
                user?.accessToken,
                dispatch,
                bookingId,
                { status: 4 },
                axiosJWT
            );
        }
    };

    const handleChangeStatusDelivered = async () => {
        if (getBooking?.status === 5) {
            return;
        } else if (getBooking?.status === 2) {
            toast.error("Vui lòng lên kế hoạch lịch hẹn");
        } else if (getBooking?.status === 3) {
            toast.error("Vui lòng tuân theo trình tự lịch hẹn");
        } else {
            await updateBooking(
                user?.accessToken,
                dispatch,
                bookingId,
                { status: 5 },
                axiosJWT
            );
        }
    };

    return (
        <div>
            <GButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<AutorenewRounded />}
                color={"info"}
            >
                Trạng thái
            </GButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <div className={cx("menu-title")}>
                    <span>Chuyển trạng thái</span>
                </div>
                <MenuItem
                    onClick={async () => {
                        await handleChangeStatusProductWaiting();
                        handleClose();
                    }}
                    disabled={getBooking?.status > 2}
                >
                    Đã lên lịch
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        await handleChangeStatusDelivering();
                        handleClose();
                    }}
                    disabled={getBooking?.status > 3}
                >
                    Bắt đầu dịch vụ
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        await handleChangeStatusDelivered();
                        handleClose();
                    }}
                >
                    Kết thúc dịch vụ
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleOpenConfirmCancelBookingModal();
                        handleClose();
                    }}
                    disabled={getBooking?.status > 3}
                >
                    Hủy
                </MenuItem>
            </Menu>
            <ConfirmCancelBookingPopup
                isOpen={isOpenConfirmCancelBookingPopup}
                handleOpen={handleOpenConfirmCancelBookingModal}
                handleClose={handleCloseConfirmCancelBookingModal}
            />
        </div>
    );
}
