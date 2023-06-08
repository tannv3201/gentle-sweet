import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import GModal from "../../../../../common/GModal/GModal";
import GButton from "../../../../../components/MyButton/MyButton";
import { updateInvoice } from "../../../../../redux/api/apiInvoice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function ConfirmRejectCancelInvoicePopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedUser,
}) {
    const { invoiceId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

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
                title="Xác nhận"
            >
                <div>
                    <div style={{ padding: "12px 0" }}>
                        Bạn có muốn từ chối hủy đơn hàng{" "}
                        <span
                            style={{
                                fontWeight: "var(--fw-semi-bold)",
                                color: "red",
                            }}
                        >
                            {`#${invoiceId}`}
                        </span>{" "}
                        không ?
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <GButton
                            color={"error"}
                            onClick={handleRejectCancelInvoice}
                        >
                            Xác nhận
                        </GButton>
                        <GButton
                            color={"text"}
                            style={{ marginLeft: "12px" }}
                            onClick={handleClose}
                        >
                            Hủy
                        </GButton>
                    </div>
                </div>
            </GModal>
        </>
    );
}

export default ConfirmRejectCancelInvoicePopup;
