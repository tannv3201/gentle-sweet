import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AutorenewRounded, PasswordRounded } from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./InvoiceStatusMenu.module.scss";

import { useState } from "react";
import GButton from "../../../../../components/MyButton/MyButton";
import CofirmCancelInvoicePopup from "./CofirmCancelInvoicePopup";
import { updateDelivery } from "../../../../../redux/api/apiDelivery";
import { createAxios } from "../../../../../createInstance";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../../../redux/slice/authSlice";
import { updateInvoice } from "../../../../../redux/api/apiInvoice";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const cx = classNames.bind(styles);

export default function InvoiceStatusMenu({ selectedUser }) {
    const { invoiceId } = useParams();
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const deliveryByInvoiceId = useSelector(
        (state) => state.delivery.delivery?.deliveryByInvoiceId
    );
    const getInvoice = useSelector((state) => state.invoice.invoice?.invoice);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [
        isOpenConfirmCancelInvoicePopup,
        setIsOpenConfirmCancelInvoicePopup,
    ] = useState(false);
    const handleOpenConfirmCancelInvoiceModal = () => {
        setIsOpenConfirmCancelInvoicePopup(true);
    };

    const handleCloseConfirmCancelInvoiceModal = () => {
        setIsOpenConfirmCancelInvoicePopup(false);
    };
    const handleChangeStatusProductWaiting = async () => {
        if (getInvoice?.status === 3) {
            return;
        } else {
            await updateInvoice(
                user?.accessToken,
                dispatch,
                invoiceId,
                { status: 3 },
                axiosJWT
            );
        }
    };

    const handleChangeStatusDelivering = async () => {
        if (getInvoice?.status === 4) {
            return;
        } else if (getInvoice?.status === 2) {
            toast.error("Vui lòng chuẩn bị hàng");
        } else if (!deliveryByInvoiceId?.delivery_unit) {
            toast.error("Vui lòng thêm thông tin vận chuyển");
        } else {
            await updateInvoice(
                user?.accessToken,
                dispatch,
                invoiceId,
                { status: 4 },
                axiosJWT
            );
        }
    };

    const handleChangeStatusDelivered = async () => {
        if (getInvoice?.status === 5) {
            return;
        } else if (getInvoice?.status === 2) {
            toast.error("Vui lòng chuẩn bị hàng");
        } else if (getInvoice?.status === 3) {
            toast.error("Vui tuân theo trình tự giao hàng");
        } else {
            await updateInvoice(
                user?.accessToken,
                dispatch,
                invoiceId,
                { status: 5 },
                axiosJWT
            );
        }
    };

    return (
        <div>
            <GButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<AutorenewRounded />}
                color={"info"}
            >
                Trạng thái
            </GButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <div className={cx("menu-title")}>
                    <span>Chuyển trạng thái</span>
                </div>
                <MenuItem
                    onClick={async () => {
                        await handleChangeStatusProductWaiting();
                        handleClose();
                    }}
                    disabled={getInvoice?.status > 2}
                >
                    Chờ lấy hàng
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        await handleChangeStatusDelivering();
                        handleClose();
                    }}
                    disabled={getInvoice?.status > 3}
                >
                    Đang vận chuyển
                </MenuItem>
                <MenuItem
                    onClick={async () => {
                        await handleChangeStatusDelivered();
                        handleClose();
                    }}
                >
                    Đã giao
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleOpenConfirmCancelInvoiceModal();
                        handleClose();
                    }}
                    disabled={getInvoice?.status > 3}
                >
                    Hủy
                </MenuItem>
            </Menu>
            <CofirmCancelInvoicePopup
                isOpen={isOpenConfirmCancelInvoicePopup}
                handleOpen={handleOpenConfirmCancelInvoiceModal}
                handleClose={handleCloseConfirmCancelInvoiceModal}
            />
        </div>
    );
}
