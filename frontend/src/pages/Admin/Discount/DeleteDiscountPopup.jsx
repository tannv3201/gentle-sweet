import React from "react";

import { deleteProductCategory } from "../../../redux/api/apiProductCategory";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";

export default function DeleteDiscountPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedDiscount,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteProductCategory = () => {
        deleteProductCategory(
            dispatch,
            selectedDiscount.id,
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
                deleteLabel={selectedDiscount?.name}
                handleDelete={handleDeleteProductCategory}
            />
        </>
    );
}
