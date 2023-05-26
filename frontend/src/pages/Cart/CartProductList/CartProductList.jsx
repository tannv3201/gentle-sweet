import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CartProductList.module.scss";
import { Grid, IconButton } from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import { DeleteRounded, RemoveRounded } from "@mui/icons-material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import { AddRounded } from "@mui/icons-material";
import { getCartByUserId, updateCart } from "../../../redux/api/apiCart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { API_IMAGE_URL } from "../../../LocalConstants";
import GTable from "../../../common/GTable/GTable";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import ConfirmRemoveCartItem from "./ConfirmRemoveCartItem";
import { getAllDiscountCustomer } from "../../../redux/api/apiDiscount";
import { getProductLimit } from "../../../redux/api/apiProduct";
import CartProductSummary from "./CartProductSummary/CartProductSummary";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const cx = classNames.bind(styles);

function CartProductList() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedProductCartList, setSelectedProductCartList] = useState([]);

    const columns = [
        {
            title: "Ảnh",
            field: "image_url",
            render: (rowData) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                    src={`${API_IMAGE_URL}/${rowData?.image_url}`}
                    style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: "50%",
                    }}
                />
            ),
        },
        {
            title: "Sản phẩm",
            field: "product_name",
            render: (rowData) => {
                const rowId = rowData.tableData.id;

                return (
                    <>
                        <span className={cx("prod-name-mobile")}>
                            {rowData?.product_name}
                        </span>
                        {isMedium && (
                            <div
                                style={{
                                    display: "flex",
                                    width: "130px",
                                    marginTop: "4px",
                                }}
                            >
                                <IconButton
                                    onClick={() => handleDecrease(rowData)}
                                >
                                    <RemoveRounded />
                                </IconButton>
                                <GTextFieldNormal
                                    onBlur={() =>
                                        handleUpdateQuantityWhenBlur(rowId)
                                    }
                                    inputProps={{
                                        inputMode: "numeric",
                                        pattern: "[0-9]*",
                                        maxLength: 3, // Giới hạn chiều dài của số nhập vào (ví dụ 99)
                                    }}
                                    fullWidth
                                    value={
                                        tempQuantity[rowId] !== undefined
                                            ? tempQuantity[rowId]
                                            : rowData?.product_quantity
                                    }
                                    onChange={(e) =>
                                        handleQuantityChange(
                                            e.target.value,
                                            rowId
                                        )
                                    }
                                />
                                <IconButton
                                    onClick={() => handleIncrease(rowData)}
                                >
                                    <AddRounded />
                                </IconButton>
                            </div>
                        )}
                        <span className={cx("prod-price-mobile")}>
                            Giá: {FormatCurrency(rowData?.unit_price)}
                        </span>
                    </>
                );
            },
        },
        {
            title: "Số lượng",
            field: "product_quantity",
            hidden: isMedium ? true : false,
            render: (rowData) => {
                const rowId = rowData.tableData.id;
                return (
                    <div
                        style={{
                            display: "flex",
                            width: "148px",
                        }}
                    >
                        <IconButton onClick={() => handleDecrease(rowData)}>
                            <RemoveRounded />
                        </IconButton>
                        <GTextFieldNormal
                            onBlur={() => handleUpdateQuantityWhenBlur(rowId)}
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                maxLength: 2, // Giới hạn chiều dài của số nhập vào (ví dụ 99)
                            }}
                            fullWidth
                            value={
                                tempQuantity[rowId] !== undefined
                                    ? tempQuantity[rowId]
                                    : rowData?.product_quantity
                            }
                            onChange={(e) =>
                                handleQuantityChange(e.target.value, rowId)
                            }
                        />
                        <IconButton onClick={() => handleIncrease(rowData)}>
                            <AddRounded />
                        </IconButton>
                    </div>
                );
            },
        },
        {
            title: "Đơn giá",
            field: "unit_price",
            hidden: isMedium ? true : false,
            render: (rowData) => {
                return (
                    <>
                        <span
                            className={
                                rowData?.unit_price_onsale
                                    ? cx("unit_price", "onsale")
                                    : cx("unit_price")
                            }
                        >
                            {FormatCurrency(rowData?.unit_price)}
                        </span>
                        {rowData?.unit_price_onsale ? (
                            <span className={cx("unit_price_onsale")}>
                                {FormatCurrency(rowData?.unit_price_onsale)}
                            </span>
                        ) : (
                            ""
                        )}
                    </>
                );
            },
        },
        {
            title: "Xóa",
            field: "actions",
            sorting: false,
            export: false,
            render: (rowData) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <IconButton
                        onClick={() => handleOpenRemoveCartItem(rowData)}
                    >
                        <DeleteRounded color="error" />
                    </IconButton>
                </div>
            ),
        },
    ];

    // ============
    const user = useSelector((state) => state.auth.login?.currentUser);
    const cartList = useSelector((state) => state.cart.cart?.cartList);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const discountListCustomer = useSelector(
        (state) => state.discount.discount?.discountListCustomer
    );

    const getProductList = useSelector(
        (state) => state.product.product?.productListSearchLimit
    );
    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            if (!user) {
                navigate("/dang-nhap");
                toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                    icon: "😅",
                });
            }
            await getAllDiscountCustomer(dispatch);
            await getProductLimit(dispatch);
        };
        fetch();
    }, []);

    useEffect(() => {
        if (user) {
            getCartByUserId(user?.accessToken, dispatch, user?.id, axiosJWT);
        }
    }, [user?.id]);

    useEffect(() => {
        if (cartList) {
            const newCartList = cartList?.map((item) => {
                let discount_percent;
                const getProduct = getProductList?.find(
                    (p) => p.id === parseInt(item?.product_id)
                );
                if (getProduct.discount_id) {
                    const getDiscount = discountListCustomer?.find(
                        (d) => d.id === parseInt(getProduct.discount_id)
                    );

                    discount_percent = getDiscount?.discount_percent;
                }
                return {
                    ...item,
                    unit_price_onsale:
                        item?.unit_price -
                        (item?.unit_price * discount_percent) / 100,
                    discount_percent: discount_percent,
                };
            });

            // console.log(newCartList);
            setProductList(structuredClone(newCartList));
        }
    }, [cartList]);
    const handleDecrease = async (cartItem) => {
        if (cartItem?.product_quantity > 1) {
            await updateCart(
                user?.accessToken,
                dispatch,
                user?.id,
                cartItem?.id,
                {
                    product_quantity: cartItem.product_quantity - 1,
                },
                axiosJWT
            );
        } else {
            handleOpenRemoveCartItem(cartItem);
        }
    };

    const handleIncrease = async (cartItem) => {
        if (cartItem?.product_quantity) {
            await updateCart(
                user?.accessToken,
                dispatch,
                user?.id,
                cartItem?.id,
                {
                    product_quantity: cartItem.product_quantity + 1,
                },
                axiosJWT
            );
        }
    };

    const [isOpenRemoveCartItem, setIsOpenRemoveCartItem] = useState(false);

    const handleOpenRemoveCartItem = (cartItem) => {
        setSelectedProduct(cartItem);
        setIsOpenRemoveCartItem(true);
    };

    const handleCloseRemoveCartItem = (cartItem) => {
        setSelectedProduct({});
        setIsOpenRemoveCartItem(false);
    };

    const [tempQuantity, setTempQuantity] = useState({});
    const handleQuantityChange = (newQuantity, rowId) => {
        if (!isNaN(newQuantity)) {
            setTempQuantity((prevState) => ({
                ...prevState,
                [rowId]: newQuantity,
            }));
        }
    };

    const handleUpdateQuantityWhenBlur = async (rowId) => {
        const getCartItem = productList?.find(
            (row) => row.tableData.id === rowId
        );

        const { id, product_quantity, ...rest } = getCartItem;

        const updatedData = { product_quantity: tempQuantity[rowId] };

        if (parseInt(tempQuantity[rowId]) === 0) {
            handleOpenRemoveCartItem(getCartItem);
        } else {
            await updateCart(
                user?.accessToken,
                dispatch,
                user?.id,
                id,
                updatedData,
                axiosJWT
            );
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item lg={9} md={12} sm={12} xs={12}>
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
                                        <GTable
                                            paging={false}
                                            onSelectionChange={(rows) =>
                                                setSelectedProductCartList(rows)
                                            }
                                            title={"DANH SÁCH GIẢM GIÁ"}
                                            columns={columns}
                                            data={productList}
                                            exportFileName={"DanhSachNguoiDung"}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <ConfirmRemoveCartItem
                            isOpen={isOpenRemoveCartItem}
                            handleClose={handleCloseRemoveCartItem}
                            handleOpen={handleOpenRemoveCartItem}
                            selectedCartItem={selectedProduct}
                        />
                    </div>
                </Grid>
                <Grid item lg={3} md={12} sm={12} xs={12}>
                    <CartProductSummary
                        selectedProductCartList={selectedProductCartList}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default CartProductList;
