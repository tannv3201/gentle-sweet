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
import { GTableProductCheckout } from "../../../common/GTable/GTable";

const cx = classNames.bind(styles);

function BookedList({ bookingListByUser }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
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
                                        <Grid container>
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
                                                                !isSmall ? (
                                                                    <VisibilityRounded />
                                                                ) : (
                                                                    ""
                                                                )
                                                            }
                                                            variant="outlined"
                                                        >
                                                            {!isSmall
                                                                ? "Xem chi tiết"
                                                                : "Xem"}
                                                        </GButton>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <GTableProductCheckout
                                                    title={""}
                                                    columns={[
                                                        {
                                                            title: "Ảnh",
                                                            field: "image_url",
                                                            cellStyle: {
                                                                width: "20%",
                                                            },
                                                            render: (
                                                                rowData
                                                            ) => (
                                                                // eslint-disable-next-line jsx-a11y/alt-text
                                                                <img
                                                                    src={
                                                                        rowData?.image_url
                                                                            ? `${API_IMAGE_URL}/${rowData?.image_url}`
                                                                            : ""
                                                                    }
                                                                    style={{
                                                                        width: 60,
                                                                        height: 60,
                                                                        objectFit:
                                                                            "cover",
                                                                        borderRadius:
                                                                            "50%",
                                                                        border: "1px solid var(--primary-400)",
                                                                    }}
                                                                />
                                                            ),
                                                        },
                                                        {
                                                            title: "Tên dịch vụ",
                                                            field: "service_name",
                                                            hidden: isSmall
                                                                ? true
                                                                : false,
                                                            render: (
                                                                rowData
                                                            ) => {
                                                                return (
                                                                    <>
                                                                        <span
                                                                            className={cx(
                                                                                "service_name"
                                                                            )}
                                                                        >
                                                                            {
                                                                                rowData?.service_name
                                                                            }
                                                                        </span>
                                                                    </>
                                                                );
                                                            },
                                                        },
                                                        {
                                                            title: "Giá",
                                                            field: "unit_price",
                                                            hidden: isSmall
                                                                ? true
                                                                : false,
                                                            render: (
                                                                rowData
                                                            ) => {
                                                                return (
                                                                    <>
                                                                        <span
                                                                            className={
                                                                                rowData?.unit_price_onsale
                                                                                    ? cx(
                                                                                          "unit_price",
                                                                                          "onsale"
                                                                                      )
                                                                                    : cx(
                                                                                          "unit_price"
                                                                                      )
                                                                            }
                                                                        >
                                                                            {FormatCurrency(
                                                                                rowData?.unit_price
                                                                            )}
                                                                        </span>
                                                                        {rowData?.unit_price_onsale ? (
                                                                            <span
                                                                                className={cx(
                                                                                    "unit_price_onsale"
                                                                                )}
                                                                            >
                                                                                {FormatCurrency(
                                                                                    rowData?.unit_price_onsale
                                                                                )}
                                                                            </span>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </>
                                                                );
                                                            },
                                                        },
                                                        {
                                                            title: "Thông tin",
                                                            hidden: !isSmall
                                                                ? true
                                                                : false,
                                                            render: (
                                                                rowData
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        className={cx(
                                                                            "table_service_info"
                                                                        )}
                                                                    >
                                                                        <span
                                                                            className={cx(
                                                                                "table_service_name"
                                                                            )}
                                                                        >
                                                                            {
                                                                                rowData?.service_name
                                                                            }
                                                                        </span>
                                                                        <span
                                                                            className={cx(
                                                                                "table_service_price"
                                                                            )}
                                                                        >
                                                                            Giá:{" "}
                                                                            <span>
                                                                                {FormatCurrency(
                                                                                    rowData?.unit_price
                                                                                )}
                                                                            </span>
                                                                        </span>
                                                                    </div>
                                                                );
                                                            },
                                                        },
                                                    ]}
                                                    layout={"auto"}
                                                    data={booking?.detailList}
                                                    exportFileName={
                                                        "DanhSachSanPham"
                                                    }
                                                />
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
                                                    {/* <GButton size="small">
                                                        Đặt lại
                                                    </GButton> */}
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
