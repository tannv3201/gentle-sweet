import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import { deleteAdminUser } from "../../../redux/api/apiAdminUser";
import { deleteCustomerUser } from "../../../redux/api/apiCustomerUser";

export default function DeleteCustomerUser({
    handleClose,
    handleOpen,
    isOpen,
    selectedCustomerUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteCustomerUser = () => {
        deleteCustomerUser(
            dispatch,
            selectedCustomerUser.id,
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
                deleteQuestion="Bạn có chắc chắn muốn xóa khách hàng"
                deleteLabel={selectedCustomerUser?.fullName}
                handleDelete={handleDeleteCustomerUser}
            />
        </>
    );
}
