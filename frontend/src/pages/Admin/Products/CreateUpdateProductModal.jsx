import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Autocomplete, Grid, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import {
    createProduct,
    getAllProductCategory,
    updateProduct,
    uploadImage,
} from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import UploadImage from "./UploadImage/UploadImage";

export default function CreateUpdateProductModal({
    handleClose,
    handleOpen,
    isOpen,
    selectedProduct,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    // Product category
    const productCategoryList = structuredClone(
        useSelector(
            (state) =>
                state.productCategory.productCategory?.productCategoryList
        )
    );

    useEffect(() => {
        if (isOpen) {
            getAllProductCategory(user?.accessToken, dispatch, axiosJWT);
        }
    }, []);

    const [product, setProduct] = useState({
        product_category_id: "",
        product_category_name: "",
        name: "",
        description: "",
        quantity: "",
        price: "",
        image: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    useEffect(() => {
        if (selectedProduct) {
            const product_category = productCategoryList?.find(
                (item) => item?.id === selectedProduct?.product_category_id
            );
            const newSelectedProduct = {
                ...selectedProduct,
                product_category_name: product_category?.name,
            };
            setProduct(newSelectedProduct);
        }
    }, [selectedProduct]);

    // Upload ảnh
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileInputChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    useEffect(() => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    }, [selectedFile, setImageUrl]);

    const handleUploadButtonClick = async () => {
        if (!selectedFile) {
            return;
        }
        const formData = new FormData();
        formData.append("image", selectedFile);
        const res = await uploadImage(formData);
        formik.setFieldValue("image", res);
        return res;
    };

    const handleCreateProduct = (data) => {
        createProduct(user?.accessToken, dispatch, data, axiosJWT).then(() => {
            formik.handleReset();
            handleClose();
            setSelectedFile(null);
            setImageUrl("");
        });
    };

    const handleUpdateProduct = (data) => {
        updateProduct(
            user?.accessToken,
            dispatch,
            selectedProduct?.id,
            data,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
            setSelectedFile(null);
            setImageUrl("");
        });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: product,
        onSubmit: async (data) => {
            if (data?.id) {
                const res = await handleUploadButtonClick();
                const { product_category_name, ...newData } = data;
                const newProduct = { ...newData, image: res };
                handleUpdateProduct(newProduct);
                console.log(newProduct);
            } else {
                const res = await handleUploadButtonClick();
                const newProduct = { ...data, image: res };
                handleCreateProduct(newProduct);
            }
        },
    });

    return (
        <>
            <GModal
                handleClose={() => {
                    formik.resetForm();
                    handleClose();
                    setSelectedFile(null);
                    setImageUrl("");
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={
                    selectedProduct?.id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={productCategoryList}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || ""
                                }
                                onChange={(e, value) => {
                                    formik.setFieldValue(
                                        "product_category_id",
                                        value?.id
                                    );
                                    formik.setFieldValue(
                                        "product_category_name",
                                        value?.name || ""
                                    );
                                }}
                                isOptionEqualToValue={(option, value) =>
                                    value === null ||
                                    value === "" ||
                                    option?.id === value?.id
                                }
                                value={
                                    (formik.values.product_category_id && {
                                        id: formik.values?.product_category_id,
                                        name: formik.values
                                            ?.product_category_name,
                                    }) ||
                                    null
                                }
                                renderInput={(params) => (
                                    <GTextFieldNormal
                                        {...params}
                                        name="product_category_id"
                                        fullWidth
                                        label="Danh mục"
                                        error={
                                            formik.touched
                                                ?.product_category_id &&
                                            Boolean(
                                                formik.errors
                                                    ?.product_category_id
                                            )
                                        }
                                        helperText={
                                            formik.touched
                                                .product_category_id &&
                                            formik.errors?.product_category_id
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Tên sản phẩm"
                                fullWidth
                                name="name"
                                value={formik.values?.name || ""}
                                error={
                                    formik.touched?.name &&
                                    Boolean(formik.errors?.name)
                                }
                                helperText={
                                    formik.touched?.name && formik.errors?.name
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Số lượng"
                                type="number"
                                fullWidth
                                name="quantity"
                                value={formik.values?.quantity || ""}
                                error={
                                    formik.touched?.quantity &&
                                    Boolean(formik.errors?.quantity)
                                }
                                helperText={
                                    formik.touched?.quantity &&
                                    formik.errors?.quantity
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Giá"
                                type="number"
                                fullWidth
                                name="price"
                                value={formik.values?.price || ""}
                                error={
                                    formik.touched?.price &&
                                    Boolean(formik.errors?.price)
                                }
                                helperText={
                                    formik.touched?.price &&
                                    formik.errors?.price
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadImage
                                handleFileInputChange={handleFileInputChange}
                                imageUrl={imageUrl}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Mô tả"
                                fullWidth
                                name="description"
                                value={formik.values?.description || ""}
                                error={
                                    formik.touched?.description &&
                                    Boolean(formik.errors?.description)
                                }
                                helperText={
                                    formik.touched?.description &&
                                    formik.errors?.description
                                }
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GButton color={"success"} type="submit">
                                Lưu
                            </GButton>
                            <GButton
                                style={{ marginLeft: "12px" }}
                                color="text"
                                onClick={() => {
                                    formik.resetForm();
                                    handleClose();
                                    setSelectedFile(null);
                                    setImageUrl("");
                                }}
                            >
                                Hủy
                            </GButton>
                        </Grid>
                    </Grid>
                </form>
            </GModal>
        </>
    );
}
