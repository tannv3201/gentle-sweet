import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FilterListRounded } from "@mui/icons-material";

import classNames from "classnames/bind";
import styles from "./FilterInvoice.module.scss";
import { useState } from "react";
import GButton from "../../../../components/MyButton/MyButton";
import { getAllInvoiceByStatus } from "../../../../redux/api/apiInvoice";
import { createAxios } from "../../../../createInstance";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { toast } from "react-hot-toast";
import { getAllCustomerUser } from "../../../../redux/api/apiCustomerUser";
const cx = classNames.bind(styles);

export default function InvoiceClassification({ isFiltering, handleFilter }) {
    const dispatch = useDispatch();

    const [selectedInvoice, setSelectedInvoice] = useState({});

    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Discount
    const handleFindInvoiceByAllStatus = () => {
        handleFilter(false);
        handleClose();
    };

    const handleFindInvoiceByStatus1 = async () => {
        handleFilter(true);
        getAllInvoiceByStatus(1, user?.accessToken, dispatch, axiosJWT).then(
            () => handleClose()
        );
    };

    const handleFindInvoiceByStatus2 = async () => {
        handleFilter(true);
        getAllInvoiceByStatus(2, user?.accessToken, dispatch, axiosJWT).then(
            () => handleClose()
        );
    };

    const handleFindInvoiceByStatus3 = async () => {
        handleFilter(true);
        getAllInvoiceByStatus(3, user?.accessToken, dispatch, axiosJWT).then(
            () => handleClose()
        );
    };
    const handleFindInvoiceByStatus4 = async () => {
        handleFilter(true);
        getAllInvoiceByStatus(4, user?.accessToken, dispatch, axiosJWT).then(
            () => handleClose()
        );
    };

    return (
        <div className={cx("invoice-classification-wrapper")}>
            <GButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                startIcon={<FilterListRounded />}
            >
                Phân loại hóa đơn
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
                    className={cx("menu-item")}
                    onClick={handleFindInvoiceByAllStatus}
                >
                    Tất cả
                </MenuItem>
                <MenuItem
                    className={cx("menu-item")}
                    onClick={handleFindInvoiceByStatus1}
                >
                    Chờ tiếp nhận
                </MenuItem>
                <MenuItem
                    className={cx("menu-item")}
                    onClick={handleFindInvoiceByStatus2}
                >
                    Đã tiếp nhận
                </MenuItem>
                <MenuItem
                    className={cx("menu-item")}
                    onClick={handleFindInvoiceByStatus3}
                >
                    Đang giao hàng
                </MenuItem>
                <MenuItem
                    className={cx("menu-item")}
                    onClick={handleFindInvoiceByStatus4}
                >
                    Đã giao hàng
                </MenuItem>
            </Menu>
        </div>
    );
}