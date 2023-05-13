import React from "react";

import { deleteProduct } from "../../../redux/api/apiProduct";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import ConfirmDeletePopup from "../components/ConfirmDeletePopup";

export default function DeleteProduct({
    handleClose,
    handleOpen,
    isOpen,
    selectedProduct,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteProduct = () => {
        deleteProduct(
            dispatch,
            selectedProduct.id,
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
                deleteQuestion="Bạn có chắc chắn muốn xóa sản phẩm"
                deleteLabel={selectedProduct?.name}
                handleDelete={handleDeleteProduct}
            />
        </>
    );
}
