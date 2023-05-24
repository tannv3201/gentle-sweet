import * as React from "react";
import Menu from "@mui/material/Menu";
import { IconButton } from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../../../../redux/api/apiAuth";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { logoutSuccess } from "../../../../redux/slice/authSlice";
import styles from "./MenuCart.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function MenuCart() {
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
    const handleLogout = async () => {
        await logout(dispatch, id, navigate, accessToken, axiosJWT).then(() =>
            handleClose()
        );
    };

    return (
        <div>
            <NavLink to={currentUser ? "/gio-hang" : null}>
                {currentUser ? (
                    <IconButton
                        style={{ userSelect: "none" }}
                        title="Giỏ hàng"
                        size="large"
                    >
                        <ShoppingCartRounded />
                    </IconButton>
                ) : (
                    <IconButton
                        style={{ userSelect: "none" }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <ShoppingCartRounded />
                    </IconButton>
                )}
            </NavLink>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <div className={cx("popup")}>
                    <span> Bạn cần đăng nhập để truy cập giỏ hàng.</span>
                    <NavLink to={"/dang-nhap"} className={cx("login")}>
                        Đăng nhập ngay!
                    </NavLink>
                </div>
            </Menu>
        </div>
    );
}
