/* eslint-disable jsx-a11y/anchor-is-valid */

import * as React from "react";

import { RedditTextField } from "../../../../components/GTextField/GTextField";
import classNames from "classnames/bind";
import styles from "./StepperConfirm.module.scss";
import { Grid } from "@mui/material";
import images from "../../../../assets/images";
import { FormatCurrency } from "../../../../components/FormatCurrency/FormatCurrency";

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
                    fontWeight: "var(--fw-semi-bold)",
                    userSelect: "none",
                }}
            >
                {label}
            </label>
        </div>
    );
};

const InfoGroup = ({ label, title, linkTo }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <label
                style={{
                    fontSize: "1.4rem",
                    textTransform: "uppercase",
                    color: "rgba(0, 0, 0, 0.38)",
                    fontWeight: "var(--fw-semi-bold)",
                    marginBottom: "2px",
                }}
                htmlFor=""
            >
                {label}
            </label>
            {!linkTo ? (
                <span
                    style={{
                        fontSize: "1.6rem",
                        color: "var(--text-primary)",
                        fontWeight: "var(--fw-medium)",
                    }}
                >
                    {title}
                </span>
            ) : (
                <a
                    style={{
                        fontSize: "1.6rem",
                        color: "var(--text-primary)",
                        fontWeight: "var(--fw-medium)",
                    }}
                    href={linkTo}
                    target="_blank"
                    rel="noreferrer"
                >
                    {title}
                </a>
            )}
        </div>
    );
};

export default function StepperConfirm() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <span className={cx("confirm-title")}>
                            <h2>Xác nhận thông tin</h2>
                        </span>
                        <span className={cx("confirm-sub-title")}>
                            <p>
                                Vui lòng kiểm tra lại thông tin đặt lịch của bạn
                                và đảm bảo các thông tin chính xác.
                            </p>
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("customer-info")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <GroupLabel label="Thông tin khách hàng" />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="Họ và tên"
                                        title="Nguyễn Văn Tân"
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="E - mail"
                                        title="tannv.3201@gmail.com"
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="Số điện thoại"
                                        title="0386653766"
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="Địa chỉ"
                                        title="175, Tây Sơn, Đống Đa, Hà Nội"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("service-info")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <GroupLabel label="Thông tin dịch vụ" />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="Tên dịch vụ"
                                        title="Đắp gel"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoGroup
                                        label="Đơn giá"
                                        title={FormatCurrency(120000)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoGroup
                                        label="Ngày đặt"
                                        title="18/04/2023"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoGroup
                                        label="Khung giờ"
                                        title="7:00 - 9:00"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoGroup label="Khu vực" title="Hà Nội" />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="Cơ sở"
                                        title="Gentle 175, Tây Sơn, Đống Đa, Hà Nội"
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("note")}>
                            <span className={cx("note-title")}>
                                Lưu ý{" "}
                                <span
                                    style={{ color: "red", fontSize: "1.6rem" }}
                                >
                                    *
                                </span>
                            </span>
                            <p className={cx("note-description")}>
                                <ol>
                                    <li>
                                        Quý khách hàng vui lòng kiểm tra đầy đủ
                                        thông tin cá nhân, thông tin dịch vụ
                                        muốn đặt.
                                    </li>
                                    <li>
                                        Yêu cầu quý khách hàng tuân thủ chính
                                        sách đặt/hủy lịch của chúng tôi. <br />
                                        <a
                                            className={cx(
                                                "polycies-guidelines-link"
                                            )}
                                            href="#"
                                        >
                                            Chi tiết xem tại đây.
                                        </a>
                                    </li>
                                </ol>
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <article className={cx("thanks")}>
                            Chúng tôi xin chân thành cảm ơn quý khách đã đặt
                            lịch dịch vụ của chúng tôi. Chúng tôi sẽ sớm liên hệ
                            lại với quý khách để xác nhận lịch hẹn. Nếu quý
                            khách có bất kỳ câu hỏi hoặc yêu cầu hỗ trợ nào, vui
                            lòng liên hệ với chúng tôi theo thông tin bên dưới.
                            Một lần nữa, chúng tôi cảm ơn quý khách đã tin tưởng
                            và sử dụng dịch vụ của chúng tôi.
                        </article>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("contact-info")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span className={cx("contact-info-title")}>
                                        Thông tin liên hệ
                                    </span>
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoGroup
                                        label="SPA"
                                        title="Gentle Beauty"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <InfoGroup
                                        label="Hotlines"
                                        title="1900 8198"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoGroup
                                        label="Facebook"
                                        title="Gentle Beauty"
                                        linkTo="https://www.facebook.com/nheoSoSweet/"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <InfoGroup
                                        label="Instagram"
                                        title="Gentle Beauty"
                                        linkTo="https://www.instagram.com/nheososweet/"
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="Email"
                                        title="spa.gentlebeauty@gmail.com"
                                    />
                                </Grid>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <InfoGroup
                                        label="Trụ sở chính"
                                        title="175, Tây Sơn, Đống Đa, Hà Nội"
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
