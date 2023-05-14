import React from "react";
import GButton from "../../../../components/MyButton/MyButton";
import GModal from "../../../../common/GModal/GModal";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { resetPassword } from "../../../../redux/api/apiCustomerUser";

function ConfirmResetPasswordPopup({
    handleClose,
    handleOpen,
    isOpen,
    selectedCustomerUser,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleResetPassword = () => {
        resetPassword(
            dispatch,
            selectedCustomerUser?.id,
            user?.accessToken,
            axiosJWT
        ).then(() => {
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
                        Bạn có chắc chắn muốn reset mật khẩu của{" "}
                        <span
                            style={{
                                fontWeight: "var(--fw-semi-bold)",
                                color: "red",
                            }}
                        >
                            {selectedCustomerUser?.fullName}
                        </span>{" "}
                        ?
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <GButton color={"error"} onClick={handleResetPassword}>
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

export default ConfirmResetPasswordPopup;
