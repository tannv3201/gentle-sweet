import React, { useEffect } from "react";
import { useState } from "react";
import GButton from "../../../../components/MyButton/MyButton";
import { FilterListRounded } from "@mui/icons-material";
import { Autocomplete, Grid } from "@mui/material";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import styles from "./FilterProduct.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { productSearch } from "../../../../redux/api/apiProduct";

const cx = classNames.bind(styles);

function FilterProduct({ isFiltering, setIsFiltering }) {
    const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
    const dispatch = useDispatch();
    const productCategoryList = structuredClone(
        useSelector(
            (state) =>
                state.productCategory.productCategory?.productCategoryList
        )
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [productCategoryId, setProductCategoryId] = useState(
        searchParams.get("product_category_id") || null
    );

    const user = useSelector((state) => state.auth.login?.currentUser);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [submitClicked, setSubmitClicked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetch = async () => {
            if (location.search || submitClicked) {
                await productSearch(
                    user?.accessToken,
                    {
                        product_category_id: productCategoryId,
                    },
                    dispatch,
                    axiosJWT
                );
                const newSearchParams = new URLSearchParams();

                if (productCategoryId)
                    newSearchParams.set(
                        "product_category_id",
                        productCategoryId
                    );

                setSearchParams(newSearchParams);
                setSubmitClicked(false);
                setIsFiltering(!isFiltering);
            }
        };
        fetch();
    }, [submitClicked, productCategoryId]);

    const handleSearch = () => {
        setSubmitClicked(true);
    };

    return (
        <>
            <GButton
                color={"success"}
                onClick={() => setIsOpenFilterBox((prev) => !prev)}
                startIcon={<FilterListRounded />}
            >
                Tìm kiếm
            </GButton>
            <div
                className={
                    isOpenFilterBox
                        ? cx("search-box-container", "isOpen")
                        : cx("search-box-container")
                }
            >
                <div className={cx("search-box")}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Autocomplete
                                options={productCategoryList}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || null
                                }
                                isOptionEqualToValue={(option, value) =>
                                    value === null ||
                                    value === "" ||
                                    option?.id === value?.id
                                }
                                onChange={(e, value) => {
                                    setProductCategoryId(value?.id);
                                }}
                                value={
                                    productCategoryId
                                        ? {
                                              id: productCategoryId,
                                              name: productCategoryList?.find(
                                                  (i) =>
                                                      i.id ===
                                                      parseInt(
                                                          productCategoryId
                                                      )
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

                        <Grid
                            item
                            xs={6}
                            display={"flex"}
                            justifyContent={"flex-end"}
                        >
                            <div className={cx("btn-list")}>
                                <GButton
                                    color={"text"}
                                    onClick={() => {
                                        setProductCategoryId(null);
                                    }}
                                >
                                    Xóa bộ lọc
                                </GButton>
                                <GButton onClick={handleSearch}>
                                    Tìm kiếm
                                </GButton>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
}

export default FilterProduct;
