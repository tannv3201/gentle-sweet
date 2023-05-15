import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Grid } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import GModal from "../../../common/GModal/GModal";
import {
    createProductCategory,
    updateProductCategory,
} from "../../../redux/api/apiProductCategory";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { ImageUpload } from "./DropZone/CustomDropzone";
import { uploadImage } from "../../../redux/api/apiImageUpload";
import { toast } from "react-hot-toast";
import { createProductImage } from "../../../redux/api/apiProductImage";
import { useParams } from "react-router-dom";

export default function CreateUpdateProductImageModal({
    handleClose,
    handleOpen,
    isOpen,
    selectedProductCategory,
}) {
    const { productId } = useParams();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [productCategory, setProductCategory] = useState({
        name: "",
        description: "",
        image: "",
    });

    console.log(productId);

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCreateProductCategory = (productCategory) => {
        createProductCategory(
            user?.accessToken,
            dispatch,
            productCategory,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
        });
    };

    const handleUpdateProductCategory = (productCategory) => {
        updateProductCategory(
            user?.accessToken,
            dispatch,
            selectedProductCategory?.id,
            productCategory,
            axiosJWT
        ).then(() => {
            formik.handleReset();
            handleClose();
        });
    };

    const handleUploadToImgbb = async () => {
        if (imageFileSeleted) {
            const formData = new FormData();
            formData.append("image", imageFileSeleted[0]?.file);
            const res = await uploadImage(formData);
            return res;
        } else {
            toast.error("Chưa có ảnh");
        }
    };

    const handleCreateProductImage = async (productImageData) => {
        await createProductImage(
            user?.accessToken,
            dispatch,
            productImageData,
            axiosJWT
        );
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: productCategory,
        onSubmit: async (data) => {
            if (data?.id) {
                console.log("data_update", data);
            } else {
                const img_url = await handleUploadToImgbb();
                await handleCreateProductImage({
                    product_id: productId,
                    image_url: img_url,
                });
                console.log("data_create", img_url);
            }
        },
    });

    useEffect(() => {
        if (selectedProductCategory)
            setProductCategory(selectedProductCategory);
    }, [selectedProductCategory]);

    // upload image
    const [imageFileSeleted, setImageFileSeleted] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImageFileSeleted(imageList);
    };

    return (
        <>
            <GModal
                handleClose={() => {
                    formik.resetForm();
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={"Thêm hình ảnh"}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <ImageUpload
                                imageFileSeleted={imageFileSeleted}
                                setImageFileSeleted={setImageFileSeleted}
                                onChangeImage={onChangeImage}
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
