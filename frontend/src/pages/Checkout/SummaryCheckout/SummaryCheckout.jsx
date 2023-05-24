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
const cx = classNames.bind(styles);

function SummaryCheckout() {
    const navigate = useNavigate();
    const handleCheckoutButtonClick = () => {
        navigate("/thanh-toan");
    };
    const [priceTotal, setPriceTotal] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(15000);
    const location = useLocation();
    const selectedProductCartList = location.state?.selectedProductCartList;

    useEffect(() => {
        if (selectedProductCartList) {
            const priceTotal = selectedProductCartList.reduce(
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
            setPriceTotal(priceTotal);
        }
    }, [selectedProductCartList]);
    dayjs.extend(utc);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);
    const [cloneData, setCloneData] = useState([]);

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
        if (selectedProductCartList) {
            setCheckoutInfo(selectedProductCartList);
        }
    }, [selectedProductCartList]);

    console.log(selectedProductCartList);

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
            },
            axiosJWT
        );

        const productList = await selectedProductCartList?.map((p) => {
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

        console.log(productList);

        for (const item of productList) {
            await createInvoiceDetail(
                newInvoice,
                user?.accessToken,
                dispatch,
                item,
                axiosJWT
            );
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
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={7}>
                                    <CheckoutInformation />
                                </Grid>
                                <Grid item xs={5}>
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
                                                                        src={`${API_IMAGE_URL}/${rowData?.image_url}`}
                                                                        style={{
                                                                            width: 60,
                                                                            height: 60,
                                                                            objectFit:
                                                                                "cover",
                                                                            borderRadius:
                                                                                "50%",
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
                                                            selectedProductCartList
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
                                                                // onClick={
                                                                //     handleCheckoutButtonClick
                                                                // }
                                                                type={"submit"}
                                                            >
                                                                Tiếp tục thanh
                                                                toán
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
