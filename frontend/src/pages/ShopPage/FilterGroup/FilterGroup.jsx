import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./FilterGroup.module.scss";
import { FilterListRounded } from "@material-ui/icons";
import { Chip, Grid } from "@material-ui/core";
import FilterPrice from "./FilterPrice/FilterPrice";
import FilterSize from "./FilterSize/FilterSize";
import FilterColor from "./FilterColor/FilterColor";
import FilterSort from "./FilterSort/FilterSort";

const cx = classNames.bind(styles);

function FilterGroup() {
    const [filterPriceValue, setFilterPriceValue] = useState([]);

    const [isCheckedPrice, setIsCheckedPrice] = useState({
        optionPrice1: false,
        optionPrice2: false,
        optionPrice3: false,
        optionPrice4: false,
        optionPrice5: false,
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

    const handleRemoveFilterPriceValue = (value) => {
        const keys = Object.keys(isCheckedPrice);
        keys.map((key) => {
            if (key === value) {
                return (isCheckedPrice[key] = false);
            }
        });

        const newArr = filterPriceValue.filter((v) => v !== value);
        setFilterPriceValue(newArr);
    };

    console.log(filterPriceValue);
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
                        <FilterSize />
                    </Grid>
                    <Grid item xs={2}>
                        <FilterColor />
                    </Grid>
                    <Grid item xs={3}>
                        <FilterSort />
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
                </div>
            </div>
        </div>
    );
}

export default FilterGroup;
