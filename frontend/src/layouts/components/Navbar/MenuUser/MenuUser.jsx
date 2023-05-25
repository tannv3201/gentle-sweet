import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import images from "../../../../assets/images";
import classNames from "classnames/bind";
import styles from "./MenuUser.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../../../redux/api/apiAuth";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { logoutSuccess } from "../../../../redux/slice/authSlice";
import { resetApp } from "../../../../redux/store";

const cx = classNames.bind(styles);

export default function MenuUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, logoutSuccess);
    const accessToken = currentUser?.accessToken;
    const id = currentUser?.id;

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleNavigatePurchaseOrder = () => {
        navigate("/don-mua");
        handleClose();
    };
    const handleLogout = async () => {
        await logout(dispatch, id, navigate, accessToken, axiosJWT).then(() =>
            handleClose()
        );
    };

    const handleNavigateLogin = () => {
        navigate("/dang-nhap");
        handleClose();
    };

    return (
        <div>
            {currentUser ? (
                <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <div className={cx("user-avatar")}>
                        {currentUser?.image ? (
                            <img src={currentUser?.image} alt="" />
                        ) : (
                            <img src={images?.user_vector} alt="" />
                        )}
                    </div>
                </IconButton>
            ) : (
                <IconButton title="Đăng nhập" onClick={handleNavigateLogin}>
                    <Person />
                </IconButton>
            )}
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
                    <span>{currentUser?.username}</span>
                </div>
                <MenuItem onClick={handleNavigatePurchaseOrder}>
                    Đơn mua
                </MenuItem>
                <MenuItem onClick={handleClose}>Tài khoản</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
        </div>
    );
}
