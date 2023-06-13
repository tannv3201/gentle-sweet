import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import { deleteAdminUser } from "../../../redux/api/apiAdminUser";

export default function DeleteAdminUserPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteAdminUser = () => {
        deleteAdminUser(
            dispatch,
            selectedUser.id,
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
                deleteQuestion="Bạn có chắc chắn muốn xóa người dùng"
                deleteLabel={selectedUser?.fullName}
                handleDelete={handleDeleteAdminUser}
            />
        </>
    );
}
