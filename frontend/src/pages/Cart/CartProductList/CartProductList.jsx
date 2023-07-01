import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CartProductList.module.scss";
import {
    Button,
    ClickAwayListener,
    Grid,
    IconButton,
    Tooltip,
} from "@mui/material";
import GButton from "../../../components/MyButton/MyButton";
import {
    DeleteRounded,
    FmdBadRounded,
    PriorityHighRounded,
    ProductionQuantityLimitsRounded,
    RemoveRounded,
    WarningRounded,
} from "@mui/icons-material";
import { AddRounded } from "@mui/icons-material";
import { getCartByUserId, updateCart } from "../../../redux/api/apiCart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { API_IMAGE_URL } from "../../../LocalConstants";
import GTable from "../../../components/GTable/GTable";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import ConfirmRemoveCartItem from "./ConfirmRemoveCartItem";
import {
    LightTooltip,
    TooltipMobile,
} from "../../../components/GTooltip/GTooltip";

import {
    checkQuantityAllow,
    checkQuantityAllowList,
    getProductLimit,
} from "../../../redux/api/apiProduct";
import CartProductSummary from "./CartProductSummary/CartProductSummary";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FormatCurrency } from "../../../utils/FormatCurrency/formatCurrency";

const cx = classNames.bind(styles);

