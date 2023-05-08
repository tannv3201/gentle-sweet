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
import AppBar from "@mui/material/AppBar";
import TabPanel from "../../../components/TabPanel/TabPanel";
import MyTabs from "../../../components/TabPanel/Tabs";
import MyTab from "../../../components/TabPanel/Tab";
import ProductDescription from "./ProductDescription/ProductDescription";
import ProductRating from "./ProductRating/ProductRating";
const cx = classNames.bind(styles);

const productInfo = {
    name: "Sơn nhũ mắt mèo",
    category: "Sơn",
    image: "https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg",
    price: 90000,
    onSale: 20,
    description1:
        "Tẩy trang là bước làm sạch quan trọng không thể thiếu trong chu trình chăm sóc da hằng ngày của chị em. Sử dụng sản phẩm tẩy trang không chỉ làm sạch sâu cho làn da mà còn giúp da có vẻ ngoài mịn màng, trắng sáng.",
    description2:
        "Nếu bạn nghĩ rằng chỉ sữa rửa mặt là đủ giúp làm sạch hết bụi bẩn, dầu nhờn trên da, giúp da sạch thoáng thì đây là quan điểm khá sai lầm. Cả sữa rửa mặt hay nước tẩy trang đều là những sản phẩm vô cùng cần thiết, đóng vai trò khác nhau và không thể thiếu trong chu trình chăm sóc da mỗi ngày.",
};

function ProductDetail() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));

    const [onSale, setOnSale] = useState(30);
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

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
                                                src={productInfo?.image}
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
                                                    <h2>{productInfo?.name}</h2>
                                                </span>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div
                                                    className={cx(
                                                        "product-briefing-rating"
                                                    )}
                                                >
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12}>
                                                            <GRating
                                                                quantitylabel
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <div
                                                                className={cx(
                                                                    "product-briefing-sold"
                                                                )}
                                                            >
                                                                <span
                                                                    className={cx(
                                                                        "product-sold-title"
                                                                    )}
                                                                >
                                                                    Đã bán:
                                                                </span>
                                                                <span
                                                                    className={cx(
                                                                        "product-sold-quantity"
                                                                    )}
                                                                >
                                                                    77,7k
                                                                    <span
                                                                        className={cx(
                                                                            "unit-name"
                                                                        )}
                                                                    >
                                                                        Sản phẩm
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
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
                                                            productInfo?.onSale !==
                                                            0
                                                                ? cx(
                                                                      "product-briefing-price-default",
                                                                      "onSale"
                                                                  )
                                                                : cx(
                                                                      "product-briefing-price-default"
                                                                  )
                                                        }
                                                    >
                                                        {FormatCurrency(
                                                            productInfo?.price
                                                        )}
                                                    </span>
                                                    {productInfo?.onSale !==
                                                        0 && (
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
                                                                {`Giảm ${productInfo?.onSale}%`}
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
                                                                style={
                                                                    isMedium
                                                                        ? {
                                                                              padding:
                                                                                  "7px 2px",
                                                                          }
                                                                        : {}
                                                                }
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
                    <Grid item xs={12}>
                        <div className={cx("product-description")}>
                            <div className={cx("wrapper-appbar")}>
                                <AppBar
                                    style={{ overflow: "hidden" }}
                                    position="static"
                                    color="default"
                                >
                                    <div className={cx("header-tabs")}>
                                        <MyTabs
                                            value={tabIndex}
                                            onChange={handleTabChange}
                                            className={cx(
                                                "tabspanel-container"
                                            )}
                                            indicatorColor="secondary"
                                            textColor="secondary"
                                        >
                                            <MyTab
                                                bgPrimary
                                                label={"Mô tả"}
                                                className={cx("tabpanel")}
                                            />
                                            <MyTab
                                                bgPrimary
                                                label={"Đánh giá"}
                                                className={cx("tabpanel")}
                                            />
                                        </MyTabs>
                                    </div>
                                </AppBar>
                                <div className={cx("tabpanel-container")}>
                                    <TabPanel value={tabIndex} index={0}>
                                        <ProductDescription
                                            productInfor={productInfo}
                                        />
                                    </TabPanel>
                                    <TabPanel value={tabIndex} index={1}>
                                        <ProductRating />
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ProductDetail;
