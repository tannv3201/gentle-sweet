import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import classNames from "classnames/bind";
import styles from "./BookedList.module.scss";
import { Grid } from "@mui/material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import GButton from "../../../components/MyButton/MyButton";

import { API_IMAGE_URL } from "../../../LocalConstants";
import { VisibilityRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function BookedList({ bookingListByUser }) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const navigate = useNavigate();

    // Navigate to view detail booking
    const handleNavigateDetailBooked = (bookingId) => {
        navigate(`/quan-ly-lich-dat/${bookingId}`);
    };

    return (
        <>
            {bookingListByUser?.length !== 0 ? (
                <div className={cx("wrapper")}>
                    <div className={cx("inner")}>
                        <Grid container spacing={2}>
                            {bookingListByUser?.map((booking, idx) => (
                                <Grid key={booking?.id} item xs={12}>
                                    <div className={cx("booking-item")}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "booking-item-header"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "col-left"
                                                        )}
                                                    >
                                                        <div
                                                            className={cx(
                                                                "booking-item-createdAt"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "createdAt-label"
                                                                )}
                                                            >
                                                                Thời gian tạo:{" "}
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "createdAt-content"
                                                                )}
                                                            >
                                                                {
                                                                    booking?.created_at
                                                                }
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "booking-item-status"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "status-label"
                                                                )}
                                                            >
                                                                Trạng thái:{" "}
                                                            </span>
                                                            <span
                                                                className={
                                                                    booking?.status ===
                                                                    1
                                                                        ? cx(
                                                                              "status-content",
                                                                              "pending"
                                                                          )
                                                                        : booking?.status ===
                                                                          2
                                                                        ? cx(
                                                                              "status-content",
                                                                              "received"
                                                                          )
                                                                        : booking?.status ===
                                                                          3
                                                                        ? cx(
                                                                              "status-content",
                                                                              "scheduled"
                                                                          )
                                                                        : booking?.status ===
                                                                          4
                                                                        ? cx(
                                                                              "status-content",
                                                                              "service-start"
                                                                          )
                                                                        : booking?.status ===
                                                                          5
                                                                        ? cx(
                                                                              "status-content",
                                                                              "service-end"
                                                                          )
                                                                        : booking?.status ===
                                                                          6
                                                                        ? cx(
                                                                              "status-content",
                                                                              "cancel"
                                                                          )
                                                                        : booking?.status ===
                                                                          7
                                                                        ? cx(
                                                                              "status-content",
                                                                              "cancel-pending"
                                                                          )
                                                                        : ""
                                                                }
                                                            >
                                                                {
                                                                    booking?.status_name
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={cx(
                                                            "col-right"
                                                        )}
                                                    >
                                                        <GButton
                                                            onClick={() =>
                                                                handleNavigateDetailBooked(
                                                                    booking?.id
                                                                )
                                                            }
                                                            startIcon={
                                                                <VisibilityRounded />
                                                            }
                                                            variant="outlined"
                                                        >
                                                            Xem
                                                        </GButton>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {booking?.detailList?.map(
                                                    (bookingDetail) => (
                                                        <div
                                                            className={cx(
                                                                "serv-booking-detail"
                                                            )}
                                                            key={
                                                                bookingDetail?.id
                                                            }
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "serv-image"
                                                                )}
                                                            >
                                                                <img
                                                                    src={
                                                                        bookingDetail?.image_url
                                                                            ? `${API_IMAGE_URL}/${bookingDetail?.image_url}`
                                                                            : ""
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    "serv-wrapper"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "serv-content"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        <span
                                                                            className={cx(
                                                                                "serv-label"
                                                                            )}
                                                                        >
                                                                            Tên
                                                                            dịch
                                                                            vụ:{" "}
                                                                        </span>
                                                                        <span
                                                                            className={cx(
                                                                                "serv-name"
                                                                            )}
                                                                        >
                                                                            {
                                                                                bookingDetail?.service_name
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <span
                                                                    className={cx(
                                                                        "serv-price"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        Giá:
                                                                    </span>
                                                                    {FormatCurrency(
                                                                        bookingDetail?.unit_price
                                                                    )}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "booking-item-footer"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "booking-item-priceTotal"
                                                        )}
                                                    >
                                                        <span
                                                            className={cx(
                                                                "priceTotal-label"
                                                            )}
                                                        >
                                                            Tổng tiền:{" "}
                                                        </span>
                                                        <span
                                                            className={cx(
                                                                "priceTotal-content"
                                                            )}
                                                        >
                                                            {FormatCurrency(
                                                                booking?.price_total
                                                            )}
                                                        </span>
                                                    </div>
                                                    <GButton size="small">
                                                        Đặt lại
                                                    </GButton>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            ) : (
                <div className={cx("no-booking")}>Không có lịch hẹn</div>
            )}
        </>
    );
}

export default BookedList;
