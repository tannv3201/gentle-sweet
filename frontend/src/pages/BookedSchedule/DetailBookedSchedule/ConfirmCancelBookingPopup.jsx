import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { updateBookingDetail } from "../../../redux/api/apiBookingDetail";
import ConfirmDeletePopup from "../../Admin/components/ConfirmDeletePopup";
import { GFormatDate } from "../../../components/GDatePicker/GDatePicker";
import { useParams } from "react-router-dom";
import { cancelBooking } from "../../../redux/api/apiBooking";

export default function ConfirmCancelBookingPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedBooking,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const { bookingId } = useParams();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleCancelBooking = () => {
        cancelBooking(user?.accessToken, dispatch, bookingId, axiosJWT).then(
            () => {
                handleClose();
            }
        );
    };

    return (
        <>
            <ConfirmDeletePopup
                title={"Hủy lịch đặt"}
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                confimQuestion1={
                    "Bạn cần đọc các điều khoản và chính sách về thay đổi/hủy lịch đặt."
                }
                confimQuestion2={"Bạn có chắc chắn muốn hủy lịch đặt "}
                deleteLabel={selectedBooking?.name}
                handleDelete={handleCancelBooking}
            />
        </>
    );
}
