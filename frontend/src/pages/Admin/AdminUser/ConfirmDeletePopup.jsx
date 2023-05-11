import React from "react";
import GButton from "../../../components/MyButton/MyButton";

import GModal from "../../../common/GModal/GModal";
import { deleteAdminUser } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";

function ConfirmDeletePopup({ handleClose, handleOpen, isOpen, selectedUser }) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleDeleteAdminUser = () => {
        deleteAdminUser(
            dispatch,
            selectedUser.id,
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
                        Bạn có chắc chắn muốn xóa người dùng{" "}
                        <span
                            style={{
                                fontWeight: "var(--fw-semi-bold)",
                                color: "red",
                            }}
                        >
                            {selectedUser?.username}
                        </span>{" "}
                        ?
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <GButton
                            color={"error"}
                            onClick={handleDeleteAdminUser}
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

export default ConfirmDeletePopup;
