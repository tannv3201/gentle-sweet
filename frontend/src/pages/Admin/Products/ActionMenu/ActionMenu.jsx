import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { PasswordRounded } from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./ActionMenu.module.scss";
import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

export default function ActionMenu({ selectedProduct }) {
    const navigate = useNavigate();

    const handleNavigateProductImage = (productId) => {
        navigate(`/admin/productImage/${productId}`);
    };

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
            <LightTooltip placement="bottom" title="Quản lý">
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
                    <span>Quản lý</span>
                </div>
                <MenuItem
                    onClick={() => {
                        handleOpenPasswordChangeModal();
                        handleClose();
                    }}
                >
                    Thông tin chi tiết
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleNavigateProductImage(selectedProduct?.id);
                        handleClose();
                    }}
                >
                    Quản lý hình ảnh
                </MenuItem>
            </Menu>
        </div>
    );
}
