import React, { useEffect, useState } from "react";
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
import { toast } from "react-hot-toast";

export default function ConfirmPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedInvoice,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [deliveryClone, setDeliveryClone] = useState({});
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    useEffect(() => {
        if (deliveryByInvoiceId) {
            setDeliveryClone(deliveryByInvoiceId);
        }
    }, [deliveryByInvoiceId]);
    const handleConfirmInvoice = async () => {
        if (deliveryClone?.status === 404) {
            toast.error("Vui lòng nhập thông tin khách hàng");
            handleClose();
        } else {
            await confirmInvoice(
                user?.accessToken,
                dispatch,
                selectedInvoice?.invoice_id,
                axiosJWT
            ).then(() => {
                handleClose();
            });
        }
    };
    return (
        <>
            <ConfirmDeletePopup
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                deleteQuestion="Bạn có muốn xác nhận đơn hàng của khách hàng"
                deleteLabel={selectedInvoice?.customer_name}
                handleDelete={handleConfirmInvoice}
            />
        </>
    );
}
