import React from "react";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { deleteInvoiceDetail } from "../../../../redux/api/apiInvoiceDetail";

function ConfirmDeleteProduct({
    handleClose,
    handleOpen,
    isOpen,
    selectedProduct,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteService = () => {
        deleteInvoiceDetail(
            dispatch,
            selectedProduct?.id,
            selectedProduct?.invoice_id,
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
                deleteLabel={selectedProduct?.product_name}
                handleDelete={handleDeleteService}
            />
        </>
    );
}

export default ConfirmDeleteProduct;
