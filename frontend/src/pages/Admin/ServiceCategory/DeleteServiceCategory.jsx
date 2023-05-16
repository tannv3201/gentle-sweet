import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import { deleteServiceCategory } from "../../../redux/api/apiServiceCategory";

export default function DeleteServiceCategory({
    handleClose,
    handleOpen,
    isOpen,
    selectedProductCategory,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteProductCategory = () => {
        deleteServiceCategory(
            dispatch,
            selectedProductCategory.id,
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
                deleteQuestion="Bạn có chắc chắn muốn xóa danh mục"
                deleteLabel={selectedProductCategory?.name}
                handleDelete={handleDeleteProductCategory}
            />
        </>
    );
}
