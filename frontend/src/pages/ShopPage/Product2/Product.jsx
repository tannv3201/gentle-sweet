import React from "react";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import { FilterListRounded } from "@material-ui/icons";
import { Grid, MenuItem } from "@material-ui/core";
import MyTextField from "../../../components/MyTextField/MyTextField";

const cx = classNames.bind(styles);
const currencies = [
    {
        value: "USD",
        label: "$",
    },
];

const filterPrice = [
    {
        value: "99000",
        label: "Dưới 100.000₫",
    },
    {
        value: "249000",
        label: "100.000₫ - 250.000₫",
    },
];
function Product() {
    const [currency, setCurrency] = React.useState("EUR");

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    return (
        <div className={cx("product-wrapper")}>
            <div className={cx("product-inner")}>
                <Grid container spacing={2} className={cx("filter-wrapper")}>
                    <Grid item xs={2} className={cx("filter-title-wrapper")}>
                        <FilterListRounded
                            className={cx("filter-title-icon")}
                        />
                        <span className={cx("filter-title")}>Bộ lọc</span>
                        <div className={cx("right-divider")} />
                    </Grid>
                    <Grid item xs={2} className={cx("filter-group")}>
                        <MyTextField
                            id="outlined-select-currency"
                            select
                            label="Giá"
                            value={currency}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        >
                            {filterPrice.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </MyTextField>
                    </Grid>
                    <Grid item xs={2} className={cx("filter-group")}>
                        <MyTextField
                            id="outlined-select-currency"
                            select
                            label="Màu sắc"
                            value={currency}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        >
                            {currencies.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </MyTextField>
                    </Grid>
                    <Grid item xs={2} className={cx("filter-group")}>
                        <MyTextField
                            id="outlined-select-currency"
                            select
                            label="Kích thước"
                            value={currency}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        >
                            {currencies.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </MyTextField>
                    </Grid>
                    <Grid item xs={2} className={cx("filter-group")}>
                        <MyTextField
                            id="outlined-select-currency"
                            select
                            label="A-Z"
                            value={currency}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        >
                            {currencies.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </MyTextField>
                    </Grid>
                    <Grid item xs={2} className={cx("filter-group")}>
                        <MyTextField
                            id="outlined-select-currency"
                            select
                            label="Ngày"
                            value={currency}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        >
                            {currencies.map((option) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </MyTextField>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Product;
