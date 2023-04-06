import React, { useState, memo, useCallback } from "react";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { Grid, IconButton } from "@material-ui/core";
import MenuItem from "./MenuItem";
import NavbarActionTop from "./NavbarActionTop/NavbarActionTop";
import MyTextField from "../MyTextField/MyTextField";
import { useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import {
    ReorderRounded,
    CloseRounded,
    SearchRounded,
    ShoppingCartRounded,
    PersonRounded,
    ExpandMore,
    PhoneInTalkRounded,
    HeadsetMicRounded,
    DateRangeRounded,
} from "@material-ui/icons";

import InfoSaleSlider from "./InfoSaleSlider/InforSaleSlider";

const cx = classNames.bind(styles);

const Navbar = memo(() => {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [navbarList, setNavbarList] = useState([
        {
            name: "Trang chủ",
            isOpen: false,
            href: "/",
        },
        {
            name: "Giới thiệu",
            children: ["Gentle Beauty", "Hệ thống chi nhánh"],
            isOpen: false,
            href: "#",
        },
        {
            name: "Dịch vụ tóc",
            children: [
                "Cắt tóc",
                "Uốn tóc",
                "Nhuộm tóc",
                "Duỗi tóc",
                "Ép tóc",
                "Trị rụng tóc",
                "Gội đầu massage",
                "Phục hồi tóc",
            ],
            isOpen: false,
        },
        {
            name: "Dịch vụ nails",
            children: [
                "Sơn ombre",
                "Sơn french",
                "Nhúng bột nails",
                "Skin tay chân",
                "Vẽ móng",
                "Massage tay chân",
                "Chà hồng gót chân",
            ],
            isOpen: false,
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
        <div className={cx("wrapper")}>
            {/* <NavbarActionTop /> */}
            {!isMedium && (
                <div className={cx("content-inner-navbar")}>
                    <Grid container>
                        <Grid item lg={2} md={2}>
                            <div
                                title="Trang chủ"
                                className={cx("logo-wrapper")}
                            >
                                <a href="/">
                                    <img
                                        className={cx("logo")}
                                        src={images.logo}
                                        alt=""
                                    />
                                </a>
                            </div>
                        </Grid>
                        <Grid item lg={7} md={7}>
                            <div className={cx("menu-list")}>
                                <MenuItem
                                    title={"Móng tay"}
                                    to={"/product/all"}
                                    menuDropDown={<h2>sanpham</h2>}
                                />
                                <span className={cx("border-between-item")} />
                                <MenuItem
                                    title={"Tóc"}
                                    to={"/service-list"}
                                    menuDropDown={<h2>dich vu</h2>}
                                />
                                <span className={cx("border-between-item")} />
                                <MenuItem title={"Sản phẩm"} to={"/sale-off"} />
                                <span className={cx("border-between-item")} />
                                <MenuItem
                                    title={"Gentle Sweet"}
                                    to={"/about-us"}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={3} md={2} sm={3}>
                            <div className={cx("action-group")}>
                                <IconButton title="Tìm kiếm">
                                    <SearchRounded />
                                </IconButton>
                                <IconButton title="Giỏ hàng">
                                    <ShoppingCartRounded />
                                </IconButton>
                                <IconButton title="Đăng nhập">
                                    <PersonRounded />
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
            {isMedium && (
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
                                <a
                                    href="/"
                                    className={cx("navbar-mobile-logo")}
                                >
                                    <img src={images.logo_text} alt="" />
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
                                    <div className={cx("navbar-logo")}>
                                        <img src={images.logo_text} alt="" />
                                    </div>
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
                                            <li
                                                key={index}
                                                className={cx("menu-item")}
                                            >
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
                                                    <a href={menu?.href}>
                                                        {menu.name}
                                                    </a>
                                                    {menu?.children && (
                                                        <IconButton
                                                            onClick={() =>
                                                                handleMenuClick(
                                                                    index
                                                                )
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
                                                                navbarList[
                                                                    child
                                                                ]?.isOpen
                                                        )
                                                            ? cx(
                                                                  "options-children",
                                                                  "isOpen"
                                                              )
                                                            : cx(
                                                                  "options-children"
                                                              )
                                                    }
                                                >
                                                    {menu?.children?.map(
                                                        (child, index) => (
                                                            <li key={index}>
                                                                <a href="#">
                                                                    {child}
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
                                            <a
                                                className={cx("advise-action")}
                                                href=""
                                            >
                                                <HeadsetMicRounded />
                                                <span>Tư vấn</span>
                                            </a>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <a
                                                className={cx("book-action")}
                                                href=""
                                            >
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
            )}
            {!isSmall && <InfoSaleSlider />}
        </div>
    );
});

export default Navbar;
