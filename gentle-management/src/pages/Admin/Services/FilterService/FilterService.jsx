import React, { useEffect } from "react";
import { useState } from "react";
import GButton from "../../../../components/MyButton/MyButton";
import { FilterListRounded } from "@mui/icons-material";
import { Autocomplete, Grid } from "@mui/material";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import styles from "./FilterService.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import { invoiceSearch } from "../../../../redux/api/apiInvoice";
import GDatePicker, {
    GFormatDate,
} from "../../../../components/GDatePicker/GDatePicker";
import dayjs from "dayjs";
import { serviceSearch } from "../../../../redux/api/apiService";

const cx = classNames.bind(styles);

function FilterService({ isFiltering, setIsFiltering }) {
    const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
    const dispatch = useDispatch();
    const serviceCategoryList = structuredClone(
        useSelector(
            (state) =>
                state.serviceCategory.serviceCategory?.serviceCategoryList
        )
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [serviceCategoryId, setServiceCategoryId] = useState(
        searchParams.get("service_category_id") || null
    );

    const user = useSelector((state) => state.auth.login?.currentUser);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [submitClicked, setSubmitClicked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetch = async () => {
            if (location.search || submitClicked) {
                await serviceSearch(
                    user?.accessToken,
                    {
                        service_category_id: serviceCategoryId,
                    },
                    dispatch,
                    axiosJWT
                );
                const newSearchParams = new URLSearchParams();

                if (serviceCategoryId)
                    newSearchParams.set(
                        "service_category_id",
                        serviceCategoryId
                    );

                setSearchParams(newSearchParams);
                setSubmitClicked(false);
                setIsFiltering(!isFiltering);
            }
        };
        fetch();
    }, [submitClicked, serviceCategoryId]);

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
                                options={serviceCategoryList}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || null
                                }
                                isOptionEqualToValue={(option, value) =>
                                    value === null ||
                                    value === "" ||
                                    option?.id === value?.id
                                }
                                onChange={(e, value) => {
                                    setServiceCategoryId(value?.id);
                                }}
                                value={
                                    serviceCategoryId
                                        ? {
                                              id: serviceCategoryId,
                                              name: serviceCategoryList?.find(
                                                  (i) =>
                                                      i.id ===
                                                      parseInt(
                                                          serviceCategoryId
                                                      )
                                              )?.name,
                                          }
                                        : null
                                }
                                renderInput={(params) => (
                                    <GTextFieldNormal
                                        {...params}
                                        name="service_category_id"
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
                                        setServiceCategoryId(null);
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

export default FilterService;
