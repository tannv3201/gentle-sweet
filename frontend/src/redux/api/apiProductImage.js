import toast from "react-hot-toast";

import {
    createProductImageFailed,
    createProductImageStart,
    createProductImageSuccess,
    deleteProductImageFailed,
    deleteProductImageStart,
    deleteProductImageSuccess,
    getAllProductImageByProductIdFailed,
    getAllProductImageByProductIdStart,
    getAllProductImageByProductIdSuccess,
    getAllProductImageFailed,
    getAllProductImageStart,
    getAllProductImageSuccess,
    updateProductImageFailed,
    updateProductImageStart,
    updateProductImageSuccess,
} from "../slice/productImageSlice";

export const getAllProductImage = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllProductImageStart());
    try {
        const res = await axiosJWT.get("/v1/productImage", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllProductImageSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllProductImageFailed());
    }
};

export const getAllProductImageByProductId = async (
    accessToken,
    productId,
    dispatch,
    axiosJWT
) => {
    dispatch(getAllProductImageByProductIdStart());
    try {
        const res = await axiosJWT.get(
            "/v1/productImage/images/" + productId + "/product",
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(getAllProductImageByProductIdSuccess(res?.data));
        if (res?.data?.status === 404) {
            toast.error(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getAllProductImageByProductIdFailed());
    }
};

export const createProductImage = async (
    productId,
    accessToken,
    dispatch,
    productImageData,
    axiosJWT
) => {
    dispatch(createProductImageStart());
    try {
        const res = await axiosJWT.post("/v1/productImage", productImageData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createProductImageSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success("Thêm ảnh thành công vào product image");
            await getAllProductImageByProductId(
                accessToken,
                productId,
                dispatch,
                axiosJWT
            );
        }
    } catch (error) {
        dispatch(createProductImageFailed(error.response?.data));
    }
};

export const uploadImage = async (
    accessToken,
    dispatch,
    productImageData,
    axiosJWT
) => {
    dispatch(createProductImageStart());
    try {
        const res = await axiosJWT.post(
            "/v1/productImage/upload",
            productImageData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(createProductImageSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success("Thêm ảnh thành công vào product image");
            await getAllProductImage(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createProductImageFailed(error.response?.data));
    }
};

export const updateProductImage = async (
    accessToken,
    dispatch,
    id,
    productData,
    axiosJWT
) => {
    dispatch(updateProductImageStart());
    try {
        const res = await axiosJWT.put("/v1/productImage/" + id, productData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateProductImageSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllProductImage(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateProductImageFailed(error.response?.data));
    }
};

export const deleteImageInFolder = async (
    dispatch,
    image_url,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteProductImageStart());
    try {
        const res = await axiosJWT.delete(
            "/v1/productImage/images/" + image_url,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(deleteProductImageSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllProductImage(accessToken, dispatch, axiosJWT);
        } else {
            toast.success(res?.data?.msg);
        }
    } catch (error) {
        dispatch(deleteProductImageFailed(error.response?.data));
    }
};

export const deleteImageInDB = async (
    productId,
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteProductImageStart());
    try {
        const res = await axiosJWT.delete("/v1/productImage/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteProductImageSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllProductImageByProductId(
                accessToken,
                productId,
                dispatch,
                axiosJWT
            );
        } else {
            toast.success(res?.data?.msg);
        }
    } catch (error) {
        dispatch(deleteProductImageFailed(error.response?.data));
    }
};
