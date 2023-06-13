import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import { deleteService } from "../../../redux/api/apiService";

export default function DeleteBookingPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedService,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteService = () => {
        deleteService(
            dispatch,
            selectedService.id,
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
                deleteLabel={selectedService?.name}
                handleDelete={handleDeleteService}
            />
        </>
    );
}
