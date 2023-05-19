import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Autocomplete,
    Grid,
    Icon,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import styles from "./InvoiceDetail.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_IMAGE_URL } from "../../../../LocalConstants";

import GButton from "../../../../components/MyButton/MyButton";
import {
    AddRounded,
    ArrowBackIosNew,
    ModeEditOutlineRounded,
    RemoveRounded,
} from "@mui/icons-material";
import GTextFieldNormal from "../../../../components/GTextField/GTextFieldNormal";
import {
    ErrorMessage,
    Field,
    FieldArray,
    Form,
    Formik,
    FormikProvider,
    useFormik,
    useFormikContext,
} from "formik";
import { string, object, array, number } from "yup";
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";

import { getAllDiscount } from "../../../../redux/api/apiDiscount";
import { getAllServiceCategory } from "../../../../redux/api/apiServiceCategory";
import {
    getServiceById,
    updateService,
} from "../../../../redux/api/apiService";
import { getAllProduct } from "../../../../redux/api/apiProduct";
import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import {
    createInvoiceDetail,
    getInvoiceDetailByInvoiceId,
} from "../../../../redux/api/apiInvoiceDetail";

const cx = classNames.bind(styles);

export default function InvoiceDetailForm() {
    const { invoiceId } = useParams();
    // const formik = useFormikContext();
    dayjs.extend(utc);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const [isCreateInvoiceDetail, setIsCreateInvoiceDetail] = useState(true);
    const dispatch = useDispatch();
    const [cloneData, setCloneData] = useState([]);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);
    const validationSchema = object({
        products: array(
            object({
                product_id: string().required("Vui lòng chọn sản phẩm"),
                product_quantity: string().required("Vui lòng nhập số lượng"),
            })
        ),
    });
    const formik = useFormik({
        validationSchema: validationSchema,
        enableReinitialize: true,
        initialValues: {
            products: [
                {
                    product_id: "",
                    product_name: "",
                    product_quantity: "",
                    unit_price: "",
                },
            ],
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            handleCreateInvoiceDetail(values);
        },
    });

    const productList = useSelector(
        (state) => state.product.product?.productList
    );

    useEffect(() => {
        const fetch = async () => {
            if (productList?.length === 0) {
                await getAllProduct(user?.accessToken, dispatch, axiosJWT);
            }
            if (invoiceId) {
                await getInvoiceDetailByInvoiceId(
                    dispatch,
                    invoiceId,
                    user?.accessToken,
                    axiosJWT
                );
            }
        };

        fetch();
    }, [invoiceId]);

    const getInvoiceDetail = useSelector(
        (state) => state.invoiceDetail.invoiceDetail?.invoiceDetailByInvoice
    );

    // useEffect(() => {
    //     if (getInvoiceDetail) {
    //         formik.setValues({
    //             products: getInvoiceDetail?.map((item) => ({
    //                 product_id: item.product_id,
    //                 product_name: productList?.find(
    //                     (p) => p.id === item.product_id
    //                 )?.name,
    //                 product_quantity: item.product_quantity,
    //                 price_total: item.price_total,
    //                 unit_price: item.unit_price,
    //             })),
    //         });
    //     }
    // }, [getInvoiceDetail, productList]);

    useEffect(() => {
        setCloneData(structuredClone(productList));
    }, [productList]);

    const handleCreateInvoiceDetail = async (values) => {
        const dataCreate = values?.products?.map((product) => {
            const data = {
                ...product,
                unit_price: parseFloat(product?.unit_price),
                product_quantity: parseInt(product?.product_quantity),
                invoice_id: invoiceId,
            };
            const { product_name, price_total, ...restData } = data;
            return restData;
        });

        await Promise.all(
            dataCreate?.forEach((item) => {
                createInvoiceDetail(
                    invoiceId,
                    user?.accessToken,
                    dispatch,
                    item,
                    axiosJWT
                );
            })
        );
    };

    const handleChangeProduct = (value, index) => {
        if (value) {
            formik.setFieldValue(`products[${index}].product_id`, value?.id);
            formik.setFieldValue(
                `products[${index}].product_name`,
                value?.name
            );
            formik.setFieldValue(`products[${index}].unit_price`, value?.price);
        } else {
            formik.setFieldValue(`products[${index}].product_id`, null);
            formik.setFieldValue(`products[${index}].product_name`, null);
            formik.setFieldValue(`products[${index}].unit_price`, null);
        }
    };

    const handleChangeQuantity = (value, index) => {
        if (value) {
            formik.setFieldValue(`products[${index}].product_quantity`, value);
        } else {
            formik.setFieldValue(`products[${index}].product_quantity`, null);
        }
    };
    return (
        <>
            <div className={cx("invoice-detail-wrapper")}>
                {!isCreateInvoiceDetail && (
                    <GButton
                        className={cx("create-invoice-detail-btn")}
                        onClick={() => setIsCreateInvoiceDetail(true)}
                    >
                        Thêm chi tiết hóa đơn
                    </GButton>
                )}
                {isCreateInvoiceDetail && (
                    <div className={cx("invoice-detail-form")}>
                        <div className={cx("form-header")}>
                            CHI TIẾT ĐƠN HÀNG
                        </div>
                        <div className={cx("form-body")}>
                            <FormikProvider value={formik}>
                                <form onSubmit={formik.handleSubmit}>
                                    <FieldArray name="products">
                                        {({ insert, remove, push }) => (
                                            <Grid container spacing={2}>
                                                {formik.values.products.length >
                                                    0 &&
                                                    formik.values.products.map(
                                                        (product, index) => (
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                key={index}
                                                            >
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={6}
                                                                    >
                                                                        <Autocomplete
                                                                            options={
                                                                                cloneData
                                                                            }
                                                                            onBlur={
                                                                                formik.handleBlur
                                                                            }
                                                                            getOptionLabel={(
                                                                                option
                                                                            ) =>
                                                                                `${option?.name}` ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                                value
                                                                            ) => {
                                                                                handleChangeProduct(
                                                                                    value,
                                                                                    index
                                                                                );
                                                                            }}
                                                                            isOptionEqualToValue={(
                                                                                option,
                                                                                value
                                                                            ) =>
                                                                                value ===
                                                                                    null ||
                                                                                value ===
                                                                                    "" ||
                                                                                option?.id ===
                                                                                    value?.id
                                                                            }
                                                                            value={
                                                                                formik
                                                                                    .values
                                                                                    ?.products[
                                                                                    index
                                                                                ]
                                                                                    ?.product_id
                                                                                    ? {
                                                                                          id: formik
                                                                                              .values
                                                                                              ?.products[
                                                                                              index
                                                                                          ]
                                                                                              ?.product_id,
                                                                                          name: formik
                                                                                              .values
                                                                                              ?.products[
                                                                                              index
                                                                                          ]
                                                                                              ?.product_name,
                                                                                      }
                                                                                    : null
                                                                            }
                                                                            renderInput={(
                                                                                params
                                                                            ) => (
                                                                                <TextField
                                                                                    {...params}
                                                                                    color="secondary"
                                                                                    name={`products.${index}.product_id`}
                                                                                    size="medium"
                                                                                    fullWidth
                                                                                    label="Sản phẩm"
                                                                                    error={
                                                                                        formik
                                                                                            .touched
                                                                                            .products &&
                                                                                        formik
                                                                                            .errors
                                                                                            ?.products &&
                                                                                        Boolean(
                                                                                            formik
                                                                                                .errors
                                                                                                ?.products[
                                                                                                index
                                                                                            ]
                                                                                                ?.product_id
                                                                                        )
                                                                                    }
                                                                                    helperText={
                                                                                        formik
                                                                                            .touched
                                                                                            .products &&
                                                                                        formik
                                                                                            .errors
                                                                                            ?.products &&
                                                                                        formik
                                                                                            .errors
                                                                                            ?.products &&
                                                                                        formik
                                                                                            .errors
                                                                                            ?.products[
                                                                                            index
                                                                                        ]
                                                                                            ?.product_id
                                                                                    }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={2}
                                                                    >
                                                                        <TextField
                                                                            size="medium"
                                                                            color="secondary"
                                                                            fullWidth
                                                                            type={
                                                                                "number"
                                                                            }
                                                                            value={
                                                                                formik
                                                                                    .values
                                                                                    ?.products[
                                                                                    index
                                                                                ]
                                                                                    ?.product_quantity
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleChangeQuantity(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                    index
                                                                                )
                                                                            }
                                                                            label={
                                                                                "Số lượng"
                                                                            }
                                                                            name={`products[${index}].product_quantity`}
                                                                            error={
                                                                                formik
                                                                                    .touched
                                                                                    .products &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.products &&
                                                                                Boolean(
                                                                                    formik
                                                                                        .errors
                                                                                        ?.products[
                                                                                        index
                                                                                    ]
                                                                                        ?.product_quantity
                                                                                )
                                                                            }
                                                                            helperText={
                                                                                formik
                                                                                    .touched
                                                                                    .products &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.products &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.products &&
                                                                                formik
                                                                                    .errors
                                                                                    ?.products[
                                                                                    index
                                                                                ]
                                                                                    ?.product_quantity
                                                                            }
                                                                        />
                                                                    </Grid>

                                                                    <Grid
                                                                        item
                                                                        xs={1}
                                                                    >
                                                                        <div
                                                                            className={cx(
                                                                                "remove-btn-wrapper"
                                                                            )}
                                                                        >
                                                                            <IconButton
                                                                                color="error"
                                                                                onClick={() =>
                                                                                    remove(
                                                                                        index
                                                                                    )
                                                                                }
                                                                            >
                                                                                <RemoveRounded color="error" />
                                                                            </IconButton>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>

                                                                <div className="col"></div>
                                                            </Grid>
                                                        )
                                                    )}
                                                <Grid item xs={12}>
                                                    <GButton
                                                        color="success"
                                                        startIcon={
                                                            <AddRounded />
                                                        }
                                                        onClick={() =>
                                                            push({
                                                                product_id: "",
                                                                product_name:
                                                                    "",
                                                                product_quantity:
                                                                    "",
                                                                unit_price: "",
                                                            })
                                                        }
                                                    >
                                                        Thêm sản phẩm
                                                    </GButton>
                                                </Grid>
                                            </Grid>
                                        )}
                                    </FieldArray>
                                    <div className={cx("submit-btn-wrapper")}>
                                        <GButton
                                            color={"success"}
                                            type="submit"
                                        >
                                            Lưu
                                        </GButton>
                                        <GButton
                                            color={"text"}
                                            onClick={() =>
                                                setIsCreateInvoiceDetail(false)
                                            }
                                        >
                                            Hủy
                                        </GButton>
                                    </div>
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
