import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import GModal from "../../../../../common/GModal/GModal";
import GButton from "../../../../../components/MyButton/MyButton";
import { updateInvoice } from "../../../../../redux/api/apiInvoice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

function ConfirmCancelInvoicePopup({
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
                        Bạn có chắc chắn muốn hủy đơn hàng{" "}
                        <span
                            style={{
                                fontWeight: "var(--fw-semi-bold)",
                                color: "red",
                            }}
                        >
                            {`#${invoiceId}`}
                        </span>{" "}
                        ?
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <GButton color={"error"} onClick={handleCancelInvoice}>
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

export default ConfirmCancelInvoicePopup;
