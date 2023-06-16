import * as React from "react";
import { Checkbox, IconButton, InputAdornment, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./FilterGroup.module.scss";
import classNames from "classnames/bind";
import {
    CheckBoxOutlineBlank,
    CheckBox,
    FilterListRounded,
    SearchRounded,
    ClearRounded,
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
import {
    productSearch,
    productSearchTerm,
} from "../../../redux/api/apiProduct";
import { createAxios } from "../../../createInstance";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import {
    productSearchSuccess,
    productSearchTermSuccess,
} from "../../../redux/slice/productSlice";
import * as Yup from "yup";
import { toast } from "react-hot-toast";

const validationSchema = Yup.object().shape({
    minPrice: Yup.number().required("Vui lòng nhập giá nhỏ nhất"),
    maxPrice: Yup.number()
        .required("Vui lòng nhập giá lớn nhất")
        .min(
            Yup.ref("minPrice"),
            "Giá lớn nhất phải lớn hơn hoặc bằng giá nhỏ nhất"
        ),
});

const cx = classNames.bind(styles);

const sortList = [
    { id: "name_asc", name: "Tên A-Z" },
    { id: "name_desc", name: "Tên Z-A" },
    { id: "price_asc", name: "Giá tăng dần" },
    { id: "price_desc", name: "Giá giảm dần" },
];

export const FilterGroupList = () => {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
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
    useEffect(() => {
        const params = searchParams.toString();
        const paramsObj = Object.fromEntries(searchParams.entries());
        const categoryId = paramsObj.product_category_id;
        setProductCategoryId(categoryId);
    }, [searchParams]);
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

    const handleSearch = (e) => {
        setSubmitClicked(true);
    };

    const getProductList = useSelector(
        (state) => state.product.product?.productList
    );
    const location = useLocation();
    useEffect(() => {
        if (location.search === "") {
            setProductCategoryId(null);
            setSort(null);
            setMinPrice("");
            setMaxPrice("");
        }
    }, [location.search]);

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
                                    InputLabelProps={{ shrink: true }}
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
                                    InputLabelProps={{ shrink: true }}
                                    {...params}
                                    name="sort"
                                    fullWidth
                                    label="Sắp xếp"
                                />
                            )}
                        />
                    </Grid>

                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <TextField
                            type="number"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            size="small"
                            value={minPrice}
                            onChange={(e) => {
                                if (e.target.value >= 0) {
                                    setMinPrice(e.target.value);
                                }
                            }}
                            label={"Giá từ"}
                            placeholder={"Chọn giá..."}
                            // error={Boolean(errors.minPrice)}
                            // helperText={errors.minPrice}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <TextField
                            type="number"
                            fullWidth
                            size="small"
                            disabled={!minPrice}
                            InputLabelProps={{ shrink: true }}
                            placeholder={"Chọn giá..."}
                            value={maxPrice}
                            onChange={(e) => {
                                if (e.target.value >= 0) {
                                    setMaxPrice(e.target.value);
                                }
                            }}
                            color="secondary"
                            label={"Đến giá"}
                            // helperText={errors.maxPrice}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={cx("filter-clear")}>
                <GButton
                    fullWidth={isSmall ? true : false}
                    color="error"
                    className={cx("filter-clear-btn")}
                    variant="outlined"
                    onClick={handleClearFilter}
                >
                    Xóa bộ lọc
                </GButton>
                <GButton
                    fullWidth={isSmall ? true : false}
                    onClick={handleSearch}
                    color="success"
                    className={cx("filter-clear-btn")}
                >
                    {isSmall ? "Lọc" : "Lọc sản phẩm"}
                </GButton>
            </div>
        </>
    );
};

export default function FilterGroup() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [isOpenFilterGroup, setIsOpenFilterGroup] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    const handleOnChangeSearchTerm = (value) => {
        setSearchTerm(value);
    };
    const getProductSearchTerm = useSelector(
        (state) => state.product.product?.productSearchTerm
    );
    const handleSearchTerm = async () => {
        if (!searchTerm) {
            toast.error("Vui lòng nhập tên sản phẩm");
            return;
        }
        await productSearchTerm(dispatch, searchTerm);
        setIsSearchPerformed(true);
    };
    const getProductList = useSelector(
        (state) => state.product.product?.productList
    );
    const [searchParams, setSearchParams] = useSearchParams();

    const [productCategoryId, setProductCategoryId] = useState(null);
    const [locationPage, setLocationPage] = useState(null);
    const [locationSort, setLocationSort] = useState(null);
    const [locationMinPrice, setLocationMinPrice] = useState("");
    const [locationMaxPrice, setLocationMaxPrice] = useState("");

    const handleClearSearchTerm = () => {
        setSearchTerm("");

        if (isSearchPerformed) {
            dispatch(productSearchTermSuccess([]));
            const emptySearchParams = new URLSearchParams();
            setSearchParams(emptySearchParams);
            setLocationSort(null);
            setLocationMinPrice("");
            setLocationMaxPrice("");
            setProductCategoryId(null);
            dispatch(productSearchSuccess(structuredClone(getProductList)));
            setIsSearchPerformed(false);
        }
    };

    const handleKeyDownSearchTerm = (e) => {
        if (e.key === "Enter") {
            handleSearchTerm();
        }
    };
    return (
        <>
            <div
                className={
                    isOpenFilterGroup
                        ? cx("wrapper", "isOpenFilterGroup")
                        : cx("wrapper")
                }
            >
                <Grid container spacing={2}>
                    {!isSmall && (
                        <Grid item xs={6}>
                            <GButton
                                endIcon={<FilterListRounded />}
                                onClick={() =>
                                    setIsOpenFilterGroup(!isOpenFilterGroup)
                                }
                            >
                                Bộ lọc
                            </GButton>
                        </Grid>
                    )}
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={8}>
                                    <GTextFieldNormal
                                        onChange={(e) =>
                                            handleOnChangeSearchTerm(
                                                e.target.value
                                            )
                                        }
                                        label={"Tìm kiếm"}
                                        value={searchTerm}
                                        InputLabelProps={{ shrink: true }}
                                        placeholder="Nhập tên sản phẩm..."
                                        onKeyDown={handleKeyDownSearchTerm}
                                        fullWidth
                                        InputProps={
                                            searchTerm
                                                ? {
                                                      endAdornment: (
                                                          <InputAdornment position="end">
                                                              <IconButton
                                                                  aria-label="toggle password visibility"
                                                                  onClick={
                                                                      handleClearSearchTerm
                                                                  }
                                                                  edge="end"
                                                                  // size={isMedium ? "large" : "medium"}
                                                              >
                                                                  <ClearRounded />
                                                              </IconButton>
                                                          </InputAdornment>
                                                      ),
                                                  }
                                                : {}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <GButton
                                        startIcon={<SearchRounded />}
                                        onClick={handleSearchTerm}
                                        size="medium"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        {!isSmall ? "Tìm kiếm" : "Tìm"}
                                    </GButton>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
                {!isSmall && (
                    <div
                        className={
                            isOpenFilterGroup
                                ? cx("inner", "isOpenFilterGroup")
                                : cx("inner")
                        }
                    >
                        <FilterGroupList />
                    </div>
                )}
            </div>
        </>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
