/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useState } from "react";
import styles from "./NavbarMobile.module.scss";
import classNames from "classnames/bind";
import { Grid, IconButton, SwipeableDrawer } from "@mui/material";
import images from "../../../../assets/images";
import {
    CloseRounded,
    DateRangeRounded,
    ExpandMore,
    HeadsetMicRounded,
    PhoneInTalkRounded,
    ReorderRounded,
    SearchRounded,
} from "@mui/icons-material";

import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import { MenuList } from "../navigation";
import MenuUser from "../MenuUser/MenuUser";
import NavbarMenu from "./NavbarMenu/NavbarMenu";

function NavbarMobile() {
    const cx = classNames.bind(styles);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const toggleDrawer = useCallback(
        () => setIsOpenDrawer((prevOpen) => !prevOpen),
        [setIsOpenDrawer]
    );
    const [selectedNavItem, setSelectedNavItem] = useState([]);
    const [selectedSubItem, setSelectedSubItem] = useState([]);

    const handleClickNavItem = (e, item) => {
        // if (e.target !== e.currentTarget) return;
        if (!item.children || selectedNavItem !== item.title) {
            setSelectedSubItem([]);
        }
        if (!item.children || selectedNavItem === item.title) {
            setSelectedNavItem(undefined);
            setSelectedSubItem([]);
        } else {
            setSelectedNavItem(item.title);
        }
    };

    const handleClickSubItem = (item) => {
        if (selectedSubItem.includes(item.title)) {
            const newArr = selectedSubItem.filter((x) => x !== item.title);
            setSelectedSubItem(newArr);
            return;
        }

        setSelectedSubItem([...selectedSubItem, item.title]);
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
                            <div className={cx("navbar-search")}>
                                <GTextFieldNormal />
                                <IconButton size="large">
                                    <SearchRounded
                                        className={cx("search-icon")}
                                    />
                                </IconButton>
                            </div>
                            <NavbarMenu setIsOpenDrawer={setIsOpenDrawer} />
                        </div>
                        <div className={cx("footer-actions")}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <a
                                        className={cx("call-action")}
                                        href="tel:0399859634"
                                    >
                                        <PhoneInTalkRounded />
                                        <span>0386.653.766</span>
                                    </a>
                                </Grid>
                                <Grid item xs={6}>
                                    <a className={cx("advise-action")} href="">
                                        <HeadsetMicRounded />
                                        <span>Tư vấn</span>
                                    </a>
                                </Grid>
                                <Grid item xs={12}>
                                    <a className={cx("book-action")} href="">
                                        <DateRangeRounded />
                                        <span>Đặt lịch</span>
                                    </a>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default NavbarMobile;
