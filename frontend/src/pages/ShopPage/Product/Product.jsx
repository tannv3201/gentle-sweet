import React from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { FilterListRounded, ArrowDropDown } from "@material-ui/icons";
import { Grid, MenuItem } from "@material-ui/core";
import MyTextField from "../../../components/MyTextField/MyTextField";
import FilterGroup from "../FilterGroup/FilterGroup";

const cx = classNames.bind(styles);
function Product() {
    return (
        <div className={cx("product-wrapper")}>
            <div className={cx("product-inner")}>
                <FilterGroup />
            </div>
        </div>
    );
}

export default Product;
