import React from "react";
import classNames from "classnames/bind";
import styles from "./ShopPage.module.scss";
import { Grid } from "@mui/material";
import Product from "./Product/Product";
import FilterGroup from "./FilterGroup/FilterGroup";
import ProductCategory from "./ProductCategory/ProductCategory";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GButton from "../../components/MyButton/MyButton";
import {
    FormatListBulletedRounded,
    FilterAltRounded,
} from "@mui/icons-material/";

const cx = classNames.bind(styles);

function ShopPage() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div className={cx("shop-page-wrapper")}>
            <div className={cx("shop-page-inner")}>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={12} sm={12} xs={!2} width="100%">
                        {isSmall ? (
                            <div className={cx("category-filter-mobile")}>
                                <GButton
                                    variant="outlined"
                                    startIcon={<FormatListBulletedRounded />}
                                    className={cx("category-filter-btn")}
                                >
                                    Danh mục
                                </GButton>
                                <GButton
                                    variant="outlined"
                                    startIcon={<FilterAltRounded />}
                                    className={cx("category-filter-btn")}
                                >
                                    Bộ lọc
                                </GButton>
                            </div>
                        ) : (
                            <ProductCategory />
                        )}
                    </Grid>
                    <Grid item lg={9} md={12} sm={12} xs={12}>
                        <div className="">
                            <Grid container>
                                {!isSmall && (
                                    <Grid item xs={12}>
                                        <FilterGroup />
                                    </Grid>
                                )}
                                <Grid item xs={12} width={"100%"}>
                                    <Product />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ShopPage;
