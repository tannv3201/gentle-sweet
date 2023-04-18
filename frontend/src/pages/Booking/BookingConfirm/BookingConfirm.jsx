/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import classNames from "classnames/bind";
import styles from "./BookingConfirm.module.scss";
import { Grid } from "@mui/material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";

const cx = classNames.bind(styles);
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
function BookingConfirm() {
    const [bookedService, setBookedService] = useState({
        // title: "Sơn nhũ mắt mèo",
        // date: "18/04/2023",
        // time: "7:00 - 9:00",
        // startTime: "7:00 - 18/04/2023",
        // endTime: "7:00 - 18/04/2023",
        // price: 112000,
    });
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div
                    style={{
                        position: "relative",
                        flex: "1",
                        height: "100%",
                    }}
                >
                    {Object.keys(bookedService).length !== 0 ? (
                        <div
                            style={{
                                position: "sticky",
                                top: "128px",
                            }}
                        >
                            <div className={cx("booking-summary")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <span
                                            className={cx(
                                                "booking-summary-title"
                                            )}
                                        >
                                            <h2>Tóm tắt đặt lịch</h2>
                                        </span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("booked-service")}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <InfoGroup
                                                        label="Tên dịch vụ"
                                                        title={
                                                            bookedService?.title
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <InfoGroup
                                                        label="Giá"
                                                        title={FormatCurrency(
                                                            bookedService?.price ||
                                                                null
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <InfoGroup
                                                        label="Ngày đặt"
                                                        title={
                                                            bookedService?.date
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <InfoGroup
                                                        label="Khung giờ"
                                                        title={
                                                            bookedService?.time
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <InfoGroup
                                                        label="Thời gian bắt đầu"
                                                        title={
                                                            bookedService?.startTime
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item lg={6}>
                                                    <InfoGroup
                                                        label="Thời gian kết thúc"
                                                        title={
                                                            bookedService?.endTime
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item lg={12}>
                                                    <a
                                                        className={cx(
                                                            "change-selection"
                                                        )}
                                                        href=""
                                                    >
                                                        Thay đổi lựa chọn
                                                    </a>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={cx("price-summary")}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <span>
                                                    <h3>Tóm tắt giá</h3>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "child-price-summary"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "child-price-title"
                                                        )}
                                                    >
                                                        Dịch vụ:
                                                    </span>
                                                    <span
                                                        className={cx(
                                                            "child-price"
                                                        )}
                                                    >
                                                        {FormatCurrency(
                                                            bookedService?.price
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "child-price-summary"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "child-price-title"
                                                        )}
                                                    >
                                                        VAT:
                                                    </span>
                                                    <span
                                                        className={cx(
                                                            "child-price"
                                                        )}
                                                    >
                                                        0
                                                    </span>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <hr />
                                                <div
                                                    className={cx(
                                                        "temporary-price-wrapper"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "temporary-price-title"
                                                        )}
                                                    >
                                                        Tạm tính:
                                                    </span>
                                                    <span
                                                        className={cx(
                                                            "temporary-price"
                                                        )}
                                                    >
                                                        {FormatCurrency(
                                                            bookedService?.price
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className={cx(
                                                        "total-price-wrapper"
                                                    )}
                                                >
                                                    <span
                                                        className={cx(
                                                            "total-price-title"
                                                        )}
                                                    >
                                                        Tổng tiền:
                                                    </span>
                                                    <span
                                                        className={cx(
                                                            "total-price"
                                                        )}
                                                    >
                                                        {FormatCurrency(
                                                            bookedService?.price
                                                        )}
                                                    </span>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <a
                                                    className={cx(
                                                        "request-booking-btn"
                                                    )}
                                                >
                                                    Gửi yêu cầu đặt lịch
                                                </a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                position: "sticky",
                                top: "128px",
                            }}
                        >
                            <div className={cx("booking-summary")}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <span
                                            className={cx(
                                                "booking-summary-title"
                                            )}
                                        >
                                            <h2>Tóm tắt đặt lịch</h2>
                                        </span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={cx("booked-service")}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Skeleton
                                                        variant="rounded"
                                                        width="100%"
                                                        height={48}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Skeleton
                                                        variant="rounded"
                                                        width="100%"
                                                        height={48}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Skeleton
                                                        variant="rounded"
                                                        width="100%"
                                                        height={48}
                                                    />
                                                </Grid>
                                                <Grid item lg={12}>
                                                    <Skeleton
                                                        variant="rounded"
                                                        width="36%"
                                                        height={24}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={cx("price-summary")}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Skeleton
                                                    variant="rounded"
                                                    width="36%"
                                                    height={24}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Skeleton
                                                    variant="rounded"
                                                    width="100%"
                                                    height={48}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Skeleton
                                                    variant="rounded"
                                                    width="100%"
                                                    height={48}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Skeleton
                                                    variant="rounded"
                                                    width="100%"
                                                    height={32}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookingConfirm;
