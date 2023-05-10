import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { Person, PasswordRounded } from "@mui/icons-material";
import images from "../../../../assets/images";
import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./PasswordMenu.module.scss";

import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
import PasswordChangePopup from "./PasswordChangePopup";
import { useState } from "react";

const cx = classNames.bind(styles);

export default function PasswordMenu({ selectedUser }) {
    const [isOpenPasswordChangeModal, setIsOpenPasswordChangeModal] =
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
                <MenuItem onClick={handleClose}>Reset</MenuItem>
            </Menu>

            <PasswordChangePopup
                isOpen={isOpenPasswordChangeModal}
                handleClose={handleClosePasswordChangeModal}
                handleOpen={handleOpenPasswordChangeModal}
                selectedUser={selectedUser}
            />
        </div>
    );
}
