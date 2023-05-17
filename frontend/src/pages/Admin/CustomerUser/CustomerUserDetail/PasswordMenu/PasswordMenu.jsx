import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PasswordRounded } from "@mui/icons-material";
import classNames from "classnames/bind";
import styles from "./PasswordMenu.module.scss";

import { LightTooltip } from "../../../../../components/GTooltip/GTooltip";
import PasswordChangePopup from "./PasswordChangePopup";
import { useState } from "react";
import ConfirmResetPasswordPopup from "./ConfirmResetPasswordPopup";
import GButton from "../../../../../components/MyButton/MyButton";

const cx = classNames.bind(styles);

export default function PasswordMenu({ selectedUser }) {
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
            <GButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<PasswordRounded />}
                color={"error"}
            >
                Mật khẩu
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
                selectedUser={selectedUser}
            />

            <ConfirmResetPasswordPopup
                isOpen={isOpenResetPasswordPopup}
                handleClose={handleCloseResetPasswordPopup}
                handleOpen={handleOpenResetPasswordPopup}
                selectedUser={selectedUser}
            />
        </div>
    );
}
