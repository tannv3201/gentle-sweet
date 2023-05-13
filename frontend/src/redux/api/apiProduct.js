import toast from "react-hot-toast";

import {
    createProductFailed,
    createProductStart,
    createProductSuccess,
    deleteProductFailed,
    deleteProductStart,
    deleteProductSuccess,
    getAllProductFailed,
    getAllProductStart,
    getAllProductSuccess,
    updateProductFailed,
    updateProductStart,
    updateProductSuccess,
} from "../slice/productSlice";

export const getAllProduct = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllProductStart());
    try {
        const res = await axiosJWT.get("/v1/product", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllProductSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllProductFailed());
    }
};

export const createProduct = async (
    accessToken,
    dispatch,
    productData,
    axiosJWT
) => {
    dispatch(createProductStart());
    try {
        const res = await axiosJWT.post("/v1/product", productData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createProductSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success(res?.data?.msg);
            getAllProduct(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createProductFailed(error.response?.data));
    }
};

export const updateProduct = async (
    accessToken,
    dispatch,
    id,
    productData,
    axiosJWT
) => {
    dispatch(updateProductStart());
    try {
        const res = await axiosJWT.put("/v1/product/" + id, productData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateProductSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllProduct(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateProductFailed(error.response?.data));
    }
};

export const deleteProduct = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(deleteProductStart());
    try {
        const res = await axiosJWT.delete("/v1/product/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteProductSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllProduct(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteProductFailed(error.response?.data));
    }
};
