import React from "react";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { deleteInvoiceDetail } from "../../../../redux/api/apiInvoiceDetail";
import { deleteBookingDetail } from "../../../../redux/api/apiBookingDetail";

export default function ConfirmDeleteService({
    handleClose,
    handleOpen,
    isOpen,
    selectedService,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteService = () => {
        deleteBookingDetail(
            dispatch,
            selectedService?.id,
            selectedService?.booking_id,
            user?.accessToken,
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
                deleteQuestion="Bạn có chắc chắn muốn xóa dịch vụ"
                deleteLabel={selectedService?.service_name}
                handleDelete={handleDeleteService}
            />
        </>
    );
}
