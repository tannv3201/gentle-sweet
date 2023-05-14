import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Autocomplete, Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import { createProduct, updateProduct } from "../../../redux/api/apiProduct";
import { getAllProductCategory } from "../../../redux/api/apiProductCategory";
import { uploadImage } from "../../../redux/api/apiImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import UploadImage from "./UploadImage/UploadImage";
import { MyDropzone } from "./DropZone/DropZone";
import { createProductImage } from "../../../redux/api/apiProductImage";
import { toast } from "react-hot-toast";

// Validate
const validationSchema = Yup.object().shape({
    product_category_id: Yup.string().required("Vui lòng không để trống"),
    name: Yup.string().required("Vui lòng không để trống"),
    quantity: Yup.string().required("Vui lòng không để trống"),
    price: Yup.string().required("Vui lòng không để trống"),
});

export default function CreateUpdateProductModal({
    handleClose,
    handleOpen,
    isOpen,
    selectedProduct,
}) {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();

    // Image url after upload to server
    const [imageUrls, setImageUrls] = useState([]);

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

    // const handleUploadButtonClick = async () => {
    //     if (!selectedFile) {
    //         return;
    //     }
    //     const formData = new FormData();
    //     formData.append("image", selectedFile);
    //     console.log("selectedFile", selectedFile);
    //     const res = await uploadImage(formData);
    //     formik.setFieldValue("image", res);
    //     return res;
    // };

    const handleCreateProduct = async (data) => {
        const productInserted = await createProduct(
            user?.accessToken,
            dispatch,
            data,
            axiosJWT
        );

        if (productInserted?.insertId) {
            for (const imageUrl of imageUrls) {
                console.log(imageUrl);
                const productImage = createProductImage(
                    user?.accessToken,
                    dispatch,
                    {
                        product_id: productInserted?.insertId,
                        image_url: imageUrl,
                    },
                    axiosJWT
                ).then(() => {});
            }
        } else {
            toast.error("Có lỗi xảy ra khi thêm sản phẩm");
        }
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
        validationSchema: validationSchema,
        onSubmit: async (data) => {
            const { product_category_name, ...restData } = data;
            if (data?.id) {
                console.log(restData);
            } else {
                if (!imageUrls) {
                    formik.setFieldError("image", "Vui lòng chọn ảnh");
                    return;
                } else {
                    handleCreateProduct(restData);
                }
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
                        {/* <Grid item xs={12}>
                            <UploadImage
                                handleFileInputChange={handleFileInputChange}
                                imageUrl={imageUrl}
                                helpertext={
                                    formik.touched?.image &&
                                    formik.errors?.image
                                }
                            />
                        </Grid> */}
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
                            <div>
                                <Grid container spacing={1}>
                                    {imageUrls.map((img, idx) => (
                                        <Grid item xs={4}>
                                            <img
                                                key={idx}
                                                style={{
                                                    width: 60,
                                                    height: 60,
                                                    objectFit: "cover",
                                                }}
                                                src={img}
                                                alt="uploaded"
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                            <MyDropzone setImageUrls={setImageUrls} />
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
