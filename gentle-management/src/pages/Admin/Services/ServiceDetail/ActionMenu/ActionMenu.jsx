import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { PasswordRounded, ViewListRounded } from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./ActionMenu.module.scss";
import { LightTooltip } from "../../../../../components/GTooltip/GTooltip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscountSelectPopup from "../DiscountSelectPopup";
import GButton from "../../../../../components/MyButton/MyButton";
const cx = classNames.bind(styles);

export default function ActionMenu({ selectedProduct }) {
    const navigate = useNavigate();

    const handleNavigateServiceImage = (serviceId) => {
        navigate(`/serviceImage/${serviceId}/service`);
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Discount
    const [isOpenDiscountSelectPopup, setIsOpenDiscountSelectPopup] =
        useState(false);

    const handleOpenDiscountSelectPopup = (rowData) => {
        setIsOpenDiscountSelectPopup(true);
    };

    const handleCloseDiscountSelectPopup = () => {
        setIsOpenDiscountSelectPopup(false);
    };
    return (
        <div>
            <GButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<ViewListRounded />}
            >
                Quản lý
            </GButton>
            <Menu
                className={cx("basic-menu")}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {/* <div className={cx("menu-title")}>
                    <span>Quản lý</span>
                </div> */}
                <MenuItem
                    onClick={() => {
                        handleOpenDiscountSelectPopup();
                        handleClose();
                    }}
                >
                    Quản lý giảm giá
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleNavigateServiceImage(selectedProduct?.id);
                        handleClose();
                    }}
                >
                    Quản lý hình ảnh
                </MenuItem>
            </Menu>
            <DiscountSelectPopup
                isOpen={isOpenDiscountSelectPopup}
                handleOpen={handleOpenDiscountSelectPopup}
                handleClose={handleCloseDiscountSelectPopup}
                selectedProduct={{
                    id: selectedProduct?.id,
                    price: selectedProduct?.price,
                    discount_id: selectedProduct?.discount_id,
                }}
            />
        </div>
    );
}
