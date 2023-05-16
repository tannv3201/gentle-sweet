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

export default function DeleteProductImage({
    handleClose,
    handleOpen,
    isOpen,
    selectedProductCategory,
}) {
    const { productId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleDeleteProductCategory = async () => {
        // await deleteImageInFolder(
        //     dispatch,
        //     selectedProductCategory?.image_url,
        //     user?.accessToken,
        //     axiosJWT
        // );
        await deleteImageInDB(
            productId,
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
