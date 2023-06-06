import React, { useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { customerGetProductById } from "../../../redux/api/apiProduct";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { API_IMAGE_URL } from "../../../LocalConstants";
import { getAllDiscountCustomer } from "../../../redux/api/apiDiscount";
import { toast } from "react-hot-toast";
import { createInvoice } from "../../../redux/api/apiInvoice";
import { createAxios } from "../../../createInstance";
import { loginSuccess, logoutSuccess } from "../../../redux/slice/authSlice";
import {
    createCart,
    getCartByUserId,
    updateCart,
} from "../../../redux/api/apiCart";
const cx = classNames.bind(styles);

function ProductDetail() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState({});

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

    const { productId } = useParams();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const getProducById = useSelector((state) => state.product.product.product);
    const discountListCustomer = useSelector(
        (state) => state.discount.discount?.discountListCustomer
    );

    useEffect(() => {
        getAllDiscountCustomer(dispatch);
    }, []);

    useEffect(() => {
        if (getProducById) {
            const discount = discountListCustomer?.find(
                (d) => d.id === parseInt(getProducById.discount_id)
            );
            const newProductDetail = {
                ...getProducById,
                discount_percent: discount?.discount_percent,
            };
            setProductDetail(structuredClone(newProductDetail));
        }
    }, [getProducById]);

    useEffect(() => {
        if (productId) {
            customerGetProductById(dispatch, productId);
        }
    }, [productId]);
    const cartList = useSelector((state) => state.cart.cart?.cartList);

    useEffect(() => {
        const fetch = async () => {
            if (user) {
                await getCartByUserId(
                    user?.accessToken,
                    dispatch,
                    user?.id,
                    axiosJWT
                );
            }
        };
        fetch();
    }, [user?.id]);

    const handleAddToCart = async () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
            return;
        }
        const cartExist = cartList?.find(
            (p) => p.product_id === productDetail?.id
        );

        if (cartExist) {
            await updateCart(
                user?.accessToken,
                dispatch,
                user?.id,
                cartExist?.id,
                {
                    product_quantity:
                        parseInt(cartExist?.product_quantity) +
                        parseInt(buyQuantity),
                },
                axiosJWT
            );
        } else {
            await createCart(
                user?.accessToken,
                dispatch,
                {
                    customer_user_id: user?.id,
                    product_id: productDetail?.id,
                    product_name: productDetail?.name,
                    product_quantity: buyQuantity,
                    unit_price: parseFloat(productDetail?.price),
                    image_url: productDetail?.image_url,
                },
                axiosJWT
            );
        }
    };
    const navigate = useNavigate();
    const handleBuyNow = () => {
        navigate("/thanh-toan", {
            state: {
                selectedProductBuyNow: [
                    {
                        customer_user_id: user?.id,
                        product_id: productDetail?.id,
                        product_name: productDetail?.name,
                        product_quantity: buyQuantity,
                        unit_price: parseFloat(productDetail?.price),
                        image_url: productDetail?.image_url,
                    },
                ],
            },
        });
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
                                                src={
                                                    productDetail?.image_url
                                                        ? `${API_IMAGE_URL}/${productDetail?.image_url}`
                                                        : ""
                                                }
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
                                                    <h3>
                                                        {productDetail?.name}
                                                    </h3>
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
                                                            productDetail?.discount_percent
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
                                                            productDetail?.price
                                                        )}
                                                    </span>
                                                    {productDetail?.discount_percent && (
                                                        <>
                                                            <span
                                                                className={cx(
                                                                    "product-briefing-price-sale"
                                                                )}
                                                            >
                                                                {FormatCurrency(
                                                                    productDetail?.price -
                                                                        (productDetail?.price *
                                                                            productDetail?.discount_percent) /
                                                                            100
                                                                )}
                                                            </span>
                                                            <span
                                                                className={cx(
                                                                    "sale-tag"
                                                                )}
                                                            >
                                                                {`Giảm ${productDetail?.discount_percent}%`}
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
                                                                onClick={
                                                                    handleAddToCart
                                                                }
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
                                                                onClick={
                                                                    handleBuyNow
                                                                }
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
                                            productDetail={productDetail}
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