function CartProductList() {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [productListByCart, setProductListByCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedProductCartList, setSelectedProductCartList] = useState([]);
    const [tempQuantity, setTempQuantity] = useState({});
    const [isTypingQuantity, setIsTypingQuantity] = useState(false);
    const [isQuantityError, setIsQuantityError] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleTooltipClose = () => {
        setOpen(false);
    };

    const handleTooltipOpen = () => {
        setOpen(!open);
    };

    const columns = [
        {
            title: "Ảnh",
            field: "image_url",
            cellStyle: isSmall ? { width: "20%" } : {},
            render: (rowData) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <div className={cx("prod-img")}>
                    {!rowData?.isAllow && isSmall && (
                        <span>
                            <PriorityHighRounded htmlColor="#f57c00" />
                        </span>
                    )}

                    <img
                        src={
                            rowData?.image_url
                                ? `${API_IMAGE_URL}/${rowData?.image_url}`
                                : ""
                        }
                        style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            borderRadius: "50%",
                            border: "1px solid var(--primary-400)",
                        }}
                    />
                </div>
            ),
        },
        {
            title: "Sản phẩm",
            field: "product_name",
            render: (rowData) => {
                const rowId = rowData.tableData.id;

                return (
                    <div className={cx("prod-infor-wrapper")}>
                        <div>
                            <span className={cx("prod-name-mobile")}>
                                {rowData?.product_name}{" "}
                            </span>

                            {isSmall && (
                                <div
                                    style={{
                                        display: "flex",
                                        width: "130px",
                                        marginTop: "4px",
                                    }}
                                >
                                    <IconButton
                                        onClick={() => handleDecrease(rowData)}
                                        disabled={isTypingQuantity}
                                    >
                                        <RemoveRounded />
                                    </IconButton>
                                    <GTextFieldNormal
                                        onBlur={() =>
                                            handleUpdateQuantityWhenBlur(
                                                rowId,
                                                rowData
                                            )
                                        }
                                        inputProps={{
                                            inputMode: "numeric",
                                            pattern: "[0-9]*",
                                            maxLength: 3, // Giới hạn chiều dài của số nhập vào (ví dụ 99)
                                        }}
                                        fullWidth
                                        value={
                                            isTypingQuantity
                                                ? tempQuantity[rowId]
                                                : rowData?.product_quantity ||
                                                  ""
                                        }
                                        onChange={(e) =>
                                            handleQuantityChange(
                                                e.target.value,
                                                rowId,
                                                rowData
                                            )
                                        }
                                    />

                                    <IconButton
                                        onClick={() => handleIncrease(rowData)}
                                        disabled={isTypingQuantity}
                                    >
                                        <AddRounded />
                                    </IconButton>
                                </div>
                            )}
                            {isSmall && (
                                <div className={cx("price-wrapper")}>
                                    <span
                                        className={
                                            rowData?.product_price_onsale > 0
                                                ? cx(
                                                      "prod-price-mobile",
                                                      "onsale"
                                                  )
                                                : cx("prod-price-mobile")
                                        }
                                    >
                                        {FormatCurrency(rowData?.product_price)}
                                    </span>
                                    {rowData?.product_price_onsale > 0 && (
                                        <span
                                            className={cx(
                                                "prod-sale-price-mobile"
                                            )}
                                        >
                                            {FormatCurrency(
                                                rowData?.product_price_onsale
                                            )}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* {isSmall && <PriorityHighRounded />} */}
                        {isSmall && (
                            <div>
                                <IconButton
                                    size="large"
                                    onClick={() =>
                                        handleOpenRemoveCartItem(rowData)
                                    }
                                >
                                    <DeleteRounded color="error" />
                                </IconButton>
                            </div>
                        )}
                    </div>
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
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            disabled={isTypingQuantity}
                            onClick={() => handleDecrease(rowData)}
                        >
                            <RemoveRounded />
                        </IconButton>
                        <GTextFieldNormal
                            onBlur={() =>
                                handleUpdateQuantityWhenBlur(rowId, rowData)
                            }
                            inputProps={{
                                inputMode: "numeric",
                                pattern: "[0-9]*",
                                maxLength: 2, // Giới hạn chiều dài của số nhập vào (ví dụ 99)
                            }}
                            fullWidth
                            value={
                                isTypingQuantity
                                    ? tempQuantity[rowId]
                                    : rowData?.product_quantity || ""
                            }
                            onChange={(e) =>
                                handleQuantityChange(
                                    e.target.value,
                                    rowId,
                                    rowData
                                )
                            }
                        />
                        <IconButton
                            disabled={isTypingQuantity}
                            onClick={() => handleIncrease(rowData)}
                        >
                            <AddRounded />
                        </IconButton>
                        {!rowData?.isAllow && (
                            <LightTooltip
                                title="Số lượng sản phẩm trong giỏ vượt quá số lượng có sẵn"
                                placement="right"
                            >
                                <PriorityHighRounded htmlColor="#f57c00" />
                            </LightTooltip>
                        )}
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
                                rowData?.product_price_onsale > 0
                                    ? cx("unit_price", "onsale")
                                    : cx("unit_price")
                            }
                        >
                            {FormatCurrency(rowData?.product_price)}
                        </span>
                        {rowData?.product_price_onsale > 0 ? (
                            <span className={cx("unit_price_onsale")}>
                                {FormatCurrency(rowData?.product_price_onsale)}
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
            hidden: isSmall ? true : false,
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

    const navigate = useNavigate();
    useEffect(() => {
        const fetch = async () => {
            if (!user) {
                navigate("/dang-nhap");
                // toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                //     icon: "😅",
                // });
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            const checkQuantityError = await checkQuantityAllowList(cartList);
            setIsQuantityError(!checkQuantityError?.isAllow);
        };
        fetch();
    }, [cartList]);

    useEffect(() => {
        if (user) {
            getCartByUserId(user?.accessToken, dispatch, user?.id, axiosJWT);
        }
    }, [user?.id]);

    useEffect(() => {
        if (cartList) {
            setProductListByCart(structuredClone(cartList));
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
            const isCheckProductQuantity = await checkQuantityAllow(
                cartItem?.product_id,
                cartItem.product_quantity + 1
            );
            if (isCheckProductQuantity?.isAllow) {
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
            } else {
                toast.error(
                    `Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này.`
                );
            }
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

    const handleQuantityChange = (newQuantity, rowId, rowData) => {
        setIsTypingQuantity(true);
        if (!isNaN(newQuantity)) {
            setTempQuantity((prevState) => ({
                ...prevState,
                [rowId]: newQuantity,
            }));
        }
    };
    const handleUpdateQuantityWhenBlur = async (rowId, rowData) => {
        setIsTypingQuantity(false);
        const getCartItem = productListByCart?.find(
            (row) => row.tableData.id === rowId
        );
        const { id, product_quantity, ...rest } = getCartItem;
        const updatedData = { product_quantity: tempQuantity[rowId] };

        // if (
        //     parseInt(tempQuantity[rowId]) === rowData?.product_quantity ||
        //     !isTypingQuantity
        // ) {
        //     return;
        // }
        // if (tempQuantity[rowId] === "") {
        //     return;
        // }
        // if (parseInt(tempQuantity[rowId]) === 0) {
        //     handleOpenRemoveCartItem(getCartItem);
        //     return;
        // }

        // await updateCart(
        //     user?.accessToken,
        //     dispatch,
        //     user?.id,
        //     id,
        //     updatedData,
        //     axiosJWT
        // );

        const isCheckProductQuantity = await checkQuantityAllow(
            rowData?.product_id,
            tempQuantity[rowId]
        );

        if (
            parseInt(tempQuantity[rowId]) === rowData?.product_quantity ||
            !isTypingQuantity
        ) {
            return;
        }
        if (tempQuantity[rowId] === "") {
            return;
        }
        if (parseInt(tempQuantity[rowId]) === 0) {
            handleOpenRemoveCartItem(getCartItem);
            return;
        }
        if (isCheckProductQuantity?.isAllow) {
            await updateCart(
                user?.accessToken,
                dispatch,
                user?.id,
                id,
                updatedData,
                axiosJWT
            );
        } else if (
            isCheckProductQuantity?.productCheck?.quantity ===
            rowData?.product_quantity
        ) {
            toast.error(
                `Số lượng bạn chọn đã đạt mức tối đa của sản phẩm này.`
            );
        } else {
            toast.error(`Số lượng bạn chọn vượt mức tối đa của sản phẩm này.`);
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={cx("wrapper")}>
                        <div className={cx("inner")}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className={cx("cart-header")}>
                                        <div
                                            className={cx("cart-header-title")}
                                        >
                                            <h2>Giỏ hàng</h2>
                                        </div>
                                        {isQuantityError && !isSmall && (
                                            <div
                                                className={cx(
                                                    "product-quantity-limit"
                                                )}
                                            >
                                                <LightTooltip
                                                    title="Có sản phẩm vượt quá số
                                                                lượng có sẵn"
                                                    placement="right"
                                                >
                                                    <span>
                                                        <WarningRounded htmlColor="#f57c00" />
                                                        Kiểm tra số lượng sản
                                                        phẩm
                                                    </span>
                                                </LightTooltip>
                                            </div>
                                        )}
                                        {isQuantityError && isSmall && (
                                            <div
                                                className={cx(
                                                    "product-quantity-limit"
                                                )}
                                            >
                                                <ClickAwayListener
                                                    onClickAway={
                                                        handleTooltipClose
                                                    }
                                                >
                                                    <div>
                                                        <TooltipMobile
                                                            PopperProps={{
                                                                disablePortal: true,
                                                            }}
                                                            onClose={
                                                                handleTooltipClose
                                                            }
                                                            open={open}
                                                            disableFocusListener
                                                            disableHoverListener
                                                            disableTouchListener
                                                            title="Có sản phẩm vượt quá số
                                                                lượng có sẵn"
                                                            placement="left"
                                                        >
                                                            <IconButton
                                                                onClick={
                                                                    handleTooltipOpen
                                                                }
                                                                size="large"
                                                            >
                                                                <WarningRounded
                                                                    fontSize="large"
                                                                    htmlColor="#f57c00"
                                                                />
                                                            </IconButton>
                                                        </TooltipMobile>
                                                    </div>
                                                </ClickAwayListener>
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("table-product-list")}>
                                        <GTable
                                            noRecordMessage="Không có sản phẩm"
                                            paging={false}
                                            onSelectionChange={(rows) =>
                                                setSelectedProductCartList(rows)
                                            }
                                            title={"DANH SÁCH SẢN PHẨM"}
                                            columns={columns}
                                            data={productListByCart}
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
                <Grid item xs={12}>
                    <div className={cx("summary")}>
                        <CartProductSummary
                            selectedProductCartList={selectedProductCartList}
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default CartProductList;
