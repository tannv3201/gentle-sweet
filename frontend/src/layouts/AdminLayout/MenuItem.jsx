import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const cx = classNames.bind(styles);

function MenuItem({ title, to, isDropDown, icon, end, ...props }) {
    return (
        <div className={cx("navlink-wrapper")}>
            <NavLink
                className={cx("menu-item-wrapper")}
                to={to}
                title={title}
                end={end}
            >
                {({ isActive }) => (
                    <ListItemButton className={isActive ? cx("active") : ""}>
                        <ListItemIcon className={isActive ? cx("active") : ""}>
                            {icon}
                        </ListItemIcon>
                        <ListItemText primary={title} />
                    </ListItemButton>
                )}
            </NavLink>
        </div>
    );
}

export default MenuItem;
