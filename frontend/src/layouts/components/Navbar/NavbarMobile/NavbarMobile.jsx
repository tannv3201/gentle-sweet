/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useState } from "react";
import styles from "./NavbarMobile.module.scss";
import classNames from "classnames/bind";
import { Grid, IconButton, SwipeableDrawer } from "@mui/material";
import images from "../../../../assets/images";
import {
    CloseRounded,
    DateRangeRounded,
    EditRounded,
    ExpandMore,
    HeadsetMicRounded,
    ListAltRounded,
    LogoutRounded,
    Person,
    PhoneInTalkRounded,
    RecentActorsRounded,
    ReorderRounded,
    SearchRounded,
} from "@mui/icons-material";

import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import { MenuList } from "../navigation";
import MenuUser from "../MenuUser/MenuUser";
import NavbarMenu from "./NavbarMenu/NavbarMenu";
import { useSelector } from "react-redux";
import GButton from "../../../../components/MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../../redux/api/apiAuth";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { logoutSuccess } from "../../../../redux/slice/authSlice";

function NavbarMobile() {
    const cx = classNames.bind(styles);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const user = useSelector((state) => state.auth.login?.currentUser);

    const toggleDrawer = useCallback(
        () => setIsOpenDrawer((prevOpen) => !prevOpen),
        [setIsOpenDrawer]
    );

    const nameAvatar = user?.first_name?.charAt(0) + user?.last_name?.charAt(0);
    const navigate = useNavigate();

    const handleNavigateAccount = () => {
        navigate("/tai-khoan");
        setIsOpenDrawer(false);
    };
    const handleNavigateOrderPurchase = () => {
        navigate("/don-mua");
        setIsOpenDrawer(false);
    };
    const handleNavigateBooked = () => {
        navigate("/quan-ly-lich-dat");
        setIsOpenDrawer(false);
    };
    const dispatch = useDispatch();

    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    const handleLogout = async () => {
        await logout(
            dispatch,
            user,
            navigate,
            user?.accessToken,
            axiosJWT
        ).then(() => setIsOpenDrawer(false));
    };

    return (
        <div className={cx("wrapper")}>
            <React.Fragment>
                <div className={cx("navbar-mobile-wrapper")}>
                    <IconButton
                        className={cx("navbar-mobile-button")}
                        onClick={toggleDrawer}
                        size="large"
                    >
                        <ReorderRounded fontSize="large" />
                    </IconButton>
                    <div className={cx("navbar-mobile-content")}>
                        <a href="/" className={cx("navbar-mobile-logo")}>
                            <img src={images.logo} alt="" />
                        </a>
                    </div>
                    <MenuUser />
                </div>
                <SwipeableDrawer
                    anchor={"left"}
                    open={isOpenDrawer}
                    onOpen={toggleDrawer}
                    onClose={toggleDrawer}
                >
                    <div className={cx("navbar-left")}>
                        <div className={cx("navbar-header")}>
                            <a href="/" className={cx("navbar-logo")}>
                                <img src={images.logo} alt="" />
                            </a>
                            <IconButton
                                className={cx("navbar-button")}
                                onClick={toggleDrawer}
                                size="large"
                            >
                                <CloseRounded fontSize="large" />
                            </IconButton>
                        </div>
                        <div className={cx("navbar-body")}>
                            {user?.id && (
                                <div className={cx("navbar-user")}>
                                    <Grid container spacing={1.5}>
                                        <Grid item xs={12}>
                                            <div className={cx("user-avatar")}>
                                                <span
                                                    className={cx(
                                                        "user-avatar-img"
                                                    )}
                                                >
                                                    {nameAvatar}
                                                </span>
                                                <div
                                                    className={cx(
                                                        "user-fullName-wrapper"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "user-fullName"
                                                        )}
                                                    >
                                                        {user?.last_name +
                                                            " " +
                                                            user?.first_name}
                                                    </span>
                                                    <IconButton
                                                        onClick={
                                                            handleNavigateAccount
                                                        }
                                                        size="large"
                                                    >
                                                        <EditRounded fontSize="medium" />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GButton
                                                startIcon={<ListAltRounded />}
                                                color={"text"}
                                                fullWidth
                                                onClick={
                                                    handleNavigateOrderPurchase
                                                }
                                            >
                                                Đơn hàng
                                            </GButton>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <GButton
                                                color={"text"}
                                                startIcon={
                                                    <RecentActorsRounded />
                                                }
                                                fullWidth
                                                onClick={handleNavigateBooked}
                                            >
                                                Lịch hẹn
                                            </GButton>
                                        </Grid>
                                    </Grid>
                                </div>
                            )}
                            <NavbarMenu setIsOpenDrawer={setIsOpenDrawer} />
                        </div>
                        <div className={cx("footer-actions")}>
                            <Grid container spacing={1.5}>
                                <Grid item xs={6}>
                                    <GButton
                                        className={cx("call-action")}
                                        href="tel:0399859634"
                                        startIcon={<PhoneInTalkRounded />}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        0386.653.766
                                    </GButton>
                                </Grid>
                                <Grid item xs={6}>
                                    <GButton
                                        startIcon={<HeadsetMicRounded />}
                                        className={cx("advise-action")}
                                        fullWidth
                                        variant="outlined"
                                    >
                                        Tư vấn
                                    </GButton>
                                </Grid>
                                {user?.id && (
                                    <Grid item xs={12}>
                                        <GButton
                                            startIcon={<LogoutRounded />}
                                            onClick={handleLogout}
                                            color={"text"}
                                        >
                                            Đăng xuất
                                        </GButton>
                                    </Grid>
                                )}
                            </Grid>
                        </div>
                    </div>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default NavbarMobile;
