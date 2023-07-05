import * as React from "react";
import Menu from "@mui/material/Menu";
import { IconButton } from "@mui/material";
import { ShoppingCartRounded } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { logoutSuccess } from "../../../../redux/slice/authSlice";
import styles from "./MenuCart.module.scss";
import classNames from "classnames/bind";
import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
import { getCartByUserId } from "../../../../redux/api/apiCart";
import { useEffect } from "react";

const cx = classNames.bind(styles);

export default function MenuCart() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    let axiosJWT = createAxios(currentUser, dispatch, logoutSuccess);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
    return (
        <div className={cx("wrapper")}>
            <NavLink to={currentUser ? "/gio-hang" : null}>
                {currentUser ? (
                    <LightTooltip placement="bottom" title="Giỏ hàng">
                        <IconButton style={{ userSelect: "none" }} size="large">
                            {/* <ShoppingCartRounded /> */}
                            <Badge
                                color="secondary"
                                badgeContent={cartList?.length}
                                max={99}
                            >
                                <ShoppingCartRounded />
                            </Badge>
                        </IconButton>
                    </LightTooltip>
                ) : (
                    <IconButton
                        title="Giỏ hàng"
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
