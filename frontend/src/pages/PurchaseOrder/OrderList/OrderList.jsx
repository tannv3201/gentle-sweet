import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import classNames from "classnames/bind";
import styles from "./OrderList.module.scss";
import { Grid } from "@mui/material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import GButton from "../../../components/MyButton/MyButton";

import { API_IMAGE_URL } from "../../../LocalConstants";
import { useNavigate } from "react-router-dom";
import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
const cx = classNames.bind(styles);

function OrderList({ invoiceListByUser }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const handleNavigateOrderDetail = (invoiceId) => {
        navigate(`/don-mua/${invoiceId}`);
    };
    return (
        <>
            {invoiceListByUser?.length !== 0 ? (
                <div className={cx("wrapper")}>
                    <div className={cx("inner")}>
                        <Grid container spacing={2}>
                            {invoiceListByUser?.map((invoice, idx) => (
                                <Grid key={invoice?.id} item xs={12}>
                                    <div className={cx("invoice-item")}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "invoice-item-header"
                                                    )}
                                                >
                                                    <div>
                                                        <div
                                                            className={cx(
                                                                "invoice-item-createdAt"
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
                                                                    invoice?.created_at
                                                                }
                                                            </span>
                                                        </div>
                                                        <div
                                                            className={cx(
                                                                "invoice-item-status"
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
                                                                    invoice?.status ===
                                                                    1
                                                                        ? cx(
                                                                              "status-content",
                                                                              "pending"
                                                                          )
                                                                        : invoice?.status ===
                                                                          2
                                                                        ? cx(
                                                                              "status-content",
                                                                              "received"
                                                                          )
                                                                        : invoice?.status ===
                                                                          3
                                                                        ? cx(
                                                                              "status-content",
                                                                              "product-waiting"
                                                                          )
                                                                        : invoice?.status ===
                                                                          4
                                                                        ? cx(
                                                                              "status-content",
                                                                              "delivering"
                                                                          )
                                                                        : invoice?.status ===
                                                                          5
                                                                        ? cx(
                                                                              "status-content",
                                                                              "delivered"
                                                                          )
                                                                        : invoice?.status ===
                                                                          6
                                                                        ? cx(
                                                                              "status-content",
                                                                              "cancel"
                                                                          )
                                                                        : invoice?.status ===
                                                                          7
                                                                        ? cx(
                                                                              "status-content",
                                                                              "cancel-pending"
                                                                          )
                                                                        : ""
                                                                }
                                                            >
                                                                {
                                                                    invoice?.status_name
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <GButton
                                                        className={cx(
                                                            "see-detail"
                                                        )}
                                                        variant="outlined"
                                                        startIcon={
                                                            !isSmall ? (
                                                                <VisibilityRounded />
                                                            ) : (
                                                                ""
                                                            )
                                                        }
                                                        onClick={() =>
                                                            handleNavigateOrderDetail(
                                                                invoice?.id
                                                            )
                                                        }
                                                    >
                                                        {isSmall
                                                            ? "Xem"
                                                            : "Xem chi tiết"}
                                                    </GButton>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {invoice?.detailList?.map(
                                                    (invoiceDetail) => (
                                                        <div
                                                            className={cx(
                                                                "prod-invoice-detail"
                                                            )}
                                                            key={
                                                                invoiceDetail?.id
                                                            }
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "prod-image"
                                                                )}
                                                            >
                                                                <img
                                                                    src={
                                                                        invoiceDetail?.image_url
                                                                            ? `${API_IMAGE_URL}/${invoiceDetail?.image_url}`
                                                                            : ""
                                                                    }
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div
                                                                className={cx(
                                                                    "prod-wrapper"
                                                                )}
                                                            >
                                                                <div
                                                                    className={cx(
                                                                        "prod-content"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        <span
                                                                            className={cx(
                                                                                "prod-label"
                                                                            )}
                                                                        >
                                                                            Tên
                                                                            sản
                                                                            phẩm:{" "}
                                                                        </span>
                                                                        <span
                                                                            className={cx(
                                                                                "prod-name"
                                                                            )}
                                                                        >
                                                                            {
                                                                                invoiceDetail?.product_name
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                    <span>
                                                                        <span
                                                                            className={cx(
                                                                                "prod-label"
                                                                            )}
                                                                        >
                                                                            Số
                                                                            lượng:{" "}
                                                                        </span>
                                                                        <span
                                                                            className={cx(
                                                                                "prod-quantity"
                                                                            )}
                                                                        >
                                                                            {
                                                                                invoiceDetail?.product_quantity
                                                                            }
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <span
                                                                    className={cx(
                                                                        "prod-price"
                                                                    )}
                                                                >
                                                                    <span>
                                                                        Giá:
                                                                    </span>
                                                                    {FormatCurrency(
                                                                        invoiceDetail?.unit_price
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
                                                        "invoice-item-footer"
                                                    )}
                                                >
                                                    <div
                                                        className={cx(
                                                            "invoice-item-priceTotal"
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
                                                                invoice?.price_total
                                                            )}
                                                        </span>
                                                    </div>
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
                <div className={cx("no-invoice")}>Không có đơn hàng</div>
            )}
        </>
    );
}

export default OrderList;
