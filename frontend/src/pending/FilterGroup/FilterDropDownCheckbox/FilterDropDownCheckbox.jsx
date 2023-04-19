import React from "react";
import { Checkbox } from "@mui/material";
import styles from "./FilterDropDownCheckbox.module.scss";
import classNames from "classnames/bind";
import { FilterListRounded, ArrowDropDown } from "@mui/icons-material";

import MyCheckbox from "../../../../components/MyCheckbox/MyCheckbox";
import { useState } from "react";

const cx = classNames.bind(styles);

function FilterDropDownCheckbox({ filterTitle, option }) {
    const [isOpenDropDown, setIsOpenDropDown] = useState(false);

    const handleToggleDropDown = () => {
        setIsOpenDropDown(!isOpenDropDown);
    };

    return (
        <>
            <div className={cx("filter-item")} onClick={handleToggleDropDown}>
                <span className={cx("filter-item-title")}>{filterTitle}</span>
                <ArrowDropDown className={cx("filter-item-icon")} />
                {option}
            </div>
        </>
    );
}

export default FilterDropDownCheckbox;
