import React from "react";
import classNames from "classnames/bind";
import styles from "./FilterSort.module.scss";
import MyRadio from "../../../../components/MyRadio/MyRadio";
import { ArrowDropDown } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const cx = classNames.bind(styles);

function FilterSort({ isChecked, handleChangeFilterSort }) {
    return (
        <div className={cx("filter-item")}>
            <span className={cx("filter-item-title")}>Sắp xếp</span>
            <ArrowDropDown className={cx("filter-item-icon")} />
            <RadioGroup className={cx("filter-item-option")} name="sortFilter">
                <FormControlLabel
                    className={cx("option-item")}
                    value="featuredProduct"
                    name="featuredProduct"
                    control={<Radio color="primary" />}
                    label="Sản phẩm nổi bật"
                    checked={isChecked?.featuredProduct}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="ascendingPrice"
                    name="ascendingPrice"
                    control={<Radio color="primary" />}
                    label="Giá: Tăng dần"
                    checked={isChecked?.ascendingPrice}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="decreasePrice"
                    name="decreasePrice"
                    control={<Radio color="primary" />}
                    label="Giá: Giảm dần"
                    checked={isChecked?.decreasePrice}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="aToZ"
                    name="aToZ"
                    control={<Radio color="primary" />}
                    label="Tên: A - Z"
                    checked={isChecked?.aToZ}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="zToA"
                    name="zToA"
                    control={<Radio color="primary" />}
                    label="Tên: Z - A"
                    checked={isChecked?.zToA}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="oldest"
                    name="oldest"
                    control={<Radio color="primary" />}
                    label="Cũ nhất"
                    checked={isChecked?.oldest}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="latest"
                    name="latest"
                    control={<Radio color="primary" />}
                    label="Mới nhất"
                    checked={isChecked?.latest}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="bestseller"
                    name="bestseller"
                    control={<Radio color="primary" />}
                    label="Bán chạy nhất"
                    checked={isChecked?.bestseller}
                    onChange={(e) => handleChangeFilterSort(e)}
                />
            </RadioGroup>
        </div>
    );
}

export default FilterSort;
