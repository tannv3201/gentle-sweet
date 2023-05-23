import React from "react";
import ConfirmDeletePopup from "../../../components/ConfirmDeletePopup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";

import { confirmBooking } from "../../../../../redux/api/apiBooking";

export default function ConfirmPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedBooking,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleConfirmBooking = () => {
        confirmBooking(
            user?.accessToken,
            dispatch,
            selectedBooking?.booking_id,
            axiosJWT
        ).then(() => {
            handleClose();
        });
    };
    return (
        <>
            <ConfirmDeletePopup
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                deleteQuestion="Bạn có muốn xác nhận hóa đơn của khách hàng"
                deleteLabel={selectedBooking?.customer_name}
                handleDelete={handleConfirmBooking}
            />
        </>
    );
}
