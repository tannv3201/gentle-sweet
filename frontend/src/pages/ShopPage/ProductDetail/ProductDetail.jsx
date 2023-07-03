import React, { useEffect } from "react";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import { Grid, Rating } from "@mui/material";
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

import { useNavigate, useParams } from "react-router-dom";
import { customerGetProductById } from "../../../redux/api/apiProduct";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { API_IMAGE_URL } from "../../../LocalConstants";
import { getAllDiscountCustomer } from "../../../redux/api/apiDiscount";
import { toast } from "react-hot-toast";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import {
    cartSearch,
    createCart,
    getCartByUserId,
    updateCart,
} from "../../../redux/api/apiCart";
import ItemDetailDescription from "../../../components/ItemDetailDescription/ItemDetailDescription";
import Comments from "../../../components/Comments/Comments";
import { FormatCurrency } from "../../../utils/FormatCurrency/formatCurrency";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import AlertProductQuantityLimit from "../../../components/AlertProductQuantityLimit/AlertProductQuantityLimit";
import { getRatingByProductId } from "../../../redux/api/apiRating";
import GRating from "../../../components/GRating/GRating";
const cx = classNames.bind(styles);

function ProductDetail() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const dispatch = useDispatch();
    const [productDetail, setProductDetail] = useState({});

    // Alert product quantity limit
    const [
        isOpenAlertProductQuantityLimit,
        setIsOpenAlertProductQuantityLimit,
    ] = useState(false);

    const handleOpenAlertProductQuantityLimit = () => {
        setIsOpenAlertProductQuantityLimit(true);
    };

    const handleCloseAlertProductQuantityLimit = () => {
        setIsOpenAlertProductQuantityLimit(false);
    };

    const [buyQuantity, setBuyQuantity] = useState(1);
    const [tabIndex, setTabIndex] = React.useState(0);

    const handleTabChange = (event, newTabIndex) => {
        setTabIndex(newTabIndex);
    };

    const [isProductQuantityLimit, setIsProductQuantityLimit] = useState(false);
    const [isProductQuantityLimitInCart, setIsProductQuantityLimitInCart] =
        useState(false);
    const [productQuantityInCart, setProductQuantityInCart] = useState(0);

    const handleChangeBuyQuantity = async (value) => {
        const getCart = await cartSearch(productDetail?.id, user?.id);
        if (parseInt(value) > productDetail?.quantity) {
            setIsProductQuantityLimit(true);
            setBuyQuantity(productDetail?.quantity);
            return;
        }

        setBuyQuantity(value);
        setIsProductQuantityLimitInCart(false);
        setIsProductQuantityLimit(false);
    };

    const handleInputBlur = () => {
        if (
            buyQuantity === undefined ||
            buyQuantity === null ||
            buyQuantity === "" ||
            parseInt(buyQuantity) === 0
        ) {
            setBuyQuantity(1);
        }
    };

    const handleReduceBuyQuantity = () => {
        if (buyQuantity > 1) {
            setBuyQuantity(parseInt(buyQuantity, 10) - 1);
        }
        setIsProductQuantityLimit(false);
        setIsProductQuantityLimitInCart(false);
    };

    const handleIncreaseBuyQuantity = async () => {
        const getCart = await cartSearch(productDetail?.id, user?.id);
        if (getCart[0]?.product_quantity === productDetail?.quantity) {
            // setBuyQuantity(
            //     productDetail?.quantity - getCart[0]?.product_quantity
            // );
            setProductQuantityInCart(getCart[0]?.product_quantity);
            handleOpenAlertProductQuantityLimit();
            return;
        }
        if (parseInt(buyQuantity, 10) + 1 > productDetail?.quantity) {
            setBuyQuantity(productDetail?.quantity);
            setIsProductQuantityLimit(true);
            return;
        }

        setIsProductQuantityLimit(false);
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

    const [totalRating, setTotalRating] = useState(0);
    const ratingListByProduct = useSelector(
        (state) => state.rating.rating?.ratingProductList
    );

    useEffect(() => {
        if (ratingListByProduct?.length > 0) {
            const total = ratingListByProduct?.reduce(
                (accumulator, currentValue) =>
                    accumulator + currentValue?.rating,
                0
            );

            setTotalRating(Math.round(total / ratingListByProduct?.length));
        } else {
            setTotalRating(0);
        }
    }, [productId, ratingListByProduct]);

    useEffect(() => {
        document.title = getProducById?.name;
    }, [getProducById?.name, productId]);

    useEffect(() => {
        const fetch = async () => {
            await getAllDiscountCustomer(dispatch);
            await getRatingByProductId(dispatch, productId);
        };
        fetch();
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

    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        setIsAdding(true);
        if (!user) {
            toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
            return;
        }
        const getCart = await cartSearch(productDetail?.id, user?.id);

        if (getCart[0]?.product_quantity === productDetail?.quantity) {
            setProductQuantityInCart(getCart[0]?.product_quantity);
            setIsOpenAlertProductQuantityLimit(true);
            setIsProductQuantityLimit(false);
            return;
        }
        if (
            getCart[0]?.product_quantity + parseInt(buyQuantity, 10) >
            productDetail?.quantity
        ) {
            setBuyQuantity(
                productDetail?.quantity - getCart[0]?.product_quantity
            );
            setProductQuantityInCart(getCart[0]?.product_quantity);
            handleOpenAlertProductQuantityLimit();
            return;
        }

        setIsProductQuantityLimitInCart(false);
        setIsProductQuantityLimit(false);

        const cartExist = cartList?.find(
            (p) => p.product_id === productDetail?.id
        );

        if (getCart?.length === 0) {
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
            setIsAdding(false);
        } else {
            await updateCart(
                user?.accessToken,
                dispatch,
                user?.id,
                getCart[0]?.id,
                {
                    product_quantity:
                        parseInt(getCart[0]?.product_quantity) +
                        parseInt(buyQuantity),
                },
                axiosJWT
            );
            setIsAdding(false);
        }
    };
    const navigate = useNavigate();
    const handleBuyNow = () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để sử dụng chức năng này");
            return;
        }
        navigate("/thanh-toan", {
            state: {
                selectedProductBuyNow: [
                    {
                        customer_user_id: user?.id,
                        product_id: productDetail?.id,
                        product_name: productDetail?.name,
                        product_quantity: buyQuantity,
                        product_price: parseFloat(productDetail?.price),
                        image_url: productDetail?.image_url,
                        product_price_onsale: parseFloat(
                            productDetail?.price_onsale
                        ),
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
                                        {productDetail?.quantity === 0 && (
                                            <div className={cx("sold-out")}>
                                                Hết hàng
                                            </div>
                                        )}
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
                                                            <div>
                                                                <GRating
                                                                    readOnly
                                                                    value={
                                                                        totalRating
                                                                    }
                                                                    valueTotal={`${totalRating}.0/5`}
                                                                    ratingQuantity={
                                                                        ratingListByProduct?.length
                                                                    }
                                                                />
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
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
                                                                    Số lượng:
                                                                </span>
                                                                <span
                                                                    className={cx(
                                                                        "product-sold-quantity"
                                                                    )}
                                                                >
                                                                    {
                                                                        productDetail?.quantity
                                                                    }
                                                                </span>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={6}>
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
                                                                    {productDetail?.productQuantitySold
                                                                        ? productDetail?.productQuantitySold
                                                                        : 0}
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
                                                    <GTextFieldNormal
                                                        className={cx(
                                                            "quantity-input"
                                                        )}
                                                        fullWidth
                                                        size="small"
                                                        onChange={(e) => {
                                                            handleChangeBuyQuantity(
                                                                e.target.value
                                                            );
                                                        }}
                                                        onBlur={handleInputBlur}
                                                        min={1}
                                                        value={buyQuantity}
                                                        onKeyDown={
                                                            handleKeyDown
                                                        }
                                                        inputProps={{
                                                            inputMode:
                                                                "numeric",
                                                            pattern: "[0-9]*",
                                                            maxLength: 4, // Giới hạn chiều dài của số nhập vào (ví dụ 99)
                                                        }}
                                                    />
                                                    <GButton
                                                        disabled={
                                                            isProductQuantityLimit
                                                        }
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
                                                {isProductQuantityLimit && (
                                                    <div
                                                        className={cx(
                                                            "product-quantity-limit"
                                                        )}
                                                    >
                                                        Số lượng bạn chọn đã đạt
                                                        mức tối đa của sản phẩm
                                                        này.
                                                    </div>
                                                )}
                                                {isProductQuantityLimitInCart && (
                                                    <div
                                                        className={cx(
                                                            "product-quantity-limit"
                                                        )}
                                                    >
                                                        Sản phẩm đã đạt số lượng
                                                        tối đa trong giỏ hàng.
                                                    </div>
                                                )}
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
                                                                disabled={
                                                                    productDetail?.quantity ===
                                                                        0 ||
                                                                    isAdding
                                                                }
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
                                                                disabled={
                                                                    productDetail?.quantity ===
                                                                    0
                                                                }
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
                                        <ItemDetailDescription
                                            itemDetail={productDetail}
                                        />
                                    </TabPanel>
                                    <TabPanel value={tabIndex} index={1}>
                                        <Comments
                                            ratingList={ratingListByProduct}
                                        />
                                    </TabPanel>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <AlertProductQuantityLimit
                isOpen={isOpenAlertProductQuantityLimit}
                handleClose={handleCloseAlertProductQuantityLimit}
                handleOpen={handleOpenAlertProductQuantityLimit}
                productQuantityInCart={productQuantityInCart}
            />
        </div>
    );
}

export default ProductDetail;
