/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useCallback, useState } from "react";
import styles from "./NavbarMobile.module.scss";
import classNames from "classnames/bind";
import { Drawer, Grid, IconButton } from "@mui/material";
import images from "../../../assets/images";
import {
    CloseRounded,
    DateRangeRounded,
    ExpandMore,
    HeadsetMicRounded,
    PhoneInTalkRounded,
    ReorderRounded,
    SearchRounded,
} from "@mui/icons-material";

import MyTextField from "../../GTextField/MyTextField";
import { MenuList } from "../navigation";

function NavbarMobile() {
    const cx = classNames.bind(styles);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const toggleDrawer = useCallback(
        () => setIsOpenDrawer((prevOpen) => !prevOpen),
        [setIsOpenDrawer]
    );
    const [selectedNavItem, setSelectedNavItem] = useState([]);
    const [selectedSubItem, setSelectedSubItem] = useState([]);

    const handleClickNavItem = (e, item) => {
        // if (e.target !== e.currentTarget) return;
        if (!item.children || selectedNavItem !== item.title) {
            setSelectedSubItem([]);
        }
        if (!item.children || selectedNavItem === item.title) {
            setSelectedNavItem(undefined);
            setSelectedSubItem([]);
        } else {
            setSelectedNavItem(item.title);
        }
    };

    const handleClickSubItem = (item) => {
        if (selectedSubItem.includes(item.title)) {
            const newArr = selectedSubItem.filter((x) => x !== item.title);
            setSelectedSubItem(newArr);
            return;
        }

        setSelectedSubItem([...selectedSubItem, item.title]);
    };

    return (
        <div className={cx("wrapper")}>
            <React.Fragment>
                <div className={cx("navbar-mobile-wrapper")}>
                    <IconButton
                        className={cx("navbar-mobile-button")}
                        onClick={toggleDrawer}
                        size="large"
                    >
                        <ReorderRounded fontSize="large" />
                    </IconButton>
                    <div className={cx("navbar-mobile-content")}>
                        <a href="/" className={cx("navbar-mobile-logo")}>
                            <img src={images.logo} alt="" />
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
                            <a href="/" className={cx("navbar-logo")}>
                                <img src={images.logo} alt="" />
                            </a>
                            <IconButton
                                className={cx("navbar-button")}
                                onClick={toggleDrawer}
                                size="large"
                            >
                                <CloseRounded fontSize="large" />
                            </IconButton>
                        </div>
                        <div className={cx("navbar-body")}>
                            <div className={cx("navbar-search")}>
                                <MyTextField roundedBorder />
                                <IconButton size="large">
                                    <SearchRounded
                                        className={cx("search-icon")}
                                    />
                                </IconButton>
                            </div>
                            <ul className={cx("menu-list")}>
                                {MenuList.map((item, idx) => (
                                    <div key={idx}>
                                        <li
                                            className={cx(
                                                "menu-item-container"
                                            )}
                                        >
                                            <div
                                                className={
                                                    item.title ===
                                                    selectedNavItem
                                                        ? cx(
                                                              "menu-item",
                                                              "isOpen"
                                                          )
                                                        : cx("menu-item")
                                                }
                                            >
                                                <a href={item?.href}>
                                                    {item.title}
                                                </a>
                                                {item.children ? (
                                                    <IconButton
                                                        className={
                                                            item.title ===
                                                            selectedNavItem
                                                                ? cx(
                                                                      "open-menu-btn",
                                                                      "rotate"
                                                                  )
                                                                : cx(
                                                                      "open-menu-btn"
                                                                  )
                                                        }
                                                        onClick={(e) =>
                                                            handleClickNavItem(
                                                                e,
                                                                item
                                                            )
                                                        }
                                                        size="large"
                                                    >
                                                        <ExpandMore
                                                            className={
                                                                item.title ===
                                                                selectedNavItem
                                                                    ? cx(
                                                                          "icon-arrow",
                                                                          "rotate"
                                                                      )
                                                                    : cx(
                                                                          "icon-arrow"
                                                                      )
                                                            }
                                                        />
                                                    </IconButton>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </li>
                                        <ul
                                            className={
                                                item.title === selectedNavItem
                                                    ? cx(
                                                          "sub-menu-list",
                                                          "isOpen"
                                                      )
                                                    : cx("sub-menu-list")
                                            }
                                        >
                                            {item.children?.map(
                                                (subItem, i) => (
                                                    <div key={i}>
                                                        <li
                                                            className={cx(
                                                                "sub-menu-item-container"
                                                            )}
                                                            key={subItem.title}
                                                        >
                                                            <div
                                                                className={
                                                                    selectedSubItem.includes(
                                                                        subItem.title
                                                                    )
                                                                        ? cx(
                                                                              "sub-menu-item",
                                                                              "isOpen"
                                                                          )
                                                                        : cx(
                                                                              "sub-menu-item"
                                                                          )
                                                                }
                                                            >
                                                                <a
                                                                    href={
                                                                        subItem?.href
                                                                    }
                                                                >
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </a>
                                                                {subItem.children ? (
                                                                    <IconButton
                                                                        onClick={() =>
                                                                            handleClickSubItem(
                                                                                subItem
                                                                            )
                                                                        }
                                                                        size="large"
                                                                        className={
                                                                            selectedSubItem.includes(
                                                                                subItem.title
                                                                            )
                                                                                ? cx(
                                                                                      "open-chil-btn",
                                                                                      "rotate"
                                                                                  )
                                                                                : cx(
                                                                                      "open-chil-btn"
                                                                                  )
                                                                        }
                                                                    >
                                                                        <ExpandMore
                                                                            className={
                                                                                selectedSubItem.includes(
                                                                                    subItem.title
                                                                                )
                                                                                    ? cx(
                                                                                          "icon-arrow",
                                                                                          "rotate"
                                                                                      )
                                                                                    : cx(
                                                                                          "icon-arrow"
                                                                                      )
                                                                            }
                                                                        />
                                                                    </IconButton>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </li>
                                                        <ul
                                                            className={
                                                                selectedSubItem.includes(
                                                                    subItem.title
                                                                )
                                                                    ? cx(
                                                                          "sub-sub-menu-list",
                                                                          "isOpen"
                                                                      )
                                                                    : item.title !==
                                                                      selectedNavItem
                                                                    ? cx(
                                                                          "sub-sub-menu-list",
                                                                          "parentClose"
                                                                      )
                                                                    : cx(
                                                                          "sub-sub-menu-list"
                                                                      )
                                                            }
                                                        >
                                                            {subItem.children?.map(
                                                                (
                                                                    subsubmenu,
                                                                    i
                                                                ) => (
                                                                    <li
                                                                        className={cx(
                                                                            "sub-sub-menu-item-container"
                                                                        )}
                                                                        key={i}
                                                                    >
                                                                        <a
                                                                            href={
                                                                                subsubmenu?.href
                                                                            }
                                                                        >
                                                                            {
                                                                                subsubmenu.title
                                                                            }
                                                                        </a>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </ul>
                                    </div>
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
                                    <a className={cx("advise-action")} href="">
                                        <HeadsetMicRounded />
                                        <span>Tư vấn</span>
                                    </a>
                                </Grid>
                                <Grid item xs={12}>
                                    <a className={cx("book-action")} href="">
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
    );
}

export default NavbarMobile;
