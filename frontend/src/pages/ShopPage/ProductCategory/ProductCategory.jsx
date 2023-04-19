import React from "react";
import classNames from "classnames/bind";
import styles from "./ProductCategory.module.scss";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const cx = classNames.bind(styles);

const categoryList = [
    {
        id: 1,
        title: "Tất cả",
        href: "#",
    },
    {
        id: 2,
        title: "Dưỡng tóc",
        href: "#",
    },
    {
        id: 3,
        title: "Dầu gội",
        href: "#",
    },
    {
        id: 4,
        title: "Dưỡng móng",
        href: "#",
    },
    {
        id: 5,
        title: "dụng cụ làm nails",
        href: "#",
    },
    {
        id: 6,
        title: "Sơn móng",
        href: "#",
    },
];
function ProductCategory() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("inner-sticky")}>
                    <Grid container spacing={2}>
                        {!isMedium && (
                            <Grid item xs={12}>
                                <span className={cx("category-title")}>
                                    <h2>Danh mục</h2>
                                </span>
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <div className={cx("category-list")}>
                                <Grid container spacing={0.5}>
                                    {categoryList?.map((category, idx) => (
                                        <Grid key={idx} item xs={12}>
                                            <a
                                                className={
                                                    idx === 0
                                                        ? cx(
                                                              "category-link",
                                                              "isActive"
                                                          )
                                                        : cx("category-link")
                                                }
                                                href={category?.href}
                                            >
                                                {category?.title}
                                            </a>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default ProductCategory;
