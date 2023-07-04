/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import classNames from "classnames/bind";
import styles from "./SummaryCheckout.module.scss";
import { Grid } from "@mui/material";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import GButton from "../../../components/MyButton/MyButton";
import { useLocation, useNavigate } from "react-router-dom";
import { API_IMAGE_URL } from "../../../LocalConstants";
import { GTableProductCheckout } from "../../../components/GTable/GTable";
import CheckoutInformation from "../CheckoutInformation/CheckoutInformation";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { Formik } from "formik";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createInvoice } from "../../../redux/api/apiInvoice";
import { createInvoiceDetail } from "../../../redux/api/apiInvoiceDetail";
import { createDelivery } from "../../../redux/api/apiDelivery";
import { toast } from "react-hot-toast";
import { FormatCurrency } from "../../../utils/FormatCurrency/formatCurrency";
import { deleteCart } from "../../../redux/api/apiCart";
const cx = classNames.bind(styles);

function SummaryCheckout() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [priceTotal, setPriceTotal] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(30000);
    const [productBuyNow, setProductBuyNow] = useState([]);
    const location = useLocation();
    const selectedProductCartList = location.state?.selectedProductCartList;
    const selectedProductBuyNow = location.state?.selectedProductBuyNow;

    useEffect(() => {
        if (selectedProductBuyNow) productBuyNow.push(selectedProductBuyNow);
    }, [productBuyNow, selectedProductBuyNow]);

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
        }
        let selectedProduct;
        if (!selectedProductCartList && !selectedProductBuyNow) {
            navigate("/gio-hang");
            toast("Vui lòng chọn sản phẩm cần mua", {
                icon: "😅",
                style: {
                    border: "1px solid var(--red)",
                    fontWeight: "var(--fw-medium)",
                },
            });
        }
        if (selectedProductCartList) selectedProduct = selectedProductCartList;
        if (selectedProductBuyNow) selectedProduct = productBuyNow?.flat();

        const priceTotal = selectedProduct?.reduce(
            (accumulator, currentValue) => {
                if (currentValue?.product_price_onsale > 0) {
                    return (
                        accumulator +
                        parseFloat(currentValue?.product_price_onsale) *
                            currentValue?.product_quantity
                    );
                } else {
                    return (
                        accumulator +
                        parseFloat(currentValue?.product_price) *
                            currentValue?.product_quantity
                    );
                }
            },
            0
        );
        setPriceTotal(priceTotal);
    }, [selectedProductCartList, productBuyNow]);
    dayjs.extend(utc);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser);
    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const [checkoutInfo, setCheckoutInfo] = useState({
        product_id: "",
        product_quantity: "",
        fullName: "",
        phone_number: "",
        province: "",
        district: "",
        ward: "",
        detail_address: "",
    });

    useEffect(() => {
        // if (selectedProductCartList) {
        //     setCheckoutInfo(selectedProductCartList);
        // }
        if (productBuyNow) {
            setCheckoutInfo(productBuyNow?.flat());
        }
    }, [selectedProductCartList, productBuyNow]);
    const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Vui lòng không để trống"),
        phone_number: Yup.string()
            .matches(/^\d+$/, "Số điện thoại chỉ bao gồm các ký tự số")
            .matches(phoneRegExp, "Số điện thoại không hợp lệ")
            .required("Vui lòng nhập số điện thoại"),
        province: Yup.string().required("Vui lòng không để trống"),
        district: Yup.string().required("Vui lòng không để trống"),
        ward: Yup.string().required("Vui lòng không để trống"),
        detail_address: Yup.string().required("Vui lòng không để trống"),
    });

    const handleSubmit = async (values) => {
        const newInvoice = await createInvoice(
            user?.accessToken,
            dispatch,
            {
                customer_user_id: user?.id,
                payment_method: values?.payment_method,
                bank_transfer_content: values?.bank_transfer_content,
                paid: values?.payment_method === "1" ? 0 : 1,
                note: values?.note,
            },
            axiosJWT
        );
        let selectedProduct;
        if (selectedProductCartList) selectedProduct = selectedProductCartList;
        if (selectedProductBuyNow) selectedProduct = productBuyNow?.flat();
        const productList = await selectedProduct?.map((p) => {
            const data = {
                ...p,
                unit_price:
                    parseFloat(p.product_price_onsale) > 0
                        ? parseFloat(p.product_price_onsale)
                        : parseFloat(p.product_price),
                product_quantity: parseInt(p?.product_quantity),
                product_id: p?.product_id,
                invoice_id: newInvoice,
                cart_id: p?.id,
            };
            const {
                discount_percent,
                image_url,
                product_name,
                tableData,
                created_at,
                updated_at,
                id,
                customer_user_id,
                unit_price_onsale,
                status,
                ...restData
            } = data;
            return restData;
        });
        let counterCreateInvoiceDetails = 0;

        for (const item of productList) {
            const invoiceDetailCreated = await createInvoiceDetail(
                newInvoice,
                user?.accessToken,
                dispatch,
                { ...item, deliveryPrice: deliveryPrice },
                axiosJWT
            );

            // Delete sản phẩm trong giỏ hàng khi tạo đơn hàng
            if (item?.cart_id) {
                await deleteCart(
                    user?.accessToken,
                    dispatch,
                    item?.cart_id,
                    user?.id,
                    axiosJWT
                );
            }

            counterCreateInvoiceDetails++;

            if (counterCreateInvoiceDetails === productList?.length) {
                toast.success("Tạo đơn hàng thành công");
            }
        }
        const delivery = await createDelivery(
            user?.accessToken,
            dispatch,
            {
                invoice_id: newInvoice,
                customer_name: values?.fullName,
                customer_phone: values?.phone_number,
                province: values?.province,
                district: values?.district,
                ward: values?.ward,
                detail_address: values?.detail_address,
            },
            axiosJWT
        ).then(() => {
            navigate("/don-mua");
        });
    };

    const handleToastNull = (values) => {
        if (!values?.detail_address) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
        }
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Formik
                    initialValues={checkoutInfo}
                    validationSchema={validationSchema}
                    onSubmit={async (values, actions) => {
                        await handleSubmit(values);
                    }}
                >
                    {({ handleSubmit, errors, values, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item lg={7} md={12} sm={12} xs={12}>
                                    <CheckoutInformation />
                                </Grid>
                                <Grid item lg={5} md={12} sm={12} xs={12}>
                                    <div className={cx("summary")}>
                                        <div className={cx("checkout-summary")}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <span
                                                        className={cx(
                                                            "checkout-summary-title"
                                                        )}
                                                    >
                                                        <h3>
                                                            Đơn hàng của bạn
                                                        </h3>
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <GTableProductCheckout
                                                        title={""}
                                                        columns={[
                                                            {
                                                                title: "Ảnh",
                                                                field: "image_url",
                                                                cellStyle:
                                                                    isSmall
                                                                        ? {
                                                                              width: "20%",
                                                                          }
                                                                        : {},
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
                                                                title: "Tên",
                                                                field: "product_name",
                                                                hidden: isSmall
                                                                    ? true
                                                                    : false,
                                                            },
                                                            {
                                                                title: "SL",
                                                                field: "product_quantity",
                                                                hidden: isSmall
                                                                    ? true
                                                                    : false,
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
                                                                        <div
                                                                            className={cx(
                                                                                "prod-price-wrapper"
                                                                            )}
                                                                        >
                                                                            <span
                                                                                className={
                                                                                    rowData?.product_price_onsale >
                                                                                    0
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
                                                                                    rowData?.product_price
                                                                                )}
                                                                            </span>
                                                                            {rowData?.product_price_onsale >
                                                                            0 ? (
                                                                                <span
                                                                                    className={cx(
                                                                                        "unit_price_onsale"
                                                                                    )}
                                                                                >
                                                                                    {FormatCurrency(
                                                                                        rowData?.product_price_onsale
                                                                                    )}
                                                                                </span>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>
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
                                                                        <div>
                                                                            <p>
                                                                                {
                                                                                    rowData?.product_name
                                                                                }
                                                                            </p>
                                                                            <p>
                                                                                Số
                                                                                lượng:{" "}
                                                                                {
                                                                                    rowData?.product_quantity
                                                                                }
                                                                            </p>
                                                                            <div
                                                                                className={cx(
                                                                                    "prod-price-wrapper"
                                                                                )}
                                                                            >
                                                                                <span
                                                                                    className={
                                                                                        rowData?.product_price_onsale >
                                                                                        0
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
                                                                                        rowData?.product_price
                                                                                    )}
                                                                                </span>
                                                                                {rowData?.product_price_onsale >
                                                                                0 ? (
                                                                                    <span
                                                                                        className={cx(
                                                                                            "unit_price_onsale"
                                                                                        )}
                                                                                    >
                                                                                        {FormatCurrency(
                                                                                            rowData?.product_price_onsale
                                                                                        )}
                                                                                    </span>
                                                                                ) : (
                                                                                    ""
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                },
                                                            },
                                                        ]}
                                                        data={
                                                            selectedProductCartList ||
                                                            productBuyNow?.flat()
                                                        }
                                                        exportFileName={
                                                            "DanhSachNguoiDung"
                                                        }
                                                    />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <div className={cx("price-summary")}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={12}>
                                                            <div
                                                                className={cx(
                                                                    "discount-code"
                                                                )}
                                                            >
                                                                <Grid
                                                                    container
                                                                    spacing={1}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={8}
                                                                    >
                                                                        <GTextFieldNormal
                                                                            label="Mã giảm giá"
                                                                            fullWidth
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={4}
                                                                    >
                                                                        <GButton
                                                                            className={cx(
                                                                                "discount-code-btn"
                                                                            )}
                                                                            fullWidth
                                                                            variant="outlined"
                                                                        >
                                                                            Áp
                                                                            dụng
                                                                        </GButton>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <div
                                                                className={cx(
                                                                    "pricing"
                                                                )}
                                                            >
                                                                <Grid
                                                                    container
                                                                    spacing={1}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
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
                                                                                Tạm
                                                                                tính
                                                                            </span>
                                                                            <span
                                                                                className={cx(
                                                                                    "subtotal-price"
                                                                                )}
                                                                            >
                                                                                {FormatCurrency(
                                                                                    priceTotal
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
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
                                                                                Giảm
                                                                                giá
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
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
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
                                                                                Chi
                                                                                phí
                                                                                vận
                                                                                chuyển
                                                                            </span>
                                                                            <span
                                                                                className={cx(
                                                                                    "shipment-price"
                                                                                )}
                                                                            >
                                                                                {priceTotal >=
                                                                                500000
                                                                                    ? FormatCurrency(
                                                                                          0
                                                                                      )
                                                                                    : FormatCurrency(
                                                                                          deliveryPrice
                                                                                      )}
                                                                            </span>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
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
                                                                                Tổng
                                                                                cộng
                                                                            </span>
                                                                            <span
                                                                                className={cx(
                                                                                    "grand-total-price"
                                                                                )}
                                                                            >
                                                                                {priceTotal >=
                                                                                500000
                                                                                    ? FormatCurrency(
                                                                                          priceTotal
                                                                                      )
                                                                                    : FormatCurrency(
                                                                                          priceTotal +
                                                                                              deliveryPrice
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
                                                                onClick={() =>
                                                                    handleToastNull(
                                                                        values
                                                                    )
                                                                }
                                                                type={"submit"}
                                                                disabled={
                                                                    isSubmitting
                                                                }
                                                            >
                                                                Xác nhận đơn
                                                                hàng
                                                            </GButton>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default SummaryCheckout;
