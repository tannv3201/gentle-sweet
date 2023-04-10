/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Breadcrumb.module.scss";

import { NavLink, useLocation } from "react-router-dom";
import { HomeRounded, NavigateNextRounded } from "@material-ui/icons";
import { navigation } from "./navigation";

const cx = classNames.bind(styles);

function Breadcrumb() {
    const location = useLocation();
    const [pathnames, setPathnames] = useState([]);
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        const { pathname } = location;
        const newPaths = pathname.split("/").filter((path) => path);
        setPathnames(newPaths);

        // Tìm title tương ứng với từng pathname
        const newTitles = newPaths.map((path) => {
            const item = navigation?.find(
                (data) => data.pathName === `/${path}`
            );
            return item ? item.title : "";
        });
        setTitles(newTitles);
    }, [location]);

    function getTitle(index) {
        return titles[index];
    }

    return (
        <div className={cx("wrapper")}>
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
                        const title = getTitle(index);
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

export default Breadcrumb;
