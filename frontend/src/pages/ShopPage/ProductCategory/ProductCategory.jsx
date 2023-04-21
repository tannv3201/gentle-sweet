import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductCategory.module.scss";
import { Grid, IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { ExpandMoreRounded } from "@mui/icons-material";
const cx = classNames.bind(styles);

function ProductCategory() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const [categoryList, setCategoryList] = useState([
        {
            id: 1,
            title: "Tất cả",
            href: "#",
            isOpen: true,
        },
        {
            id: 2,
            title: "Chăm sóc tóc",
            href: "#",
            children: [
                {
                    id: 22,
                    title: "Dầu gội",
                    href: "#",
                },
                {
                    id: 23,
                    title: "Mặt nạ/Kem ủ",
                    href: "#",
                },
                {
                    id: 24,
                    title: "Tinh dầu dưỡng",
                    href: "#",
                },
                {
                    id: 25,
                    title: "Sơn móng",
                    href: "#",
                },
                {
                    id: 26,
                    title: "Xịt mọc tóc/dưỡng tóc",
                    href: "#",
                },
            ],
            isOpen: true,
        },
        {
            id: 3,
            title: "Chăm sóc móng",
            href: "#",
            children: [
                {
                    id: 31,
                    title: "Kem dưỡng",
                    href: "#",
                },
                {
                    id: 32,
                    title: "Kem tẩy biểu bì",
                    href: "#",
                },
            ],
            isOpen: true,
        },
        {
            id: 4,
            title: "Dụng cụ",
            href: "#",
            children: [
                {
                    id: 41,
                    title: "Sơn móng tay",
                    href: "#",
                },
                {
                    id: 42,
                    title: "Trang trí móng",
                    href: "#",
                },
                {
                    id: 23,
                    title: "Dụng cụ làm nails",
                    href: "#",
                },
            ],
            isOpen: true,
        },
    ]);

    const handleToggleCategory = (i) => {
        const updateList = categoryList.map((category, index) => {
            if (i === index) {
                return {
                    ...category,
                    isOpen: !category.isOpen,
                };
            } else {
                return {
                    ...category,
                };
            }
        });
        setCategoryList(updateList);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("inner-sticky")}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {!isMedium && (
                                <span className={cx("category-title")}>
                                    <h2>Danh mục</h2>
                                </span>
                            )}
                            <div className={cx("fixed-height")}>
                                <div className={cx("category-list")}>
                                    <Grid container spacing={0.5}>
                                        {categoryList?.map((category, idx) => (
                                            <Grid key={idx} item xs={12}>
                                                <div
                                                    className={
                                                        idx === 0
                                                            ? cx(
                                                                  "category-link-wrapper",
                                                                  "isActive"
                                                              )
                                                            : // : category?.isOpen
                                                              // ? cx(
                                                              //       "category-link-wrapper",
                                                              //       "isOpen"
                                                              //   )
                                                              // : idx === 0 &&
                                                              //   category?.isOpen
                                                              // ? cx(
                                                              //       "category-link-wrapper",
                                                              //       "isOpen",
                                                              //       "isActive"
                                                              //   )
                                                              cx(
                                                                  "category-link-wrapper"
                                                              )
                                                    }
                                                >
                                                    <a
                                                        className={cx(
                                                            "category-link"
                                                        )}
                                                        href={category?.href}
                                                    >
                                                        {category?.title}
                                                    </a>
                                                    {category?.children && (
                                                        <IconButton
                                                            className={
                                                                category?.isOpen
                                                                    ? cx(
                                                                          "category-link-btn",
                                                                          "isOpen"
                                                                      )
                                                                    : cx(
                                                                          "category-link-btn"
                                                                      )
                                                            }
                                                            onClick={() =>
                                                                handleToggleCategory(
                                                                    idx
                                                                )
                                                            }
                                                        >
                                                            <ExpandMoreRounded />
                                                        </IconButton>
                                                    )}
                                                </div>
                                                <ul
                                                    className={
                                                        category?.isOpen
                                                            ? cx(
                                                                  "category-child-list",
                                                                  "isOpen"
                                                              )
                                                            : cx(
                                                                  "category-child-list"
                                                              )
                                                    }
                                                >
                                                    {category?.children?.map(
                                                        (child, idx) => (
                                                            <li
                                                                className={cx(
                                                                    "category-child"
                                                                )}
                                                                key={idx}
                                                            >
                                                                <a
                                                                    href={
                                                                        child?.href
                                                                    }
                                                                >
                                                                    {
                                                                        child?.title
                                                                    }
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;
