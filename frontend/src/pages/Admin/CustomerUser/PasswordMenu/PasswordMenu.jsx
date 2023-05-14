import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { PasswordRounded } from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./PasswordMenu.module.scss";

import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
import PasswordChangePopup from "./PasswordChangePopup";
import { useState } from "react";
import ConfirmResetPasswordPopup from "./ConfirmResetPasswordPopup";

const cx = classNames.bind(styles);

export default function PasswordMenu({ selectedCustomerUser }) {
    const [isOpenPasswordChangeModal, setIsOpenPasswordChangeModal] =
        useState(false);
    const [isOpenResetPasswordPopup, setIsOpenResetPasswordPopup] =
        useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenPasswordChangeModal = () => {
        setIsOpenPasswordChangeModal(true);
    };

    const handleClosePasswordChangeModal = () => {
        setIsOpenPasswordChangeModal(false);
    };

    const handleOpenResetPasswordPopup = () => {
        setIsOpenResetPasswordPopup(true);
    };

    const handleCloseResetPasswordPopup = () => {
        setIsOpenResetPasswordPopup(false);
    };

    return (
        <div>
            <LightTooltip placement="bottom" title="Mật khẩu">
                <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <PasswordRounded />
                </IconButton>
            </LightTooltip>
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
                    <span>Mật khẩu</span>
                </div>
                <MenuItem
                    onClick={() => {
                        handleOpenPasswordChangeModal();
                        handleClose();
                    }}
                >
                    Đổi mật khẩu
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleOpenResetPasswordPopup();
                        handleClose();
                    }}
                >
                    Reset
                </MenuItem>
            </Menu>

            <PasswordChangePopup
                isOpen={isOpenPasswordChangeModal}
                handleClose={handleClosePasswordChangeModal}
                handleOpen={handleOpenPasswordChangeModal}
                selectedCustomerUser={selectedCustomerUser}
            />

            <ConfirmResetPasswordPopup
                isOpen={isOpenResetPasswordPopup}
                handleClose={handleCloseResetPasswordPopup}
                handleOpen={handleOpenResetPasswordPopup}
                selectedCustomerUser={selectedCustomerUser}
            />
        </div>
    );
}
