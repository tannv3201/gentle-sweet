import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CartProductList.module.scss";
import { Grid } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import { DeleteRounded } from "@mui/icons-material";
import MyCheckbox from "../../../components/MyCheckbox/MyCheckbox";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import {
    HorizontalRuleRounded,
    AddRounded,
    AddShoppingCartRounded,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import images from "../../../assets/images";
import { getCartByUserId } from "../../../redux/api/apiCart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { logoutSuccess } from "../../../redux/slice/authSlice";

const cx = classNames.bind(styles);
const productListCart = [
    {
        id: 1,
        name: "Sơn nhũ mắt mèo",
        category: "Sơn",
        image: "https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg",
        price: 90000,
        onSale: 20,
        quantity: 2,
        priceTotal: 0,
    },
    {
        id: 2,
        name: "Kéo cắt móng",
        category: "Dụng cụ",
        image: "https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg",
        price: 30000,
        onSale: 0,
        quantity: 1,
        priceTotal: 0,
    },
    {
        id: 3,
        name: "Đèn sấy",
        category: "Dụng cụ",
        image: "https://nailzone.vn/wp-content/uploads/2018/03/1200-653345560-colored-nail-polish.jpg",
        price: 145000,
        onSale: 20,
        quantity: 1,
        priceTotal: 0,
    },
];

function CartProductList() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const [productList, setProductList] = useState(productListCart);
    const handleQuantityChange = (id, newValue) => {
        const copyProductList = [...productList];
        const updatedProductList = copyProductList?.map((product, index) => {
            if (product?.id === id) {
                return {
                    ...product,
                    quantity: parseInt(newValue, 10),
                    priceTotal:
                        (product?.price -
                            (product?.price * product?.onSale) / 100) *
                        product?.quantity,
                };
            }
            return product;
        });
        setProductList(updatedProductList);
        productPriceTotal();
    };
    const productPriceTotal = () => {
        const updatedProductList = productList?.map((product, idx) => {
            return {
                ...product,
                priceTotal:
                    (product?.price -
                        (product?.price * product?.onSale) / 100) *
                    product?.quantity,
            };
        });
        setProductList(updatedProductList);
    };

    useEffect(() => {
        productPriceTotal();
    }, []);
    const decreaseQuantity = (product) => {
        if (product?.quantity > 1) {
            const newQuantity = parseInt(product?.quantity) - 1;
            handleQuantityChange(product?.id, newQuantity);
        } else {
            const confirmMessage = window.confirm(
                "Bạn có muốn xóa sản phẩm khỏi giỏ hàng?"
            );
            if (confirmMessage) {
                const copyProductList = [...productList];
                const updatedProductList = copyProductList?.filter((item) => {
                    return item.id !== product.id;
                });
                setProductList(updatedProductList);
            }
        }
    };

    const increaseQuantity = (product) => {
        const newQuantity = parseInt(product?.quantity) + 1;
        handleQuantityChange(product?.id, newQuantity);
    };

    const handleKeyDown = (e) => {
        if (e.key === "e" || e.key === "E") {
            e.preventDefault();
        }
    };

    // ============
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, logoutSuccess);

    useEffect(() => {
        getCartByUserId(user?.accessToken, dispatch, user?.id, axiosJWT);
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx("cart-header")}>
                            <span>
                                <h2>Giỏ hàng</h2>
                            </span>
                            <GButton
                                startIcon={<DeleteRounded />}
                                variant="text"
                                color="error"
                            >
                                Xóa
                            </GButton>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("table-product-list")}>
                            <Grid container>
                                {
                                    <Grid item xs={12}>
                                        <div className={cx("table-header")}>
                                            <Grid
                                                container
                                                display="flex"
                                                alignItems="center"
                                            >
                                                <Grid
                                                    item
                                                    lg={1}
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                >
                                                    <MyCheckbox
                                                        id="selecltedAll"
                                                        label={
                                                            isMedium
                                                                ? "Chọn tất cả"
                                                                : ""
                                                        }
                                                    />
                                                </Grid>
                                                {!isMedium && (
                                                    <Grid item xs={5}>
                                                        <span
                                                            className={cx(
                                                                "table-header-name"
                                                            )}
                                                        >
                                                            Sản phẩm
                                                        </span>
                                                    </Grid>
                                                )}
                                                {!isMedium && (
                                                    <Grid item xs={3}>
                                                        <span
                                                            className={cx(
                                                                "table-header-name"
                                                            )}
                                                        >
                                                            Số lượng
                                                        </span>
                                                    </Grid>
                                                )}
                                                {!isMedium && (
                                                    <Grid item xs={3}>
                                                        <span
                                                            className={cx(
                                                                "table-header-name"
                                                            )}
                                                        >
                                                            Giá
                                                        </span>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        </div>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <div className={cx("table-body")}>
                                        <Grid container>
                                            {productList?.length > 0 ? (
                                                productList?.map(
                                                    (product, idx) => (
                                                        <Grid
                                                            key={idx}
                                                            item
                                                            xs={12}
                                                        >
                                                            <div
                                                                className={cx(
                                                                    "product-wrapper"
                                                                )}
                                                            >
                                                                <MyCheckbox />
                                                                <div
                                                                    className={cx(
                                                                        "product-image"
                                                                    )}
                                                                >
                                                                    <img
                                                                        src={
                                                                            product?.image
                                                                        }
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div
                                                                    className={cx(
                                                                        "product-content"
                                                                    )}
                                                                >
                                                                    <span
                                                                        className={cx(
                                                                            "product-content-name"
                                                                        )}
                                                                    >
                                                                        {
                                                                            product?.name
                                                                        }
                                                                    </span>
                                                                    <div
                                                                        className={cx(
                                                                            "quantity-purchase"
                                                                        )}
                                                                    >
                                                                        <GButton
                                                                            className={cx(
                                                                                "reduce-btn"
                                                                            )}
                                                                            variant="outlined"
                                                                            onClick={() =>
                                                                                decreaseQuantity(
                                                                                    product
                                                                                )
                                                                            }
                                                                        >
                                                                            <HorizontalRuleRounded />
                                                                        </GButton>
                                                                        <input
                                                                            className={cx(
                                                                                "quantity-input"
                                                                            )}
                                                                            type="number"
                                                                            size="small"
                                                                            onChange={(
                                                                                e
                                                                            ) => {
                                                                                handleQuantityChange(
                                                                                    product?.id,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                );
                                                                            }}
                                                                            min={
                                                                                1
                                                                            }
                                                                            value={
                                                                                product?.quantity
                                                                            }
                                                                            onKeyDown={
                                                                                handleKeyDown
                                                                            }
                                                                        />
                                                                        <GButton
                                                                            className={cx(
                                                                                "increase-btn"
                                                                            )}
                                                                            onClick={() =>
                                                                                increaseQuantity(
                                                                                    product
                                                                                )
                                                                            }
                                                                            variant="outlined"
                                                                        >
                                                                            <AddRounded />
                                                                        </GButton>
                                                                    </div>
                                                                    <div
                                                                        className={
                                                                            product?.onSale >
                                                                            0
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
                                                                                product?.priceTotal
                                                                            )}
                                                                        </span>
                                                                        {product?.onSale >
                                                                            0 && (
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
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    )
                                                )
                                            ) : (
                                                <Grid item xs={12}>
                                                    <div
                                                        className={cx(
                                                            "no-product"
                                                        )}
                                                    >
                                                        Không có sản phẩm
                                                    </div>
                                                </Grid>
                                            )}
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

export default CartProductList;
