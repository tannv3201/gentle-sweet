import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Badge, IconButton } from "@mui/material";
import GButton from "../../../../components/MyButton/MyButton";
import { LightTooltip } from "../../../../components/GTooltip/GTooltip";

import {
    ExpandMoreRounded,
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
import { useEffect } from "react";
import { getCartByUserId } from "../../../../redux/api/apiCart";
const cx = classNames.bind(styles);

export default function MenuUser() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, logoutSuccess);
    const accessToken = currentUser?.accessToken;

    const cartList = useSelector((state) => state.cart.cart?.cartList);

    useEffect(() => {
        if (currentUser && cartList?.length === 0) {
            getCartByUserId(
                currentUser?.accessToken,
                dispatch,
                currentUser?.id,
                axiosJWT
            );
        }
    }, [currentUser?.id]);

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
        await logout(
            dispatch,
            currentUser,
            navigate,
            accessToken,
            axiosJWT
        ).then(() => handleClose());
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

    const handleNavigateForgotPassword = () => {
        navigate("/quen-mat-khau");
        handleClose();
    };

    const nameAvatar =
        currentUser?.first_name?.charAt(0) + currentUser?.last_name?.charAt(0);

    const fullName =
        currentUser?.first_name + " " + currentUser?.last_name?.split(" ")[0];

    return (
        <div>
            {currentUser ? (
                <>
                    <LightTooltip placement="bottom" title="Tài khoản">
                        {!isSmall ? (
                            <div
                                aria-controls={open ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                onClick={handleClick}
                                className={cx("user-wrapper")}
                            >
                                <div className={cx("user-avatar")}>
                                    {currentUser?.image_url ? (
                                        <img
                                            src={currentUser?.image_url}
                                            alt=""
                                        />
                                    ) : (
                                        <span className={cx("name-avatar")}>
                                            {nameAvatar}
                                        </span>
                                    )}
                                </div>
                                <span className={cx("fullName")}>
                                    <span>{fullName}</span>
                                    <ExpandMoreRounded />
                                </span>
                            </div>
                        ) : (
                            <IconButton onClick={handleNavigateCart}>
                                <Badge
                                    color="secondary"
                                    badgeContent={cartList?.length}
                                    max={99}
                                >
                                    <ShoppingCartRounded />
                                </Badge>
                            </IconButton>
                        )}
                    </LightTooltip>
                    {!isSmall && (
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {isSmall ? (
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
                            ) : (
                                <div></div>
                            )}
                            {currentUser?.role_name === "CUSTOMER" && (
                                <MenuItem onClick={handleNavigateAccount}>
                                    <Person />{" "}
                                    <span className={cx("menu-label")}>
                                        Tài khoản
                                    </span>
                                </MenuItem>
                            )}
                            {isMedium &&
                                currentUser?.role_name === "CUSTOMER" && (
                                    <MenuItem onClick={handleNavigateCart}>
                                        <ShoppingCartRounded />{" "}
                                        <span className={cx("menu-label")}>
                                            Giỏ hàng
                                        </span>
                                    </MenuItem>
                                )}
                            {currentUser?.role_name === "CUSTOMER" && (
                                <MenuItem onClick={handleNavigateBooked}>
                                    <RecentActorsRounded />{" "}
                                    <span className={cx("menu-label")}>
                                        Lịch hẹn
                                    </span>
                                </MenuItem>
                            )}
                            {currentUser?.role_name === "CUSTOMER" && (
                                <MenuItem onClick={handleNavigatePurchaseOrder}>
                                    <ListAltRounded />{" "}
                                    <span className={cx("menu-label")}>
                                        Đơn hàng
                                    </span>
                                </MenuItem>
                            )}
                            <MenuItem onClick={handleLogout}>
                                <LogoutRounded />
                                <span className={cx("menu-label")}>
                                    {" "}
                                    Đăng xuất
                                </span>
                            </MenuItem>
                        </Menu>
                    )}
                </>
            ) : (
                <>
                    <GButton
                        title="Tài khoản"
                        className={cx("account-btn")}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        size="small"
                    >
                        Tài khoản
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
                        <MenuItem onClick={handleNavigateSignUp}>
                            Đăng ký
                        </MenuItem>
                        <MenuItem onClick={handleNavigateLogin}>
                            Đăng nhập
                        </MenuItem>
                        <MenuItem onClick={handleNavigateForgotPassword}>
                            Quên mật khẩu
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
}
