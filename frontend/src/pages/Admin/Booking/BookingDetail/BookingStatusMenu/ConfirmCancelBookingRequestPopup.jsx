import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import GModal from "../../../../../common/GModal/GModal";
import GButton from "../../../../../components/MyButton/MyButton";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../../../../redux/api/apiBooking";

function ConfirmCancelBookingRequestPopup({
    handleClose,
    handleOpen,
    isOpen,
    currBooking,
}) {
    const { bookingId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCancelInvoice = async () => {
        await updateBooking(
            user?.accessToken,
            dispatch,
            bookingId,
            { status: 6 },
            axiosJWT
        ).then(() => {
            toast.success("Hủy lịch hẹn thành công");
            handleClose();
        });
    };
    const handleRejectCancelInvoice = async () => {
        await updateBooking(
            user?.accessToken,
            dispatch,
            bookingId,
            { status: 3 },
            axiosJWT
        ).then(() => {
            toast.success("Từ chối hủy lịch hẹn");
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
                title="Yêu cầu hủy lịch hẹn"
            >
                <div>
                    <div style={{ padding: "12px 8px" }}>
                        <span style={{ fontWeight: "var(--fw-medium)" }}>
                            {" "}
                            {`Lý do hủy lịch hẹn #${bookingId}: `} <br />
                        </span>
                        <span
                            style={{
                                display: "block",
                                fontStyle: "italic",
                            }}
                        >
                            "{currBooking?.note}"
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

export default ConfirmCancelBookingRequestPopup;
