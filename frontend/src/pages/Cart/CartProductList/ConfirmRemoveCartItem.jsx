import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { deleteCart } from "../../../redux/api/apiCart";
import ConfirmDeletePopup from "../../../components/ConfirmDeletePopup/ConfirmDeletePopup";
import { toast } from "react-hot-toast";

export default function ConfirmRemoveCartItem({
    handleClose,
    handleOpen,
    isOpen,
    selectedCartItem,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleRemoveCartItem = () => {
        deleteCart(
            user?.accessToken,
            dispatch,
            selectedCartItem?.id,
            user?.id,
            axiosJWT
        ).then((res) => {
            handleClose();
            if (res?.status === 200) {
                toast.success("Xóa sản phẩm thành công");
            } else {
                toast.error("Có lỗi xảy ra");
            }
        });
    };

    return (
        <>
            <ConfirmDeletePopup
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                deleteQuestion="Bạn có muốn xóa sản phẩm"
                deleteLabel={selectedCartItem?.product_name}
                handleDelete={handleRemoveCartItem}
            />
        </>
    );
}
