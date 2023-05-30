import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProductCategory.module.scss";
import { Grid, IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { ExpandMoreRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { productSearch } from "../../../redux/api/apiProduct";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
const cx = classNames.bind(styles);

function ProductCategory() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const productCategoryList = useSelector(
        (state) => state.productCategory.productCategory?.productCategoryList
    );
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        if (productCategoryList)
            setCategoryList(structuredClone(productCategoryList));
    }, [productCategoryList]);

    const [searchParams, setSearchParams] = useSearchParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const handleFilter = async (id) => {
        const newSearchParams = new URLSearchParams();
        if (id) {
            await productSearch(
                user?.accessToken,
                {
                    product_category_id: id,
                },
                dispatch,
                axiosJWT
            );
            newSearchParams.set("product_category_id", id);
        }
        setSearchParams(newSearchParams);
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
                                            <Grid
                                                key={category?.id}
                                                item
                                                xs={12}
                                                onClick={() =>
                                                    handleFilter(category?.id)
                                                }
                                            >
                                                <div
                                                    className={
                                                        idx === 0
                                                            ? cx(
                                                                  "category-link-wrapper",
                                                                  "isActive"
                                                              )
                                                            : cx(
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
                                                        {category?.name}
                                                    </a>
                                                </div>
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
