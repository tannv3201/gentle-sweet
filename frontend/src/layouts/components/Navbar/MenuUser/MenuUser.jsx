import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import {
    ListAltRounded,
    LogoutRounded,
    Person,
    RecentActorsRounded,
    ShoppingCartRounded,
} from "@mui/icons-material";
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

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);

export default function MenuUser() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
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

    const handleNavigateCart = () => {
        navigate("/gio-hang");
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

    const handleNavigateSignUp = () => {
        navigate("/dang-ky");
        handleClose();
    };

    const handleNavigateAccount = () => {
        navigate("/tai-khoan");
        handleClose();
    };

    const handleNavigateBooked = () => {
        navigate("/quan-ly-lich-dat");
        handleClose();
    };
    return (
        <div>
            {currentUser ? (
                <>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <div className={cx("user-avatar")}>
                            {currentUser?.image_url ? (
                                <img src={currentUser?.image_url} alt="" />
                            ) : (
                                <img src={images?.user_vector} alt="" />
                            )}
                        </div>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <div className={cx("user-fullName")}>
                            <span
                                style={{
                                    paddingBottom: "8px",
                                    display: "block",
                                }}
                            >
                                {currentUser?.last_name +
                                    " " +
                                    currentUser?.first_name}
                            </span>
                        </div>
                        <MenuItem onClick={handleNavigateAccount}>
                            <Person />{" "}
                            <span className={cx("menu-label")}>Tài khoản</span>
                        </MenuItem>
                        {isMedium && (
                            <MenuItem onClick={handleNavigateCart}>
                                <ShoppingCartRounded />{" "}
                                <span className={cx("menu-label")}>
                                    Giỏ hàng
                                </span>
                            </MenuItem>
                        )}
                        <MenuItem onClick={handleNavigateBooked}>
                            <RecentActorsRounded />{" "}
                            <span className={cx("menu-label")}>Lịch đặt</span>
                        </MenuItem>
                        <MenuItem onClick={handleNavigatePurchaseOrder}>
                            <ListAltRounded />{" "}
                            <span className={cx("menu-label")}>Đơn mua</span>
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <LogoutRounded />
                            <span className={cx("menu-label")}> Đăng xuất</span>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <IconButton
                        title="Đăng nhập"
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                    >
                        <Person />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            "aria-labelledby": "basic-button",
                        }}
                    >
                        <MenuItem onClick={handleNavigateSignUp}>
                            Đăng ký
                        </MenuItem>
                        <MenuItem onClick={handleNavigateLogin}>
                            Đăng nhập
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
}
