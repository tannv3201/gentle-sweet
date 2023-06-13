import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../../createInstance";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import GModal from "../../../../../common/GModal/GModal";
import GButton from "../../../../../components/MyButton/MyButton";
import { updateInvoice } from "../../../../../redux/api/apiInvoice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../../../../redux/api/apiBooking";

function ConfirmCancelBookingPopup({
    handleClose,
    handleOpen,
    isOpen,
    currInvoice,
}) {
    const { bookingId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCancelBooking = async () => {
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
                        Bạn có chắc chắn muốn hủy lịch hẹn{" "}
                        <span
                            style={{
                                fontWeight: "var(--fw-semi-bold)",
                                color: "red",
                            }}
                        >
                            {`#${bookingId}`}
                        </span>{" "}
                        ?
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <GButton color={"error"} onClick={handleCancelBooking}>
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

export default ConfirmCancelBookingPopup;
