import React from "react";
import { Checkbox } from "@mui/material";
import styles from "./FilterDropDownCheckbox.module.scss";
import classNames from "classnames/bind";
import { FilterListRounded, ArrowDropDown } from "@mui/icons-material";

import MyCheckbox from "../../../../components/MyCheckbox/MyCheckbox";

const cx = classNames.bind(styles);

function FilterDropDownCheckbox({ filterTitle, option }) {
    return (
        <>
            <div className={cx("filter-item")}>
                <span className={cx("filter-item-title")}>{filterTitle}</span>
                <ArrowDropDown className={cx("filter-item-icon")} />
                {option}
            </div>
        </>
    );
}

export default FilterDropDownCheckbox;
