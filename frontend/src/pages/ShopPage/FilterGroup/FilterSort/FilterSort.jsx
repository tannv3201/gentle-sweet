import React from "react";
import classNames from "classnames/bind";
import styles from "./FilterSort.module.scss";
import MyRadio from "../../../../components/MyRadio/MyRadio";
import { ArrowDropDown } from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
const cx = classNames.bind(styles);

function FilterSort() {
    return (
        <div className={cx("filter-item")}>
            <span className={cx("filter-item-title")}>Sắp xếp</span>
            <ArrowDropDown className={cx("filter-item-icon")} />
            <RadioGroup
                className={cx("filter-item-option")}
                aria-label="gender"
                name="gender1"
            >
                <FormControlLabel
                    className={cx("option-item")}
                    value="sp-noi-bat"
                    control={<Radio color="primary" />}
                    label="Sản phẩm nổi bật"
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="gia-tang-dan"
                    control={<Radio color="primary" />}
                    label="Giá: Tăng dần"
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="gia-giam-dan"
                    control={<Radio color="primary" />}
                    label="Giá: Giảm dần"
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="a-z"
                    control={<Radio color="primary" />}
                    label="Tên: A - Z"
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="z-a"
                    control={<Radio color="primary" />}
                    label="Tên: Z - A"
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="cu-nhat"
                    control={<Radio color="primary" />}
                    label="Cũ nhất"
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="moi-nhat"
                    control={<Radio color="primary" />}
                    label="Mới nhất"
                />
                <FormControlLabel
                    className={cx("option-item")}
                    value="ban-chay-nhat"
                    control={<Radio color="primary" />}
                    label="Bán chạy nhất"
                />
            </RadioGroup>
        </div>
    );
}

export default FilterSort;
