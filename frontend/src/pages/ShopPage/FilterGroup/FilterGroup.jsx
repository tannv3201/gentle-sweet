import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FilterGroup.module.scss";
import { FilterListRounded } from "@mui/icons-material";
import { Chip, Grid } from "@mui/material";
import FilterPrice from "./FilterPrice/FilterPrice";
import FilterSize from "./FilterSize/FilterSize";
import FilterColor from "./FilterColor/FilterColor";
import FilterSort from "./FilterSort/FilterSort";

const cx = classNames.bind(styles);

function FilterGroup() {
    const [filterPriceValue, setFilterPriceValue] = useState([]);
    const [filterSizeValue, setFilterSizeValue] = useState([]);
    const [filterColorValue, setFilterColorValue] = useState([]);
    const [filterSortValue, setFilterSortValue] = useState("");

    const [isCheckedPrice, setIsCheckedPrice] = useState({
        optionPrice1: false,
        optionPrice2: false,
        optionPrice3: false,
        optionPrice4: false,
        optionPrice5: false,
    });

    const [isCheckedSize, setIsCheckedSize] = useState({
        sizeXS: false,
        sizeS: false,
        sizeM: false,
        sizeL: false,
    });

    const [isCheckedColor, setIsCheckedColor] = useState({
        redColor: false,
        orangeColor: false,
        yellowColor: false,
        greenColor: false,
        pinkColor: false,
        blackColor: false,
        whiteColor: false,
    });

    const [isCheckedSort, setIsCheckedSort] = useState({
        featuredProduct: false,
        ascendingPrice: false,
        decreasePrice: false,
        aToZ: false,
        zToA: false,
        oldest: false,
        latest: false,
        bestseller: false,
    });

    const handleChangeFilterPrice = (e) => {
        setIsCheckedPrice({
            ...isCheckedPrice,
            [e.target.name]: e.target.checked,
        });
        if (e.target.checked === true) {
            setFilterPriceValue([...filterPriceValue, e.target.value]);
        } else {
            const newArr = filterPriceValue.filter(
                (value) => value !== e.target.value
            );
            setFilterPriceValue(newArr);
        }
    };

    const handleChangeFilterSize = (e) => {
        setIsCheckedSize({
            ...isCheckedSize,
            [e.target.name]: e.target.checked,
        });
        if (e.target.checked === true) {
            setFilterSizeValue([...filterSizeValue, e.target.value]);
        } else {
            const newArr = filterSizeValue.filter(
                (value) => value !== e.target.value
            );
            setFilterSizeValue(newArr);
        }
    };

    const handleChangeFilterColor = (e) => {
        setIsCheckedColor({
            ...isCheckedColor,
            [e.target.name]: e.target.checked,
        });
        if (e.target.checked === true) {
            setFilterColorValue([...filterColorValue, e.target.value]);
        } else {
            const newArr = filterColorValue.filter(
                (value) => value !== e.target.value
            );
            setFilterColorValue(newArr);
        }
    };

    const handleChangeFilterSort = (e) => {
        setIsCheckedSort({
            [e.target.name]: e.target.checked,
        });
        if (e.target.checked === true) {
            setFilterSortValue(e.target.value);
        } else {
            setFilterSortValue("");
        }
    };

    const handleRemoveFilterPriceValue = (value) => {
        const keys = Object.keys(isCheckedPrice);
        keys?.map((key) => {
            if (key === value) {
                return (isCheckedPrice[key] = false);
            } else {
                return null;
            }
        });

        const newArr = filterPriceValue.filter((v) => v !== value);
        setFilterPriceValue(newArr);
    };

    const handleRemoveFilterSizeValue = (value) => {
        const keys = Object.keys(isCheckedSize);
        keys?.map((key) => {
            if (key === value) {
                return (isCheckedSize[key] = false);
            } else {
                return null;
            }
        });

        const newArr = filterSizeValue.filter((v) => v !== value);
        setFilterSizeValue(newArr);
    };

    const handleRemoveFilterColorValue = (value) => {
        const keys = Object.keys(isCheckedColor);
        keys?.map((key) => {
            if (key === value) {
                return (isCheckedColor[key] = false);
            } else {
                return null;
            }
        });

        const newArr = filterColorValue.filter((v) => v !== value);
        setFilterColorValue(newArr);
    };

    const handleRemoveFilterSortValue = (value) => {
        setIsCheckedSort({
            [value]: false,
        });
        setFilterSortValue("");
    };

    return (
        <div className={cx("filter-group-wrapper")}>
            <div className={cx("filter-group-inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <div className={cx("filter-group-title")}>
                            <FilterListRounded
                                className={cx("filter-group-icon")}
                            />
                            <span className={cx("filter-group-text")}>
                                Bộ lọc
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <FilterPrice
                            isChecked={isCheckedPrice}
                            handleChangeFilterPrice={handleChangeFilterPrice}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FilterSize
                            isChecked={isCheckedSize}
                            handleChangeFilterSize={handleChangeFilterSize}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FilterColor
                            isChecked={isCheckedColor}
                            handleChangeFilterColor={handleChangeFilterColor}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FilterSort
                            isChecked={isCheckedSort}
                            handleChangeFilterSort={handleChangeFilterSort}
                        />
                    </Grid>
                </Grid>
                <div className={cx("selected-filter")}>
                    {filterPriceValue?.map((value, index) => (
                        <Chip
                            key={index}
                            className={cx("selected-filter-item")}
                            label={
                                value === "optionPrice1"
                                    ? "Giá dưới 100k"
                                    : value === "optionPrice2"
                                    ? "Giá từ 100k - 250k"
                                    : value === "optionPrice3"
                                    ? "Giá từ 250k - 500k"
                                    : value === "optionPrice4"
                                    ? "Giá từ 500k - 800k"
                                    : "Giá trên 800k"
                            }
                            clickable
                            color="primary"
                            onDelete={(e) => {
                                e.preventDefault();
                                handleRemoveFilterPriceValue(value);
                            }}
                        />
                    ))}

                    {filterSizeValue?.map((value, index) => (
                        <Chip
                            key={index}
                            className={cx("selected-filter-item")}
                            label={
                                value === "sizeXS"
                                    ? "Size XS"
                                    : value === "sizeS"
                                    ? "Size S"
                                    : value === "sizeM"
                                    ? "Size M"
                                    : "Size L"
                            }
                            clickable
                            color="secondary"
                            onDelete={(e) => {
                                e.preventDefault();
                                handleRemoveFilterSizeValue(value);
                            }}
                        />
                    ))}

                    {filterColorValue?.map((value, index) => (
                        <Chip
                            key={index}
                            className={cx("selected-filter-item")}
                            label={
                                value === "redColor"
                                    ? "Đỏ"
                                    : value === "orangeColor"
                                    ? "Cam"
                                    : value === "yellowColor"
                                    ? "Vàng"
                                    : value === "greenColor"
                                    ? "Xanh lá"
                                    : value === "pinkColor"
                                    ? "Hồng"
                                    : value === "blackColor"
                                    ? "Đen"
                                    : "Trắng"
                            }
                            clickable
                            color="secondary"
                            onDelete={(e) => {
                                e.preventDefault();
                                handleRemoveFilterColorValue(value);
                            }}
                        />
                    ))}

                    {filterSortValue && (
                        <Chip
                            className={cx("selected-filter-item")}
                            label={
                                filterSortValue === "featuredProduct"
                                    ? "Sản phẩm nổi bật"
                                    : filterSortValue === "ascendingPrice"
                                    ? "Giá tăng dần"
                                    : filterSortValue === "decreasePrice"
                                    ? "Giá giảm dần"
                                    : filterSortValue === "aToZ"
                                    ? "Tên A-Z"
                                    : filterSortValue === "zToA"
                                    ? "Tên Z-A"
                                    : filterSortValue === "oldest"
                                    ? "Cũ nhất"
                                    : filterSortValue === "latest"
                                    ? "Mới nhất"
                                    : "Bán chạy nhất"
                            }
                            clickable
                            color="secondary"
                            onDelete={(e) => {
                                e.preventDefault();
                                handleRemoveFilterSortValue(filterSortValue);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default FilterGroup;
