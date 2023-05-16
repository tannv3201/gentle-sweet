import React from "react";

import { deleteProductCategory } from "../../../redux/api/apiProductCategory";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";
import {
    deleteImageInDB,
    deleteImageInFolder,
} from "../../../redux/api/apiProductImage";
import { useParams } from "react-router-dom";
import { deleteServiceImage } from "../../../redux/api/apiServiceImage";

export default function DeleteServiceImagePopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedProductCategory,
}) {
    const { serviceId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleDeleteProductCategory = async () => {
        await deleteServiceImage(
            serviceId,
            dispatch,
            selectedProductCategory?.id,
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
                deleteQuestion="Bạn có chắc chắn muốn xóa ảnh này"
                // deleteLabel={selectedProductCategory?.name}
                handleDelete={handleDeleteProductCategory}
            />
        </>
    );
}
