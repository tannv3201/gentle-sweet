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

export default function ActionMenu({ selectedService }) {
    const navigate = useNavigate();

    const handleNavigateProductImage = (serviceId) => {
        navigate(`/admin/serviceImage/${serviceId}/service`);
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                        handleClose();
                    }}
                >
                    Thông tin chi tiết
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleNavigateProductImage(selectedService?.id);
                        handleClose();
                    }}
                >
                    Quản lý hình ảnh
                </MenuItem>
            </Menu>
        </div>
    );
}
