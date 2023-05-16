import toast from "react-hot-toast";

import {
    createServiceImageFailed,
    createServiceImageStart,
    createServiceImageSuccess,
    deleteServiceImageFailed,
    deleteServiceImageStart,
    deleteServiceImageSuccess,
    getAllServiceImageByServiceIdFailed,
    getAllServiceImageByServiceIdStart,
    getAllServiceImageByServiceIdSuccess,
    getAllServiceImageFailed,
    getAllServiceImageStart,
    getAllServiceImageSuccess,
    updateServiceImageFailed,
    updateServiceImageStart,
    updateServiceImageSuccess,
} from "../slice/serviceImageSlice";

export const getAllServiceImage = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllServiceImageStart());
    try {
        const res = await axiosJWT.get("/v1/productImage", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllServiceImageSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllServiceImageFailed());
    }
};

export const getAllServiceImageByServiceId = async (
    accessToken,
    productId,
    dispatch,
    axiosJWT
) => {
    dispatch(getAllServiceImageByServiceIdStart());
    try {
        const res = await axiosJWT.get(
            "/v1/productImage/images/" + productId + "/product",
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(getAllServiceImageByServiceIdSuccess(res?.data));
        if (res?.data?.status === 404) {
            toast.error(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getAllServiceImageByServiceIdFailed());
    }
};

export const createServiceImage = async (
    productId,
    accessToken,
    dispatch,
    productImageData,
    axiosJWT
) => {
    dispatch(createServiceImageStart());
    try {
        const res = await axiosJWT.post("/v1/productImage", productImageData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createServiceImageSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success("Thêm ảnh thành công vào product image");
            getAllServiceImageByServiceId(
                accessToken,
                productId,
                dispatch,
                axiosJWT
            );
        }
    } catch (error) {
        dispatch(createServiceImageFailed(error.response?.data));
    }
};

export const uploadImage = async (
    accessToken,
    dispatch,
    productImageData,
    axiosJWT
) => {
    dispatch(createServiceImageStart());
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
        dispatch(createServiceImageSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success("Thêm ảnh thành công vào product image");
            getAllServiceImage(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createServiceImageFailed(error.response?.data));
    }
};

export const updateServiceImage = async (
    accessToken,
    dispatch,
    id,
    productData,
    axiosJWT
) => {
    dispatch(updateServiceImageStart());
    try {
        const res = await axiosJWT.put("/v1/productImage/" + id, productData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateServiceImageSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllServiceImage(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateServiceImageFailed(error.response?.data));
    }
};

export const deleteImageInFolder = async (
    dispatch,
    image_url,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteServiceImageStart());
    try {
        const res = await axiosJWT.delete(
            "/v1/productImage/images/" + image_url,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(deleteServiceImageSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllServiceImage(accessToken, dispatch, axiosJWT);
        } else {
            toast.success(res?.data?.msg);
        }
    } catch (error) {
        dispatch(deleteServiceImageFailed(error.response?.data));
    }
};

export const deleteImageInDB = async (
    productId,
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteServiceImageStart());
    try {
        const res = await axiosJWT.delete("/v1/productImage/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteServiceImageSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllServiceImageByServiceId(
                accessToken,
                productId,
                dispatch,
                axiosJWT
            );
        } else {
            toast.success(res?.data?.msg);
        }
    } catch (error) {
        dispatch(deleteServiceImageFailed(error.response?.data));
    }
};
