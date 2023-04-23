/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import classNames from "classnames/bind";
import styles from "./SummaryPayment.module.scss";
import { Grid } from "@mui/material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { useEffect } from "react";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import GButton from "../../../components/MyButton/MyButton";
const cx = classNames.bind(styles);
const productListCart = [
    {
        name: "Sơn nhũ mắt mèo",
        category: "Sơn",
        image: "https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg",
        price: 90000,
        onSale: 20,
        quantity: 2,
    },
    {
        name: "Kéo cắt móng",
        category: "Dụng cụ",
        image: "https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg",
        price: 30000,
        onSale: 0,
        quantity: 1,
    },
    {
        name: "Đèn sấy",
        category: "Dụng cụ",
        image: "https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg",
        price: 145000,
        onSale: 20,
        quantity: 1,
    },
];

function SummaryPayment() {
    const [bookedService, setBookedService] = useState({
        title: "Sơn nhũ mắt mèo",
        date: "18/04/2023",
        time: "7:00 - 9:00",
        startTime: "7:00 - 18/04/2023",
        endTime: "7:00 - 18/04/2023",
        price: 112000,
    });

    const [temporary, setTemporary] = useState(0);

    const handleTemporaryPrice = (productList) => {
        const totalTemporaryPrice = productList?.reduce((total, product) => {
            return (
                (total +
                    (product?.price -
                        (product?.price * product?.onSale) / 100)) *
                product?.quantity
            );
        }, 0);

        return totalTemporaryPrice;
    };

    useEffect(() => {
        const temporary = handleTemporaryPrice(productListCart);
        setTemporary(temporary);
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                {Object.keys(bookedService).length !== 0 ? (
                    <div>
                        <div className={cx("payment-summary")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <span
                                        className={cx("payment-summary-title")}
                                    >
                                        <h2>Đơn hàng của bạn</h2>
                                    </span>
                                </Grid>
                                {productListCart?.map((product, idx) => (
                                    <Grid key={idx} item xs={12}>
                                        <div className={cx("payment-product")}>
                                            <div
                                                className={cx("product-image")}
                                            >
                                                <img
                                                    src={product?.image}
                                                    alt=""
                                                />
                                            </div>
                                            <div className={cx("product-info")}>
                                                <span
                                                    className={cx(
                                                        "product-name"
                                                    )}
                                                >
                                                    {product?.name}
                                                </span>
                                                <div
                                                    className={
                                                        product?.onSale > 0
                                                            ? cx(
                                                                  "product-price",
                                                                  "onSale"
                                                              )
                                                            : cx(
                                                                  "product-price"
                                                              )
                                                    }
                                                >
                                                    <span
                                                        className={cx(
                                                            "product-price-default"
                                                        )}
                                                    >
                                                        {FormatCurrency(
                                                            product?.price
                                                        )}
                                                    </span>
                                                    {product?.onSale > 0 && (
                                                        <span
                                                            className={cx(
                                                                "product-price-onsale"
                                                            )}
                                                        >
                                                            {FormatCurrency(
                                                                product?.price -
                                                                    (product?.price *
                                                                        product?.onSale) /
                                                                        100
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                                <span
                                                    className={cx(
                                                        "product-quantity"
                                                    )}
                                                >
                                                    Số lượng:{" "}
                                                    {product?.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                        <div className={cx("price-summary")}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <div
                                                className={cx("discount-code")}
                                            >
                                                <Grid container spacing={1}>
                                                    <Grid item xs={8}>
                                                        <GTextFieldNormal
                                                            label="Mã giảm giá"
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={4}>
                                                        <GButton
                                                            className={cx(
                                                                "discount-code-btn"
                                                            )}
                                                            fullWidth
                                                            variant="outlined"
                                                        >
                                                            Áp dụng
                                                        </GButton>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div
                                                className={cx(
                                                    "signup-recommend"
                                                )}
                                            >
                                                <span>
                                                    <a
                                                        className={cx(
                                                            "signup-recommend-link"
                                                        )}
                                                        href="#"
                                                    >
                                                        Đăng ký
                                                    </a>{" "}
                                                    ngay để nhận ưu đãi !
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div className={cx("pricing")}>
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "subtotal"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "subtotal-title"
                                                                )}
                                                            >
                                                                Tạm tính
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "subtotal-price"
                                                                )}
                                                            >
                                                                {FormatCurrency(
                                                                    180000
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "discount"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "discount-title"
                                                                )}
                                                            >
                                                                Giảm giá
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "discount-price"
                                                                )}
                                                            >
                                                                -
                                                                {FormatCurrency(
                                                                    0
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "shipment"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "shipment-title"
                                                                )}
                                                            >
                                                                Chi phí vận
                                                                chuyển
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "shipment-price"
                                                                )}
                                                            >
                                                                {FormatCurrency(
                                                                    15000
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "grand-total"
                                                            )}
                                                        >
                                                            <span
                                                                className={cx(
                                                                    "grand-total-title"
                                                                )}
                                                            >
                                                                Tổng cộng
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "grand-total-price"
                                                                )}
                                                            >
                                                                {FormatCurrency(
                                                                    195000
                                                                )}
                                                            </span>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <GButton
                                                className={cx(
                                                    "continue-payment"
                                                )}
                                                size="medium"
                                                fullWidth
                                            >
                                                Tiếp tục thanh toán
                                            </GButton>
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
                                        className={cx("booking-summary-title")}
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
    );
}

export default SummaryPayment;
