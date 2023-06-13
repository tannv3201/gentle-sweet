/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import classNames from "classnames/bind";
import styles from "./SummaryCheckout.module.scss";
import { Grid } from "@mui/material";
import { FormatCurrency } from "../../../components/FormatCurrency/FormatCurrency";
import * as Yup from "yup";
import { useState } from "react";
import { useEffect } from "react";
import images from "../../../assets/images";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import GButton from "../../../components/MyButton/MyButton";
import { useLocation, useNavigate } from "react-router-dom";
import { API_IMAGE_URL } from "../../../LocalConstants";
import GTable, { GTableProductCheckout } from "../../../common/GTable/GTable";
import CheckoutInformation from "../CheckoutInformation/CheckoutInformation";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { Formik, useFormik, useFormikContext } from "formik";
import {
    getDistrict,
    getDistrictById,
    getProvince,
    getProvinceById,
    getWard,
    getWardById,
} from "../../../redux/api/apiProvince";
import PaymentInformation from "../PaymentInformation/PaymentInformation";
import { createInvoice } from "../../../redux/api/apiInvoice";
import { createInvoiceDetail } from "../../../redux/api/apiInvoiceDetail";
import { createDelivery } from "../../../redux/api/apiDelivery";
import { toast } from "react-hot-toast";
const cx = classNames.bind(styles);

function SummaryCheckout() {
    const navigate = useNavigate();

    const [priceTotal, setPriceTotal] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(15000);
    const [productBuyNow, setProductBuyNow] = useState([]);
    const location = useLocation();
    const selectedProductCartList = location.state?.selectedProductCartList;
    const selectedProductBuyNow = location.state?.selectedProductBuyNow;

    useEffect(() => {
        if (selectedProductBuyNow) productBuyNow.push(selectedProductBuyNow);
    }, [selectedProductBuyNow]);

    useEffect(() => {
        if (!user) {
            navigate("/dang-nhap");
            toast("Vui lòng đăng nhập để sử dụng chức năng này.", {
                icon: "😅",
            });
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
                if (currentValue?.discount_percent) {
                    const discountedPrice =
                        parseFloat(currentValue?.unit_price) -
                        (parseFloat(currentValue?.unit_price) *
                            currentValue?.discount_percent) /
                            100;

                    return (
                        accumulator +
                        parseFloat(discountedPrice) *
                            currentValue?.product_quantity
                    );
                } else {
                    return (
                        accumulator +
                        parseFloat(currentValue?.unit_price) *
                            currentValue?.product_quantity
                    );
                }
            },
            0
        );
        setPriceTotal(priceTotal + deliveryPrice);
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
                unit_price: p.unit_price_onsale
                    ? parseFloat(p.unit_price_onsale)
                    : parseFloat(p.unit_price),
                product_quantity: parseInt(p?.product_quantity),
                product_id: p?.product_id,
                invoice_id: newInvoice,
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

        for (const item of productList) {
            await createInvoiceDetail(
                newInvoice,
                user?.accessToken,
                dispatch,
                item,
                axiosJWT
            );
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
                payment_method: values?.payment_method,
            },
            axiosJWT
        ).then(() => {
            navigate("/don-mua");
        });
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
                    {({ handleSubmit }) => (
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
                                                            },
                                                            {
                                                                title: "SL",
                                                                field: "product_quantity",
                                                            },

                                                            {
                                                                title: "Giá",
                                                                field: "unit_price",
                                                                render: (
                                                                    rowData
                                                                ) => {
                                                                    return (
                                                                        <>
                                                                            <span
                                                                                className={
                                                                                    rowData?.unit_price_onsale
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
                                                                                    rowData?.unit_price
                                                                                )}
                                                                            </span>
                                                                            {rowData?.unit_price_onsale ? (
                                                                                <span
                                                                                    className={cx(
                                                                                        "unit_price_onsale"
                                                                                    )}
                                                                                >
                                                                                    {FormatCurrency(
                                                                                        rowData?.unit_price_onsale
                                                                                    )}
                                                                                </span>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </>
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
                                                                    ngay để nhận
                                                                    ưu đãi !
                                                                </span>
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
                                                                                {FormatCurrency(
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
                                                                                {FormatCurrency(
                                                                                    priceTotal
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
                                                                // onClick={
                                                                //     handleCheckoutButtonClick
                                                                // }
                                                                type={"submit"}
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
