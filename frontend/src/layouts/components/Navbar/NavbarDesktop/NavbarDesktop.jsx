import React from "react";
import MenuItem from "./MenuItem";
import styles from "./NavbarDesktop.module.scss";
import classNames from "classnames/bind";
import { Grid, IconButton } from "@mui/material";
import images from "../../../../assets/images";
import { NavLink } from "react-router-dom";
import { SearchRounded } from "@mui/icons-material";
import { MenuList } from "../navigation";
import InfoSaleSlider from "../InfoSaleSlider/InforSaleSlider";
import MenuUser from "../MenuUser/MenuUser";
import { useSelector } from "react-redux";
import MenuCart from "../MenuCart/MenuCart";
import ServiceMenuDropdown from "../ServiceMenuDropdown/ServiceMenuDropdown";

const cx = classNames.bind(styles);

function NavbarDesktop() {
    return (
        <div className={cx("wrapper")}>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
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
                                {MenuList?.filter(
                                    (menu) => menu.title !== "Đặt lịch"
                                )?.map((navbar, index) => (
                                    <MenuItem
                                        key={index}
                                        title={navbar?.title}
                                        to={navbar?.href}
                                        menuDropDown={
                                            navbar?.children && (
                                                <Grid container spacing={2}>
                                                    {navbar?.children?.map(
                                                        (
                                                            navbarParent,
                                                            index
                                                        ) => (
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
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                >
                                                                    <NavLink
                                                                        title={
                                                                            navbarParent?.title
                                                                        }
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
                                                                            navbarParent?.title
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
                                                                                            child?.title
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
                                <MenuItem
                                    title={"Dịch vụ"}
                                    to={"/danh-muc-dich-vu"}
                                    menuDropDown={<ServiceMenuDropdown />}
                                />
                            </div>
                        </Grid>
                        <Grid item lg={3} md={3} sm={3}>
                            <div className={cx("action-group")}>
                                <IconButton title="Tìm kiếm" size="large">
                                    <SearchRounded />
                                </IconButton>
                                <MenuCart />
                                <MenuUser />
                                <span>
                                    <NavLink
                                        className={cx("booking-btn")}
                                        to="/dat-lich"
                                    >
                                        Đặt lịch
                                    </NavLink>
                                </span>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <InfoSaleSlider />
        </div>
    );
}

export default NavbarDesktop;
