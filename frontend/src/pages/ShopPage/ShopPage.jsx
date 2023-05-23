import React from "react";
import classNames from "classnames/bind";
import styles from "./ShopPage.module.scss";
import { Grid } from "@mui/material";
import ProductCategory from "./ProductCategory/ProductCategory";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GButton from "../../components/MyButton/MyButton";
import {
    FormatListBulletedRounded,
    FilterListRounded,
} from "@mui/icons-material/";
import {
    FilterDrawer,
    CategoryDrawer,
} from "./CategoryFilterDrawer/CategoryFilterDrawer";
import FilterGroup from "./FilterGroup/FilterGroup";
import ProductList from "./Product/ProductList";

const cx = classNames.bind(styles);

function ShopPage() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    const [isOpenCategoryDrawer, setIsOpenCategoryDrawer] =
        React.useState(false);

    const handleOpen = (check) => {
        if (check === "category") {
            setIsOpenCategoryDrawer(true);
        } else {
            setIsOpenFilterDrawer(true);
        }
    };

    // const handleToggleCategoryDrawer = React.useCallback(
    //     () => setIsOpenCategoryDrawer((prevOpen) => !prevOpen),
    //     [setIsOpenCategoryDrawer]
    // );

    const [isOpenFilterDrawer, setIsOpenFilterDrawer] = React.useState(false);

    // const handleToggleFilterDrawer = React.useCallback(
    //     () => setIsOpenFilterDrawer((prevOpen) => !prevOpen),
    //     [setIsOpenFilterDrawer]
    // );

    return (
        <div className={cx("shop-page-wrapper")}>
            <div className={cx("shop-page-inner")}>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={12} sm={12} xs={!2} width="100%">
                        {isMedium ? (
                            <div className={cx("category-filter-mobile")}>
                                <GButton
                                    variant="outlined"
                                    startIcon={<FormatListBulletedRounded />}
                                    className={cx("category-filter-btn")}
                                    onClick={() => handleOpen("category")}
                                >
                                    Danh mục
                                </GButton>
                                <GButton
                                    variant="outlined"
                                    startIcon={<FilterListRounded />}
                                    className={cx("category-filter-btn")}
                                    onClick={() => handleOpen("filter")}
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
                                {!isMedium && (
                                    <Grid item xs={12}>
                                        <FilterGroup />
                                    </Grid>
                                )}
                                <Grid item xs={12} width={"100%"}>
                                    <ProductList />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <CategoryDrawer
                open={isOpenCategoryDrawer}
                onClose={() => setIsOpenCategoryDrawer(false)}
                onOpen={handleOpen}
            />
            <FilterDrawer
                open={isOpenFilterDrawer}
                onClose={() => setIsOpenFilterDrawer(false)}
                onOpen={handleOpen}
            />
            {/* <FilterDrawer
                open={isOpenFilterDrawer}
                onClose={handleToggleFilterDrawer}
                onOpen={handleToggleFilterDrawer}
            /> */}
        </div>
    );
}

export default ShopPage;
