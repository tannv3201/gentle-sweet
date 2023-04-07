import React from "react";
import MenuItem from "./MenuItem";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import { Grid, IconButton } from "@material-ui/core";
import images from "../../assets/images";
import { NavLink } from "react-router-dom";
import {
    PersonRounded,
    SearchRounded,
    ShoppingCartRounded,
} from "@material-ui/icons";

const navbarMobileList = [
    {
        name: "Trang chủ",
        isOpen: false,
        href: "/",
    },
    {
        name: "Giới thiệu",
        children: [
            { name: "Gentle Beauty", href: "/ve-chung-toi" },
            { name: "Hệ thống chi nhánh", href: "/he-thong-chi-nhanh" },
        ],
        isOpen: false,
        href: "#",
    },
    {
        name: "Dịch vụ",
        children: [
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
                    // { name: "Skin tay chân", href: "#" },
                    { name: "Vẽ móng", href: "#" },
                    { name: "Massage tay chân", href: "#" },
                    { name: "Chà hồng gót chân", href: "#" },
                    { name: "Vẽ móng", href: "#" },
                    { name: "Massage tay chân", href: "#" },
                    // { name: "Chà hồng gót chân", href: "#" },
                ],
                isOpen: false,
                href: "#",
            },
        ],
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
];

function NavbarDesktop() {
    const cx = classNames.bind(styles);

    return (
        <div className={cx("content-inner-navbar")}>
            <Grid container>
                <Grid item lg={2} md={2}>
                    <div title="Trang chủ" className={cx("logo-wrapper")}>
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
                        {navbarMobileList?.map((navbar, index) => (
                            <MenuItem
                                key={index}
                                title={navbar?.name}
                                to={""}
                                menuDropDown={
                                    navbar?.children && (
                                        <Grid container spacing={2}>
                                            {navbar?.children?.map(
                                                (navbarParent, index) => (
                                                    <Grid
                                                        key={index}
                                                        item
                                                        container
                                                        className={cx(
                                                            "menu-dropdown-item-container"
                                                        )}
                                                        xs={
                                                            navbarParent?.children
                                                                ? 6
                                                                : 12
                                                        }
                                                    >
                                                        <Grid item xs={12}>
                                                            <NavLink
                                                                className={
                                                                    navbarParent?.children
                                                                        ? cx(
                                                                              "menu-parent-item",
                                                                              "hasChild"
                                                                          )
                                                                        : cx(
                                                                              "menu-parent-item"
                                                                          )
                                                                }
                                                                to={
                                                                    navbarParent?.href
                                                                }
                                                            >
                                                                {
                                                                    navbarParent?.name
                                                                }
                                                            </NavLink>
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            container
                                                            className={cx(
                                                                "menu-children-list"
                                                            )}
                                                        >
                                                            <Grid
                                                                item
                                                                container
                                                                xs={12}
                                                            >
                                                                {navbarParent?.children?.map(
                                                                    (
                                                                        child,
                                                                        index
                                                                    ) => (
                                                                        <Grid
                                                                            key={
                                                                                index
                                                                            }
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
                                                                        >
                                                                            <NavLink
                                                                                className={cx(
                                                                                    "menu-children-item"
                                                                                )}
                                                                                to={
                                                                                    child?.href
                                                                                }
                                                                            >
                                                                                {
                                                                                    child?.name
                                                                                }
                                                                            </NavLink>
                                                                        </Grid>
                                                                    )
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                )
                                            )}
                                        </Grid>
                                    )
                                }
                            />
                        ))}
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
    );
}

export default NavbarDesktop;
