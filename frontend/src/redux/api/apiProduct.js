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
    getProductByIdFailed,
    getProductByIdStart,
    getProductByIdSuccess,
    productSearchFailed,
    productSearchLimitFailed,
    productSearchLimitStart,
    productSearchLimitSuccess,
    productSearchStart,
    productSearchSuccess,
    productSearchTermFailed,
    productSearchTermStart,
    productSearchTermSuccess,
    updateProductFailed,
    updateProductStart,
    updateProductSuccess,
} from "../slice/productSlice";
import axios from "axios";

export const getAllProduct = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllProductStart());
    try {
        const res = await axios.get(
            "/v1/product"
            //  {
            //     headers: {
            //         token: `Bearer ${accessToken}`,
            //     },
            // }
        );
        dispatch(getAllProductSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllProductFailed());
    }
};

export const createProductOnline = async (
    accessToken,
    dispatch,
    productData,
    axiosJWT
) => {
    dispatch(createProductStart());
    try {
        const res = await axiosJWT.post("/v1/product/online", productData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createProductSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Thêm sản phẩm thành công.");
            await getAllProduct(accessToken, dispatch, axiosJWT);
        }

        return res?.data?.data;
    } catch (error) {
        dispatch(createProductFailed(error.response?.data));
    }
};

export const createProductLocal = async (
    accessToken,
    dispatch,
    productData,
    axiosJWT
) => {
    dispatch(createProductStart());
    try {
        const res = await axiosJWT.post("/v1/product/local", productData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createProductSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Thêm sản phẩm thành công.");
            await getAllProduct(accessToken, dispatch, axiosJWT);
        }
        return res?.data?.data;
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
            // getAllProduct(accessToken, dispatch, axiosJWT);
            await getProductById(dispatch, id, accessToken, axiosJWT);
            await getAllProduct(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateProductFailed(error.response?.data));
    }
};

export const addDiscount = async (
    accessToken,
    dispatch,
    id,
    discountData,
    axiosJWT
) => {
    dispatch(updateProductStart());
    try {
        const res = await axiosJWT.put(
            "/v1/product/discount/" + id,
            discountData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateProductSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getProductById(dispatch, id, accessToken, axiosJWT);
            await getAllProduct(accessToken, dispatch, axiosJWT);
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
            await getAllProduct(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteProductFailed(error.response?.data));
    }
};

export const getProductById = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(getProductByIdStart());
    try {
        const res = await axiosJWT.get("/v1/product/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getProductByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getProductByIdFailed(error.response?.data));
    }
};

export const checkQuantityAllowList = async (productListSelected) => {
    try {
        const res = await axios.post(`/v1/product/checkQuantityAllowList`, {
            productListSelected: productListSelected,
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const checkQuantityAllow = async (product_id, product_quantity) => {
    try {
        const res = await axios.post(`/v1/product/checkQuantityAllow`, {
            product_id: product_id,
            product_quantity: product_quantity,
        });
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const customerGetProductById = async (dispatch, id) => {
    dispatch(getProductByIdStart());
    try {
        const res = await axios.get("/v1/product/" + id + "/customer");
        dispatch(getProductByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getProductByIdFailed(error.response?.data));
    }
};

export const productSearchTerm = async (dispatch, searchTerm) => {
    dispatch(productSearchTermStart());
    try {
        const res = await axios.get(
            "/v1/product/" + searchTerm + "/searchTerm"
        );
        dispatch(productSearchTermSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(productSearchTermFailed(error.response?.data));
    }
};

export const productSearch = async (
    accessToken,
    params,
    dispatch,
    axiosJWT
) => {
    dispatch(productSearchStart());
    try {
        const res = await axios.get("/v1/product/search", {
            params: params,
            // headers: {
            //     token: `Bearer ${accessToken}`,
            // },
        });
        dispatch(productSearchSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(productSearchFailed());
    }
};

export const getProductLimit = async (dispatch) => {
    dispatch(productSearchLimitStart());
    try {
        const res = await axios.get("/v1/product/search");
        dispatch(productSearchLimitSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(productSearchLimitFailed());
    }
};
