import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import GModal from "../../../../../common/GModal/GModal";
import GButton from "../../../../../components/MyButton/MyButton";
import { updateInvoice } from "../../../../../redux/api/apiInvoice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function ConfirmCancelInvoiceRequestPopup({
    handleClose,
    handleOpen,
    isOpen,
    currInvoice,
}) {
    const { invoiceId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCancelInvoice = async () => {
        await updateInvoice(
            user?.accessToken,
            dispatch,
            invoiceId,
            { status: 6 },
            axiosJWT
        ).then(() => {
            toast.success("Hủy đơn hàng thành công");
            handleClose();
        });
    };
    const handleRejectCancelInvoice = async () => {
        await updateInvoice(
            user?.accessToken,
            dispatch,
            invoiceId,
            { status: 3 },
            axiosJWT
        ).then(() => {
            toast.success("Từ chối hủy đơn hàng");
            handleClose();
        });
    };
    return (
        <>
            <GModal
                handleClose={() => {
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Yêu cầu hủy đơn hàng"
            >
                <div>
                    <div style={{ padding: "12px 8px" }}>
                        <span style={{ fontWeight: "var(--fw-medium)" }}>
                            {" "}
                            {`Lý do hủy đơn hàng #${invoiceId}: `} <br />
                        </span>
                        <span
                            style={{
                                display: "block",
                                fontStyle: "italic",
                            }}
                        >
                            "{currInvoice?.note}"
                        </span>
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <GButton
                            color={"success"}
                            onClick={handleCancelInvoice}
                        >
                            Đồng ý
                        </GButton>
                        <GButton
                            color={"error"}
                            style={{ marginLeft: "12px" }}
                            onClick={handleRejectCancelInvoice}
                        >
                            Từ chối
                        </GButton>
                    </div>
                </div>
            </GModal>
        </>
    );
}

export default ConfirmCancelInvoiceRequestPopup;
