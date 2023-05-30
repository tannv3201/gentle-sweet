import * as React from "react";
import { Checkbox } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./FilterGroup.module.scss";
import classNames from "classnames/bind";
import {
    CheckBoxOutlineBlank,
    CheckBox,
    FilterListRounded,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import GButton from "../../../components/MyButton/MyButton";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { productSearch } from "../../../redux/api/apiProduct";
import { createAxios } from "../../../createInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { productSearchSuccess } from "../../../redux/slice/productSlice";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const cx = classNames.bind(styles);

const sortList = [
    { id: "name_asc", name: "Tên A-Z" },
    { id: "name_desc", name: "Tên Z-A" },
    { id: "price_asc", name: "Giá tăng dần" },
    { id: "price_desc", name: "Giá giảm dần" },
];
const DisplayLabel = ({ label, icon }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "4px" }}>{label}</span>
            {icon}
        </div>
    );
};

export const FilterGroupList = () => {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const productCategoryList = structuredClone(
        useSelector(
            (state) =>
                state.productCategory.productCategory?.productCategoryList
        )
    );
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [searchParams, setSearchParams] = useSearchParams();
    const [productCategoryId, setProductCategoryId] = useState(
        searchParams.get("product_category_id") || null
    );
    const [minPrice, setMinPrice] = useState(
        searchParams.get("minPrice") || ""
    );
    const [maxPrice, setMaxPrice] = useState(
        searchParams.get("maxPrice") || ""
    );
    const [sort, setSort] = useState(searchParams.get("sort") || null);

    const [submitClicked, setSubmitClicked] = useState(false);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleSearch = () => {
        setSubmitClicked(true);
    };

    const getProductList = useSelector(
        (state) => state.product.product?.productList
    );

    useEffect(() => {
        const fetch = async () => {
            if (
                sort ||
                minPrice ||
                maxPrice ||
                productCategoryId ||
                submitClicked
            ) {
                await productSearch(
                    user?.accessToken,
                    {
                        product_category_id: productCategoryId,
                        sort_by: sort,
                        min_price: minPrice,
                        max_price: maxPrice,
                    },
                    dispatch,
                    axiosJWT
                );
                const newSearchParams = new URLSearchParams();

                if (productCategoryId) {
                    newSearchParams.set(
                        "product_category_id",
                        productCategoryId
                    );
                }

                if (sort) {
                    newSearchParams.set("sort", sort);
                }
                if (minPrice) {
                    newSearchParams.set("minPrice", minPrice);
                }
                if (maxPrice) {
                    newSearchParams.set("maxPrice", maxPrice);
                }

                setSearchParams(newSearchParams);
                setSubmitClicked(false);
            }
        };
        fetch();
    }, [submitClicked]);

    const handleClearFilter = async () => {
        dispatch(productSearchSuccess(structuredClone(getProductList)));
        setProductCategoryId(null);
        setSort(null);
        setMinPrice("");
        setMaxPrice("");
        const newSearchParams = new URLSearchParams();
        newSearchParams.delete("product_category_id");
        newSearchParams.delete("sort");
        newSearchParams.delete("minPrice");
        newSearchParams.delete("maxPrice");
        setSearchParams(newSearchParams);
    };

    return (
        <>
            <div style={isMedium ? { padding: "0 12px" } : {}}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Autocomplete
                            options={productCategoryList}
                            getOptionLabel={(option) =>
                                `${option?.name}` || null
                            }
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                value === "" ||
                                option.id === value.id
                            }
                            onChange={(e, value) => {
                                setProductCategoryId(value?.id);
                            }}
                            value={
                                productCategoryId
                                    ? {
                                          id: parseInt(productCategoryId),
                                          name: productCategoryList?.find(
                                              (i) =>
                                                  i.id ===
                                                  parseInt(productCategoryId)
                                          )?.name,
                                      }
                                    : null
                            }
                            renderInput={(params) => (
                                <GTextFieldNormal
                                    {...params}
                                    name="product_category_id"
                                    fullWidth
                                    label="Danh mục"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <Autocomplete
                            options={sortList}
                            getOptionLabel={(option) =>
                                `${option?.name}` || null
                            }
                            isOptionEqualToValue={(option, value) =>
                                value === undefined ||
                                value === "" ||
                                option.id === value.id
                            }
                            onChange={(e, value) => {
                                setSort(value?.id);
                            }}
                            value={
                                sort
                                    ? {
                                          id: sort,
                                          name: sortList?.find(
                                              (i) => i.id === sort
                                          )?.name,
                                      }
                                    : null
                            }
                            renderInput={(params) => (
                                <GTextFieldNormal
                                    {...params}
                                    name="sort"
                                    fullWidth
                                    label="Sắp xếp"
                                />
                            )}
                        />
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GTextFieldNormal
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            label={"Giá từ"}
                            placeholder={"Chọn giá..."}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <GTextFieldNormal
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            placeholder={"Chọn giá..."}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            color="secondary"
                            label={"Đến giá"}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={cx("filter-clear")}>
                <GButton
                    color="error"
                    className={cx("filter-clear-btn")}
                    variant="outlined"
                    onClick={handleClearFilter}
                >
                    Xóa bộ lọc
                </GButton>
                <GButton
                    onClick={handleSearch}
                    color="success"
                    className={cx("filter-clear-btn")}
                >
                    Tìm kiếm
                </GButton>
            </div>
        </>
    );
};

export default function FilterGroup() {
    const [isOpenFilterGroup, setIsOpenFilterGroup] = useState(false);
    return (
        <>
            <div
                className={
                    isOpenFilterGroup
                        ? cx("wrapper", "isOpenFilterGroup")
                        : cx("wrapper")
                }
            >
                <GButton
                    endIcon={<FilterListRounded />}
                    onClick={() => setIsOpenFilterGroup(!isOpenFilterGroup)}
                >
                    Bộ lọc
                </GButton>
                <div
                    className={
                        isOpenFilterGroup
                            ? cx("inner", "isOpenFilterGroup")
                            : cx("inner")
                    }
                >
                    <FilterGroupList />
                </div>
            </div>
        </>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
