import React, { useEffect } from "react";
import { useFormik } from "formik";
import GButton from "../../../components/MyButton/MyButton";
import { Grid } from "@mui/material";
import { useState } from "react";
import GModal from "../../../common/GModal/GModal";

import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../redux/slice/authSlice";
import { createAxios } from "../../../createInstance";
import { ImageUpload } from "./DropZone/CustomDropzone";
import { toast } from "react-hot-toast";
import { createProductImage } from "../../../redux/api/apiProductImage";
import { useParams } from "react-router-dom";

export default function CreateUpdateProductImageModal({
    handleOpen,
    isOpen,
    selectedProductCategory,
    ...props
}) {
    const { productId } = useParams();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [productImage, setProductCategory] = useState({
        image: "",
    });

    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    const handleCloseModal = () => {
        formik.resetForm();
        props.handleClose();
        setImageFileSeleted([]);
    };

    const handleCreateProductImage = async (productImageData) => {
        const formData = new FormData();
        formData.append("image", imageFileSeleted[0]?.file);
        formData.append("product_id", productId);
        createProductImage(
            productId,
            user?.accessToken,
            dispatch,
            formData,
            axiosJWT
        ).then(() => {
            handleCloseModal();
        });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: productImage,
        onSubmit: async (data) => {
            if (imageFileSeleted.length !== 0) {
                await handleCreateProductImage();
            } else {
                toast.error("Vui lòng chọn ảnh");
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
        setImageFileSeleted(imageList);
    };

    return (
        <>
            <GModal
                handleClose={() => {
                    handleCloseModal();
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
