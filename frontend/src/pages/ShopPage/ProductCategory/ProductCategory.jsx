/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProductCategory.module.scss";
import { Grid, IconButton } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { ExpandMoreRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { productSearch } from "../../../redux/api/apiProduct";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { productSearchSuccess } from "../../../redux/slice/productSlice";
const cx = classNames.bind(styles);

function ProductCategory({ onClose }) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const productCategoryList = useSelector(
        (state) => state.productCategory.productCategory?.productCategoryList
    );
    const getProductList = useSelector(
        (state) => state.product.product?.productList
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
    const [productCategoryId, setProductCategoryId] = useState(null);
    const [locationPage, setLocationPage] = useState(null);
    const [locationSort, setLocationSort] = useState(null);
    const [locationMinPrice, setLocationMinPrice] = useState("");
    const [locationMaxPrice, setLocationMaxPrice] = useState("");

    useEffect(() => {
        const params = searchParams.toString();
        const paramsObj = Object.fromEntries(searchParams.entries());
        const categoryId = paramsObj.product_category_id;
        const page = paramsObj.page;
        const sort = paramsObj.sort;
        const minPrice = paramsObj.minPrice;
        const maxPrice = paramsObj.maxPrice;

        setLocationPage(page);
        setLocationSort(sort);
        setLocationMinPrice(minPrice);
        setLocationMaxPrice(maxPrice);
        setProductCategoryId(categoryId);
    }, [searchParams]);

    const handleFilter = async (id) => {
        onClose();
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
    const location = useLocation();

    const handleViewAll = () => {
        const emptySearchParams = new URLSearchParams();
        dispatch(productSearchSuccess(structuredClone(getProductList)));
        setSearchParams(emptySearchParams);
        setLocationSort(null);
        setLocationMinPrice("");
        setLocationMaxPrice("");
        setProductCategoryId(null);
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("inner-sticky")}>
                    <Grid container>
                        <Grid item xs={12}>
                            {!isMedium && (
                                <span className={cx("category-title")}>
                                    <h2>Danh mục</h2>
                                </span>
                            )}
                            <div className={cx("fixed-height")}>
                                <div className={cx("category-list")}>
                                    <Grid container spacing={0.5}>
                                        <Grid
                                            item
                                            xs={12}
                                            onClick={handleViewAll}
                                        >
                                            <div
                                                className={
                                                    location.search === "" ||
                                                    location.search.includes(
                                                        "page"
                                                    )
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
                                                >
                                                    Tất cả
                                                </a>
                                            </div>
                                        </Grid>
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
                                                        category?.id ===
                                                        parseInt(
                                                            productCategoryId
                                                        )
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
