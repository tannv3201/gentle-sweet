import React from "react";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { Grid } from "@mui/material";
import GRating from "../../../components/GRating/GRating";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import { useState } from "react";
import {
    HorizontalRuleRounded,
    AddRounded,
    AddShoppingCartRounded,
} from "@mui/icons-material";
import GButton from "../../../components/MyButton/MyButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const cx = classNames.bind(styles);

function ProductDetail() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    const [onSale, setOnSale] = useState(30);
    const [buyQuantity, setBuyQuantity] = useState(1);

    const handleChangeBuyQuantity = (value) => {
        setBuyQuantity(value);
    };

    const handleReduceBuyQuantity = () => {
        if (buyQuantity > 1) {
            setBuyQuantity(parseInt(buyQuantity, 10) - 1);
        }
    };

    const handleIncreaseBuyQuantity = () => {
        setBuyQuantity(parseInt(buyQuantity, 10) + 1);
    };

    const handleKeyDown = (e) => {
        if (e.key === "e" || e.key === "E") {
            // ngăn chặn kí tự "e" hoặc "E"
            e.preventDefault();
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("product-briefing")}>
                            <Grid container spacing={4}>
                                <Grid item lg={5} md={12} sm={12} xs={12}>
                                    <div
                                        className={cx(
                                            "product-briefing-img-wrapper"
                                        )}
                                    >
                                        <div
                                            className={cx(
                                                "product-briefing-img"
                                            )}
                                        >
                                            <img
                                                src="https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg"
                                                alt=""
                                            />
                                        </div>
                                        <div className={cx("")}></div>
                                    </div>
                                </Grid>
                                <Grid item lg={7} md={12} sm={12} xs={12}>
                                    <div
                                        className={cx(
                                            "product-briefing-content-wrapper"
                                        )}
                                    >
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "product-briefing-title"
                                                    )}
                                                >
                                                    <h2>Sơn nhũ mắt mèo</h2>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "product-briefing-rating"
                                                    )}
                                                >
                                                    <GRating />
                                                    <div
                                                        className={cx(
                                                            "product-briefing-sold"
                                                        )}
                                                    >
                                                        <span>
                                                            77,7k Đã bán
                                                        </span>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "product-briefing-price"
                                                    )}
                                                >
                                                    <span
                                                        className={
                                                            onSale !== 0
                                                                ? cx(
                                                                      "product-briefing-price-default",
                                                                      "onSale"
                                                                  )
                                                                : cx(
                                                                      "product-briefing-price-default"
                                                                  )
                                                        }
                                                    >
                                                        {FormatCurrency(180000)}
                                                    </span>
                                                    {onSale !== 0 && (
                                                        <>
                                                            <span
                                                                className={cx(
                                                                    "product-briefing-price-sale"
                                                                )}
                                                            >
                                                                {FormatCurrency(
                                                                    180000 -
                                                                        (180000 *
                                                                            onSale) /
                                                                            100
                                                                )}
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "sale-tag"
                                                                )}
                                                            >
                                                                {`Giảm ${onSale}%`}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "quantity-purchase"
                                                    )}
                                                >
                                                    <GButton
                                                        className={cx(
                                                            "reduce-btn"
                                                        )}
                                                        onClick={
                                                            handleReduceBuyQuantity
                                                        }
                                                        variant="outlined"
                                                    >
                                                        <HorizontalRuleRounded />
                                                    </GButton>
                                                    <input
                                                        className={cx(
                                                            "quantity-input"
                                                        )}
                                                        type="number"
                                                        size="small"
                                                        onChange={(e) => {
                                                            handleChangeBuyQuantity(
                                                                e.target.value
                                                            );
                                                        }}
                                                        min={1}
                                                        value={buyQuantity}
                                                        onKeyDown={
                                                            handleKeyDown
                                                        }
                                                    />
                                                    <GButton
                                                        className={cx(
                                                            "increase-btn"
                                                        )}
                                                        variant="outlined"
                                                        onClick={
                                                            handleIncreaseBuyQuantity
                                                        }
                                                    >
                                                        <AddRounded />
                                                    </GButton>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "cart-action"
                                                    )}
                                                >
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={6}>
                                                            <GButton
                                                                className={cx(
                                                                    "add-to-cart-btn"
                                                                )}
                                                                startIcon={
                                                                    !isMedium && (
                                                                        <AddShoppingCartRounded />
                                                                    )
                                                                }
                                                                variant="outlined"
                                                                fullWidth
                                                                size="large"
                                                            >
                                                                Thêm vào giỏ
                                                                hàng
                                                            </GButton>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <GButton
                                                                className={cx(
                                                                    "buy-now-btn"
                                                                )}
                                                                fullWidth
                                                                size="large"
                                                            >
                                                                Mua ngay
                                                            </GButton>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx("promotion")}
                                                >
                                                    <p
                                                        className={cx(
                                                            "promotion-title"
                                                        )}
                                                    >
                                                        Ưu đãi:
                                                    </p>
                                                    <ul
                                                        className={cx(
                                                            "promotion-content-list"
                                                        )}
                                                    >
                                                        <li
                                                            className={cx(
                                                                "promotion-content-item"
                                                            )}
                                                        >
                                                            Miễn phí vận chuyển
                                                        </li>
                                                    </ul>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ProductDetail;
