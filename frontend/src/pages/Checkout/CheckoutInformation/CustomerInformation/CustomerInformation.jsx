import * as React from "react";
import { RedditTextField } from "../../../../components/GTextField/GTextField";
import classNames from "classnames/bind";
import styles from "./CustomerInformation.module.scss";
import { Grid } from "@mui/material";
import GAutocomplete from "../../../../components/GAutocomplete/GAutocomplete";
import { useState } from "react";

const cx = classNames.bind(styles);
const provinces = [
    { id: 1, name: "Hà Nội" },
    { id: 2, name: "Thái Bình" },
    { id: 3, name: "Hải Phòng" },
    { id: 4, name: "Nam Định" },
    { id: 5, name: "Nghệ An" },
    { id: 6, name: "Ninh Bình" },
];
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

export default function CustomerInformation() {
    const [firstName, setFistName] = useState("");
    const [lastName, setLastName] = useState("");
    const fullName =
        firstName || lastName ? lastName.trim() + " " + firstName.trim() : "";
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
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Họ"
                            id="lastName"
                            requiredlabel
                            fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Tên"
                            requiredlabel
                            fullWidth
                            onChange={(e) => setFistName(e.target.value)}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Tên hiển thị"
                            requiredlabel
                            fullWidth
                            disabled
                            value={fullName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <GroupLabel
                            htmlFor="email"
                            label={"Thông tin liên hệ"}
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Địa chỉ e-mail"
                            requiredlabel
                            fullWidth
                            id="email"
                        />
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
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
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            variant="filled"
                            label="Tỉnh/Thành phố"
                            fullWidth
                            id="address"
                            data={provinces}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            variant="filled"
                            label="Quận/Huyện"
                            fullWidth
                            data={provinces}
                        />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <GAutocomplete
                            variant="filled"
                            label="Phường/Xã"
                            fullWidth
                            data={provinces}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <RedditTextField
                            variant="filled"
                            label="Số nhà"
                            requiredlabel
                            fullWidth
                            multiline
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
