/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./GBreadcrumb.module.scss";

import { NavLink, useLocation } from "react-router-dom";
import { HomeRounded, NavigateNextRounded } from "@mui/icons-material";
import { MenuList } from "../Navbar/navigation";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
const cx = classNames.bind(styles);

function GBreadcrumb() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const location = useLocation();
    const [pathnames, setPathnames] = useState([]);

    useEffect(() => {
        const { pathname } = location;
        const newPaths = pathname.split("/").filter((path) => path);
        setPathnames(newPaths);

        // Tìm title tương ứng với từng pathname
        const newTitles = newPaths.map((path) => {
            const item = MenuList?.find((data) => data.href === `/${path}`);
            return item ? item.title : "";
        });
    }, [location]);

    function flattenMenuList(menuList) {
        let result = [];
        for (let i = 0; i < menuList.length; i++) {
            const item = menuList[i];
            result.push(item);
            if (item.children && Array.isArray(item.children)) {
                result = result.concat(flattenMenuList(item.children));
            }
        }
        return result;
    }

    function getTitle() {
        const menuList = flattenMenuList(MenuList);
        const newPathName = pathnames.join("");
        const menu = menuList?.find((menu) => menu.href === `/${newPathName}`);
        return menu?.title;
    }

    return (
        <div
            style={!isMedium ? { marginTop: "110px" } : { marginTop: "54px" }}
            className={cx("wrapper")}
        >
            {location.pathname === "/" ? null : (
                <div className={cx("inner")}>
                    <span className={cx("breadcrumb-item")}>
                        <HomeRounded
                            style={{
                                marginRight: "4px",
                                height: "100%",
                            }}
                        />
                        <NavLink to="/">Trang chủ</NavLink>
                        <NavigateNextRounded />
                    </span>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames
                            .slice(0, index + 1)
                            .join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        const title = getTitle();
                        return isLast ? (
                            <span
                                className={cx("breadcrumb-item", "current")}
                                key={routeTo}
                            >
                                {title || name}
                            </span>
                        ) : (
                            <span
                                className={cx("breadcrumb-item")}
                                key={routeTo}
                            >
                                <NavLink to={routeTo}>{title || name}</NavLink>
                                <NavigateNextRounded />
                            </span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default GBreadcrumb;
