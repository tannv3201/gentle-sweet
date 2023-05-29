import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { updateBookingDetail } from "../../../redux/api/apiBookingDetail";
import ConfirmDeletePopup from "../../Admin/components/ConfirmDeletePopup";
import { GFormatDate } from "../../../components/GDatePicker/GDatePicker";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ConfirmUpdateBookingPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedBookingDetail,
    isEditting,
    setIsEditting,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const { bookingId } = useParams();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleUpdateBooking = () => {
        const { booking_detail_id, start_time, end_time, date, description } =
            selectedBookingDetail;

        const dataUpdate = {
            start_time: start_time,
            end_time: end_time,
            description: description,
            date: GFormatDate(date, "YYYY-MM-DD"),
        };
        updateBookingDetail(
            user?.accessToken,
            dispatch,
            booking_detail_id,
            bookingId,
            dataUpdate,
            axiosJWT
        ).then(() => {
            handleClose();
            setIsEditting(!isEditting);
        });
    };

    return (
        <>
            <ConfirmDeletePopup
                title={"Cập nhật lịch đặt"}
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                confimQuestion1={
                    "Bạn cần đọc các điều khoản và chính sách về thay đổi/hủy lịch đặt."
                }
                confimQuestion2={"Bạn có chắc chắn muốn thay đổi lịch đặt "}
                deleteLabel={selectedBookingDetail?.service_name}
                handleDelete={handleUpdateBooking}
            />
        </>
    );
}
