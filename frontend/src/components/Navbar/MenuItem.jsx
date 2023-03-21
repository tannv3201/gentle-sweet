import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function MenuItem({ title, to, ...props }) {
    return (
        <>
            <NavLink className={cx("menu-item")} to={to}>
                {({ isActive }) => (
                    <span
                        className={
                            isActive ? cx("title", "active") : cx("title")
                        }
                    >
                        {title}
                    </span>
                )}
            </NavLink>
        </>
    );
}

export default MenuItem;
