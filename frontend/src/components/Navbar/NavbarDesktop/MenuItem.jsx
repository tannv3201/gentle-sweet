import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavbarDesktop.module.scss";
import classNames from "classnames/bind";
import { ExpandMoreRounded } from "@material-ui/icons";

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
                                    <ExpandMoreRounded />
                                </span>
                            )}
                        </span>
                    </div>
                )}
            </NavLink>
            <div className={cx("menu-dropdown")}>{menuDropDown}</div>
        </div>
    );
}

export default MenuItem;
