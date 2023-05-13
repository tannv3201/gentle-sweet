import React from "react";
import GButton from "../../../components/MyButton/MyButton";

import GModal from "../../../common/GModal/GModal";
import { deleteProductCategory } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";

export default function DeleteProductCategory({
    handleClose,
    handleOpen,
    isOpen,
    selectedProductCategory,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteProductCategory = () => {
        deleteProductCategory(
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
