import * as React from "react";
import { Checkbox, Radio } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./FilterGroup.module.scss";
import classNames from "classnames/bind";
import {
    FilterAltRounded,
    CheckBoxOutlineBlank,
    CheckBox,
    FilterListRounded,
    AttachMoneyRounded,
    ColorLensRounded,
} from "@mui/icons-material";
import { Grid } from "@mui/material";
import { RedditTextField } from "../../../components/GTextField/GTextField";
import GButton from "../../../components/MyButton/MyButton";
import { useState } from "react";

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const cx = classNames.bind(styles);

const priceFilterList = [
    { title: "Dưới 100.000₫" },
    { title: "100.000₫ - 250.000₫" },
    { title: "250.000₫ - 500.000₫" },
    { title: "500.000₫ - 800.000₫" },
    { title: "Trên 800.000₫" },
];

const colorFilterList = [
    { title: "Đỏ" },
    { title: "Trắng" },
    { title: "Đen" },
    { title: "Vàng" },
    { title: "Xanh lá" },
];

const sortList = [
    { title: "Tên A-Z" },
    { title: "Tên Z-A" },
    { title: "Giá tăng dần" },
    { title: "Giá giảm dần" },
    { title: "Mới nhất" },
    { title: "Cũ nhất" },
];
const DisplayLabel = ({ label, icon }) => {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "4px" }}>{label}</span>
            {icon}
        </div>
    );
};

export const FilterGroupList = () => {
    return (
        <>
            <div>
                <Grid container spacing={2}>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            multiple
                            size="small"
                            fullWidth
                            id="checkboxes-tags-demo"
                            options={priceFilterList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.title}
                                </li>
                            )}
                            renderInput={(params) => (
                                <RedditTextField
                                    {...params}
                                    label={
                                        <>
                                            <DisplayLabel
                                                label="Lọc theo giá"
                                                // icon={
                                                //     <AttachMoneyRounded fontSize="small" />
                                                // }
                                            />
                                        </>
                                    }
                                    placeholder="Chọn giá..."
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            multiple
                            size="small"
                            fullWidth
                            id="checkboxes-tags-demo"
                            options={colorFilterList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.title}
                                </li>
                            )}
                            renderInput={(params) => (
                                <RedditTextField
                                    {...params}
                                    label={
                                        <>
                                            <DisplayLabel
                                                label="Lọc theo màu sắc"
                                                // icon={
                                                //     <ColorLensRounded fontSize="small" />
                                                // }
                                            />
                                        </>
                                    }
                                    placeholder="Chọn màu sắc..."
                                />
                            )}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Autocomplete
                            size="small"
                            fullWidth
                            id="checkboxes-tags-demo"
                            options={sortList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.title}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.title}
                                </li>
                            )}
                            renderInput={(params) => (
                                <RedditTextField
                                    {...params}
                                    label={
                                        <>
                                            <DisplayLabel
                                                label="Sắp xếp"
                                                icon={<FilterListRounded />}
                                            />
                                        </>
                                    }
                                    placeholder="Chọn cách sắp xếp..."
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={cx("filter-clear")}>
                <GButton
                    color="error"
                    className={cx("filter-clear-btn")}
                    variant="outlined"
                >
                    Xóa bộ lọc
                </GButton>
            </div>
        </>
    );
};

export default function FilterGroup() {
    const [isOpenFilterGroup, setIsOpenFilterGroup] = useState(false);
    return (
        <>
            <div
                className={
                    isOpenFilterGroup
                        ? cx("wrapper", "isOpenFilterGroup")
                        : cx("wrapper")
                }
            >
                <GButton
                    endIcon={<FilterListRounded />}
                    onClick={() => setIsOpenFilterGroup(!isOpenFilterGroup)}
                >
                    Bộ lọc
                </GButton>
                <div
                    className={
                        isOpenFilterGroup
                            ? cx("inner", "isOpenFilterGroup")
                            : cx("inner")
                    }
                >
                    <FilterGroupList />
                </div>
            </div>
        </>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
