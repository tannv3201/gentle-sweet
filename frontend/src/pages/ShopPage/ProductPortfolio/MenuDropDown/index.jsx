import React, { useState } from "react";
import styles from "./MenuDropDown.module.scss";
import classNames from "classnames/bind";
import { ArrowDropDown, CloseRounded } from "@material-ui/icons";
const cx = classNames.bind(styles);

function MenuDropDown({ title, menuItem1, menuItem2, menuItem3 }) {
    const [menuDropDownActive, setMenuDropDownActive] = useState(true);
    const [menuItemActive, setMenuItemActive] = useState(false);

    const handleToggleActiveMenuDropDown = () => {
        setMenuDropDownActive(!menuDropDownActive);
    };

    const handleToggleActiveMenuItem = () => {
        setMenuItemActive(!menuItemActive);
    };

    return (
        <div className={cx("wrapper")}>
            <div
                className={
                    menuDropDownActive ? cx("inner", "toggle") : cx("inner")
                }
            >
                <label
                    htmlFor="t1"
                    className={cx("menu-dropdown-label")}
                    onClick={handleToggleActiveMenuDropDown}
                >
                    <h3>{title}</h3>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        className={
                            menuDropDownActive
                                ? cx("dropdown-icon", "rotate")
                                : cx("dropdown-icon")
                        }
                    >
                        <ArrowDropDown fontSize="large" />
                    </span>
                </label>
                <ul className={cx("menu-dropdown-list")}>
                    <li
                        onClick={handleToggleActiveMenuItem}
                        className={
                            menuItemActive
                                ? cx("menu-dropdown-item", "isActive")
                                : cx("menu-dropdown-item")
                        }
                    >
                        <a>{menuItem1}</a>
                        {menuItemActive && (
                            <CloseRounded className={cx("isInActive-icon")} />
                        )}
                    </li>
                    <li
                        onClick={handleToggleActiveMenuItem}
                        className={
                            menuItemActive
                                ? cx("menu-dropdown-item", "isActive")
                                : cx("menu-dropdown-item")
                        }
                    >
                        <a>{menuItem2}</a>
                        {menuItemActive && (
                            <CloseRounded className={cx("isInActive-icon")} />
                        )}
                    </li>
                    <li
                        onClick={handleToggleActiveMenuItem}
                        className={
                            menuItemActive
                                ? cx("menu-dropdown-item", "isActive")
                                : cx("menu-dropdown-item")
                        }
                    >
                        <a>{menuItem3}</a>
                        {menuItemActive && (
                            <CloseRounded className={cx("isInActive-icon")} />
                        )}
                    </li>
                </ul>
            </div>
            <div className={cx("bg-divider")} />
        </div>
    );
}

export default MenuDropDown;
