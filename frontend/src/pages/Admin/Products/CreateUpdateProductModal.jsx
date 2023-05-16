import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Autocomplete, Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import { getAllProductCategory } from "../../../redux/api/apiProductCategory";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { toast } from "react-hot-toast";
import { ImageUpload } from "./DropZone/CustomDropzone";
import { uploadImageToImgbb } from "../../../redux/api/apiImageUpload";
import {
    createProductLocal,
    createProductOnline,
    updateProduct,
} from "../../../redux/api/apiProduct";

// Validate
const validationSchema = Yup.object().shape({
    product_category_id: Yup.string().required("Vui lòng không để trống"),
    name: Yup.string().required("Vui lòng không để trống"),
    quantity: Yup.string().required("Vui lòng không để trống"),
    price: Yup.string().required("Vui lòng không để trống"),
});

export default function CreateUpdateProductModal({
    handleOpen,
    isOpen,
    selectedProduct,
    ...props
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    // upload image
    const [imageFileSeleted, setImageFileSeleted] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImageFileSeleted(imageList);
    };
    // Product category
    const productCategoryList = structuredClone(
        useSelector(
            (state) =>
                state.productCategory.productCategory?.productCategoryList
        )
    );

    useEffect(() => {
        if (productCategoryList?.length === 0) {
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
        image_url: "",
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

    const handleCloseModal = () => {
        formik.resetForm();
        props.handleClose();
        setImageFileSeleted([]);
    };

    // Upload ảnh lên Server online
    // const handleCreateProduct = async (data) => {
    //     const productInserted = await createProductOnline(
    //         user?.accessToken,
    //         dispatch,
    //         data,
    //         axiosJWT
    //     ).then(() => {
    //         handleCloseModal();
    //     });
    //     return productInserted;
    // };

    // const handleUploadToImgbb = async (data) => {
    //     if (imageFileSeleted) {
    //         const formData = new FormData();
    //         formData.append("image", imageFileSeleted[0]?.file);
    //         const res = await uploadImageToImgbb(formData);

    //         return res;
    //     } else {
    //         toast.error("Chưa có ảnh");
    //     }
    // };

    // Upload ảnh vào server online
    // const formik = useFormik({
    //     enableReinitialize: true,
    //     initialValues: product,
    //     validationSchema: validationSchema,
    //     onSubmit: async (data) => {
    //         const { product_category_name, ...restData } = data;
    //         if (data?.id) {
    //             if (imageFileSeleted.length > 0) {
    //                 const imgUrl = await handleUploadToImgbb();
    //                 const dataUpdate = { ...restData, image_url: imgUrl };
    //                 await handleUpdateProduct(dataUpdate);
    //             } else {
    //                 await handleUpdateProduct(restData);
    //             }
    //         } else {
    //             if (imageFileSeleted.length === 0) {
    //                 formik.setFieldError("image", "Vui lòng chọn ảnh");
    //                 toast.error("Vui lòng chọn ảnh");
    //                 return;
    //             } else {
    //                 const imgUrl = await handleUploadToImgbb();
    //                 const dataCreate = { ...restData, image_url: imgUrl };
    //                 await handleCreateProduct(dataCreate);
    //             }
    //         }
    //     },
    // });

    // Upload to server local
    const handleCreateProduct = async (data) => {
        if (imageFileSeleted) {
            const formData = new FormData();
            formData.append("image", imageFileSeleted[0]?.file);
            formData.append("name", data?.name);
            formData.append("description", data?.description);
            formData.append("product_category_id", data?.product_category_id);
            formData.append("price", data?.price);
            formData.append("quantity", data?.quantity);
            createProductLocal(
                user?.accessToken,
                dispatch,
                formData,
                axiosJWT
            ).then(() => {
                handleCloseModal();
            });
        } else {
            toast.error("Chưa có ảnh");
        }
    };

    const handleUpdateProduct = async (data) => {
        if (imageFileSeleted?.length !== 0) {
            const formData = new FormData();
            formData.append("image", imageFileSeleted[0]?.file);
            formData.append("name", data?.name);
            formData.append("description", data?.description);
            formData.append("product_category_id", data?.product_category_id);
            formData.append("price", data?.price);
            formData.append("quantity", data?.quantity);
            updateProduct(
                user?.accessToken,
                dispatch,
                selectedProduct?.id,
                formData,
                axiosJWT
            ).then(() => {
                handleCloseModal();
            });
        } else {
            updateProduct(
                user?.accessToken,
                dispatch,
                selectedProduct?.id,
                data,
                axiosJWT
            ).then(() => {
                handleCloseModal();
            });
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: product,
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            const { product_category_name, ...restData } = data;
            if (data?.id) {
                handleUpdateProduct(restData);
            } else {
                handleCreateProduct(restData);
            }
        },
    });

    const handleChangeProductCategory = (value) => {
        if (value) {
            formik.setFieldValue("product_category_id", value?.id);
            formik.setFieldValue("product_category_name", value?.name);
        } else {
            formik.setFieldValue("product_category_id", null);
            formik.setFieldValue("product_category_name", null);
        }
    };

    return (
        <>
            <GModal
                handleClose={handleCloseModal}
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
                                onBlur={formik.handleBlur}
                                getOptionLabel={(option) =>
                                    `${option?.name}` || ""
                                }
                                onChange={(e, value) => {
                                    handleChangeProductCategory(value);
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
                                        formik={formik}
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
                                formik={formik}
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
                                formik={formik}
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
                                formik={formik}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <GTextFieldNormal
                                onChange={formik.handleChange}
                                label="Mô tả"
                                fullWidth
                                name="description"
                                value={formik.values?.description || ""}
                                formik={formik}
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ImageUpload
                                imageFileSeleted={imageFileSeleted}
                                setImageFileSeleted={setImageFileSeleted}
                                onChangeImage={onChangeImage}
                            />
                            {imageFileSeleted.length === 0 && (
                                <span style={{ color: "red" }}>
                                    {formik.errors?.image}
                                </span>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <GButton color={"success"} type="submit">
                                Lưu
                            </GButton>
                            <GButton
                                style={{ marginLeft: "12px" }}
                                color="text"
                                onClick={handleCloseModal}
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
