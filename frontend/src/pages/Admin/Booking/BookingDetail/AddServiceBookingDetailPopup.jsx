import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import styles from "./InvoiceDetail.module.scss";
import classNames from "classnames/bind";
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";

import GButton from "../../../../components/MyButton/MyButton";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { string, object, array } from "yup";
import { useParams } from "react-router-dom";
import utc from "dayjs/plugin/utc";

import { createAxios } from "../../../../createInstance";
import { loginSuccess } from "../../../../redux/slice/authSlice";
import {
    createInvoiceDetail,
    updateInvoiceDetail,
} from "../../../../redux/api/apiInvoiceDetail";
import GModal from "../../../../common/GModal/GModal";

const cx = classNames.bind(styles);

export default function AddServiceBookingDetailPopup({
    handleClose,
    handleOpen,
    isOpen,
}) {
    const { invoiceId } = useParams();
    dayjs.extend(utc);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const getInvoiceDetail = useSelector(
        (state) => state.invoiceDetail.invoiceDetail?.invoiceDetailByInvoice
    );

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
                    product_quantity: 1,
                    unit_price: "",
                },
            ],
        },
        // validationSchema: validationSchema,
        onSubmit: async (values) => {
            const listUpdate = [];
            const listCreate = [];
            const processedArray = [];

            values?.products?.forEach((item) => {
                // Kiểm tra xem phần tử đã tồn tại trong mảng processedArray chưa
                const existingItem = processedArray.find(
                    (processedItem) =>
                        processedItem.product_id === item.product_id
                );

                if (existingItem) {
                    // Nếu phần tử đã tồn tại, tăng số lượng tương ứng
                    existingItem.product_quantity =
                        parseInt(existingItem.product_quantity) +
                        parseInt(item.product_quantity);
                } else {
                    // Nếu phần tử chưa tồn tại, thêm phần tử vào mảng processedArray
                    processedArray.push({ ...item });
                }
            });

            processedArray?.forEach((product) => {
                let isDuplicate = false;
                getInvoiceDetail?.forEach((invoice) => {
                    if (product?.product_id === invoice?.product_id) {
                        isDuplicate = true;
                        listUpdate.push({
                            ...product,
                            invoice_detail_id: invoice?.id,
                            old_quantity: invoice?.product_quantity,
                        });
                    }
                });
                if (!isDuplicate) {
                    listCreate.push(product);
                }
            });

            if (listUpdate?.length > 0) {
                await handleCreateInvoiceDetailExist(listUpdate);
            }
            if (listCreate?.length > 0) {
                await handleCreateInvoiceDetail(listCreate);
            }
        },
    });

    const productList = useSelector(
        (state) => state.product.product?.productList
    );

    useEffect(() => {
        setCloneData(structuredClone(productList));
    }, [productList]);

    const handleCreateInvoiceDetail = async (values) => {
        const dataCreate = values?.map((product) => {
            const data = {
                ...product,
                unit_price: parseFloat(product?.unit_price),
                product_quantity: parseInt(product?.product_quantity),
                invoice_id: invoiceId,
            };
            const { product_name, price_total, ...restData } = data;
            return restData;
        });
        for (const item of dataCreate) {
            await createInvoiceDetail(
                invoiceId,
                user?.accessToken,
                dispatch,
                item,
                axiosJWT
            ).then(() => {
                handleClose();
            });
        }
    };

    const handleCreateInvoiceDetailExist = async (values) => {
        for (const item of values) {
            await updateInvoiceDetail(
                user?.accessToken,
                dispatch,
                item?.invoice_detail_id,
                invoiceId,
                {
                    invoice_id: invoiceId,
                    product_quantity:
                        item?.old_quantity + parseInt(item?.product_quantity),
                },
                axiosJWT
            ).then(() => {
                handleClose();
            });
        }
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
                <GModal
                    handleClose={() => {
                        formik.resetForm();
                        handleClose();
                    }}
                    handleOpen={handleOpen}
                    isOpen={isOpen}
                    title={"Cập nhật số lượng"}
                >
                    <div className={cx("invoice-detail-form")}>
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
                                                                        xs={8}
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
                                                                        xs={3}
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
                                                                product_quantity: 1,
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
                                            onClick={handleClose}
                                        >
                                            Hủy
                                        </GButton>
                                    </div>
                                </form>
                            </FormikProvider>
                        </div>
                    </div>
                </GModal>
            </div>
        </>
    );
}
