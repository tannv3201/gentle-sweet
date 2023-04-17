import * as React from "react";

import GTextField, {
    RedditTextField,
} from "../../../../../components/GTextField/GTextField";
import classNames from "classnames/bind";
import styles from "./StepperInformation.module.scss";
import { Grid } from "@mui/material";
import GAutocomplete from "../../../../../components/GAutocomplete/GAutocomplete";

const cx = classNames.bind(styles);

const GroupLabel = ({ htmlFor, label }) => {
    return (
        <div
            style={{
                marginBottom: "-8px",
            }}
        >
            <label
                htmlFor={htmlFor}
                style={{
                    fontSize: "1.8rem",
                    fontWeight: "var(--fw-medium)",
                    userSelect: "none",
                }}
            >
                {label}
            </label>
        </div>
    );
};

export default function StepperInformation() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <span className={cx("info-title")}>
                            <h2>Thông tin cá nhân</h2>
                        </span>
                        <span className={cx("info-sub-title")}>
                            <p>
                                Sử dụng thông tin của tài khoản đã đăng ký hoặc
                                thêm thông tin mới của bạn.
                            </p>
                        </span>
                    </Grid>

                    <Grid item xs={12}>
                        <GroupLabel htmlFor={"lastName"} label={"Họ và tên"} />
                    </Grid>
                    <Grid item xs={6}>
                        <RedditTextField
                            variant="filled"
                            label="Họ"
                            id="lastName"
                            requiredlabel
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RedditTextField
                            variant="filled"
                            label="Tên"
                            requiredlabel
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Tên hiển thị"
                            requiredlabel
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <GroupLabel
                            htmlFor="email"
                            label={"Thông tin liên hệ"}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Địa chỉ e-mail"
                            requiredlabel
                            fullWidth
                            id="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Số điện thoại"
                            requiredlabel
                            fullWidth
                            id="phoneNumber"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <GroupLabel htmlFor="address" label={"Địa chỉ"} />
                    </Grid>
                    <Grid item xs={4}>
                        <GAutocomplete
                            variant="filled"
                            label="Tỉnh/Thành phố"
                            requiredlabel
                            fullWidth
                            id="address"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <GAutocomplete
                            variant="filled"
                            label="Tỉnh/Thành phố"
                            requiredlabel
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <GAutocomplete
                            variant="filled"
                            label="Tỉnh/Thành phố"
                            requiredlabel
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Số nhà"
                            requiredlabel
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
