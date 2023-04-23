import React from "react";
import styles from "./CheckoutInformation.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GTextField from "../../../components/GTextField/GTextField";
import GAutocomplete from "../../../components/GAutocomplete/GAutocomplete";

const cx = classNames.bind(styles);
const provinces = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Thái Bình" },
    { id: 3, name: "Hải Phòng" },
    { id: 4, name: "Nam Định" },
    { id: 5, name: "Nghệ An" },
    { id: 6, name: "Ninh Bình" },
];

const serviceCategory = [
    { id: 1, name: "Dịch vụ nails" },
    { id: 2, name: "Dịch vụ tóc" },
    { id: 3, name: "Dịch vụ khác" },
];

const services = [
    { id: 1, name: "Sơn nhũ mắt mèo", price: 120000 },
    { id: 2, name: "Vệ sinh móng", price: 80000 },
    { id: 3, name: "Đắp gel", price: 60000 },
];

const timeDistance = [
    { id: 1, name: "7:00 - 9:00" },
    { id: 2, name: "9:00 - 11:00" },
    { id: 3, name: "13:00 - 15:00" },
    { id: 4, name: "15:00 - 17:00" },
];

function CheckoutInformation() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={cx("shipping-address")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span>
                                        <h3>Địa chỉ giao hàng</h3>
                                    </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <GTextField
                                        label={"Họ"}
                                        requiredlabel
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <GTextField
                                        label={"Tên"}
                                        requiredlabel
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <GTextField
                                        label={"Họ tên đầy đủ"}
                                        requiredlabel
                                        fullWidth
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <GTextField
                                        label={"Email"}
                                        requiredlabel
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <GTextField
                                        label={"Số điện thoại"}
                                        requiredlabel
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <GAutocomplete
                                        label={"Tỉnh/thành phố"}
                                        requiredlabel
                                        fullWidth
                                        data={provinces}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <GAutocomplete
                                        label={"Quận/huyện"}
                                        requiredlabel
                                        fullWidth
                                        data={provinces}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <GAutocomplete
                                        label={"Phường/xã"}
                                        requiredlabel
                                        fullWidth
                                        data={provinces}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <GTextField
                                        label={"Tên đường, số nhà"}
                                        requiredlabel
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default CheckoutInformation;