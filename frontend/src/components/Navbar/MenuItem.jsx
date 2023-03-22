import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";
import images from "../../assets/images";
import { ArrowDropDown } from "@material-ui/icons";
import { Grid } from "@material-ui/core";

const cx = classNames.bind(styles);

function MenuItem({ title, to, isDropDown, menuDropDown, ...props }) {
    return (
        <div
            className={
                menuDropDown
                    ? cx("navlink-wrapper", "isDropDown")
                    : cx("navlink-wrapper")
            }
        >
            <NavLink
                className={
                    menuDropDown
                        ? cx("menu-item-wrapper", "isDropDown")
                        : cx("menu-item-wrapper")
                }
                to={to}
            >
                {({ isActive }) => (
                    <div className={cx("menu-item")}>
                        <span
                            className={
                                isActive ? cx("title", "active") : cx("title")
                            }
                        >
                            {title}
                            {menuDropDown && (
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    className={cx("dropdown-icon")}
                                >
                                    <ArrowDropDown fontSize="large" />
                                </span>
                            )}
                        </span>
                    </div>
                )}
            </NavLink>
            <Grid container>
                <div className={cx("menu-dropdown")}>{menuDropDown}</div>
            </Grid>
        </div>
    );
}

export default MenuItem;
