import React from "react";
import ConfirmDeletePopup from "../../../components/ConfirmDeletePopup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import { deleteInvoiceDetail } from "../../../../../redux/api/apiInvoiceDetail";
import {
    confirmInvoice,
    updateInvoice,
} from "../../../../../redux/api/apiInvoice";

export default function ConfirmPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedInvoice,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleConfirmInvoice = () => {
        confirmInvoice(
            user?.accessToken,
            dispatch,
            selectedInvoice?.invoice_id,
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
                deleteQuestion="Bạn có muốn xác nhận hóa đơn của khách hàng"
                deleteLabel={selectedInvoice?.customer_name}
                handleDelete={handleConfirmInvoice}
            />
        </>
    );
}
