/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useState } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { Drawer, Grid, IconButton } from "@material-ui/core";
import images from "../../assets/images";
import {
    CloseRounded,
    DateRangeRounded,
    ExpandMore,
    HeadsetMicRounded,
    PhoneInTalkRounded,
    ReorderRounded,
    SearchRounded,
} from "@material-ui/icons";
import MyTextField from "../MyTextField/MyTextField";

function NavbarMobile() {
    const cx = classNames.bind(styles);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [navbarList, setNavbarList] = useState([
        {
            name: "Trang chủ",
            isOpen: false,
            href: "/",
        },
        {
            name: "Giới thiệu",
            children: [
                { name: "Gentle Beauty", href: "/ve-chung-toi" },
                { name: "Hệ thống chi nhánh", href: "#" },
            ],
            isOpen: false,
            href: "#",
        },
        {
            name: "Dịch vụ tóc",
            children: [
                { name: "Cắt tóc", href: "#" },
                { name: "Uốn tóc", href: "#" },
                { name: "Nhuộm tóc", href: "#" },
                { name: "Duỗi tóc", href: "#" },
                { name: "Ép tóc", href: "#" },
                { name: "Trị rụng tóc", href: "#" },
                { name: "Gội đầu massage", href: "#" },
                { name: "Phục hồi tóc", href: "#" },
            ],
            isOpen: false,
            href: "#",
        },
        {
            name: "Dịch vụ nails",
            children: [
                { name: "Sơn ombre", href: "#" },
                { name: "Sơn french", href: "#" },
                { name: "Nhúng bột nails", href: "#" },
                { name: "Skin tay chân", href: "#" },
                { name: "Vẽ móng", href: "#" },
                { name: "Massage tay chân", href: "#" },
                { name: "Chà hồng gót chân", href: "#" },
            ],
            isOpen: false,
            href: "#",
        },
        {
            name: "Tin tức",
            isOpen: false,
            href: "#",
        },
        {
            name: "Store",
            isOpen: false,
            href: "/dich-vu",
        },
    ]);

    // const handleMenuClick = (i) => {
    //     const updateList = navbarList.map((menu, index) => {
    //         if (i === index) {
    //             return {
    //                 ...menu,
    //                 isOpen: !menu.isOpen,
    //             };
    //         } else {
    //             return {
    //                 ...menu,
    //                 isOpen: false,
    //             };
    //         }
    //     });
    //     setNavbarList(updateList);
    // };

    const handleMenuClick = useCallback(
        (i) => {
            setNavbarList((prevList) =>
                prevList.map((menu, index) => {
                    if (i === index) {
                        return {
                            ...menu,
                            isOpen: !menu.isOpen,
                        };
                    }
                    return menu;
                })
            );
        },
        [setNavbarList]
    );

    // const toggleDrawer = (event) => {
    //     setIsOpenDrawer(!isOpenDrawer);
    //     const updateList = navbarList.map((menu, index) => {
    //         return {
    //             ...menu,
    //             isOpen: false,
    //         };
    //     });
    //     setNavbarList(updateList);
    // };

    const toggleDrawer = useCallback(
        () => setIsOpenDrawer((prevOpen) => !prevOpen),
        [setIsOpenDrawer]
    );

    return (
        <div>
            <React.Fragment>
                <div className={cx("navbar-mobile-wrapper")}>
                    <IconButton
                        className={cx("navbar-mobile-button")}
                        onClick={toggleDrawer}
                    >
                        <ReorderRounded fontSize="large" />
                    </IconButton>
                    <div className={cx("navbar-mobile-content")}>
                        <a href="/" className={cx("navbar-mobile-logo")}>
                            <img src={images.logo} alt="" />
                        </a>
                    </div>
                </div>
                <Drawer
                    anchor={"left"}
                    open={isOpenDrawer}
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
                            >
                                <CloseRounded fontSize="large" />
                            </IconButton>
                        </div>
                        <div className={cx("navbar-body")}>
                            <div className={cx("navbar-search")}>
                                <MyTextField roundedBorder />
                                <IconButton>
                                    <SearchRounded
                                        className={cx("search-icon")}
                                    />
                                </IconButton>
                            </div>
                            <ul className={cx("menu-list-container")}>
                                {navbarList.map((menu, index) => (
                                    <li key={index} className={cx("menu-item")}>
                                        <div
                                            className={
                                                menu.isOpen
                                                    ? cx(
                                                          "menu-parent",
                                                          "isOpen"
                                                      )
                                                    : cx("menu-parent")
                                            }
                                        >
                                            <a href={menu?.href}>{menu.name}</a>
                                            {menu?.children && (
                                                <IconButton
                                                    onClick={() =>
                                                        handleMenuClick(index)
                                                    }
                                                >
                                                    <ExpandMore
                                                        className={
                                                            menu.isOpen
                                                                ? cx(
                                                                      "arrow-icon",
                                                                      "rotate"
                                                                  )
                                                                : cx(
                                                                      "arrow-icon"
                                                                  )
                                                        }
                                                    />
                                                </IconButton>
                                            )}
                                        </div>
                                        <ul
                                            className={
                                                menu.isOpen ||
                                                menu.children?.some(
                                                    (child) =>
                                                        navbarList[child]
                                                            ?.isOpen
                                                )
                                                    ? cx(
                                                          "options-children",
                                                          "isOpen"
                                                      )
                                                    : cx("options-children")
                                            }
                                        >
                                            {menu?.children?.map(
                                                (child, index) => (
                                                    <li key={index}>
                                                        <a href={child?.href}>
                                                            {child?.name}
                                                        </a>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={cx("footer-actions")}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <a
                                        className={cx("call-action")}
                                        href="tel:0386653766"
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
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default NavbarMobile;
