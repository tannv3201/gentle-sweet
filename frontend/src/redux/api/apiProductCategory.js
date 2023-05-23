import toast from "react-hot-toast";

import {
    createProductCategoryFailed,
    createProductCategoryStart,
    createProductCategorySuccess,
    deleteProductCategoryFailed,
    deleteProductCategoryStart,
    deleteProductCategorySuccess,
    getAllProductCategoryCustomerFailed,
    getAllProductCategoryCustomerStart,
    getAllProductCategoryCustomerSuccess,
    getAllProductCategoryFailed,
    getAllProductCategoryStart,
    getAllProductCategorySuccess,
    updateProductCategoryFailed,
    updateProductCategoryStart,
    updateProductCategorySuccess,
} from "../slice/productCategorySlice";
import axios from "axios";

export const getAllProductCategory = async (
    accessToken,
    dispatch,
    axiosJWT
) => {
    dispatch(getAllProductCategoryStart());
    try {
        const res = await axiosJWT.get("/v1/productCategory", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllProductCategorySuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllProductCategoryFailed());
    }
};

export const getAllProductCategoryCustomer = async (dispatch) => {
    dispatch(getAllProductCategoryCustomerStart());
    try {
        const res = await axios.get("/v1/productCategory/customer");
        dispatch(getAllProductCategoryCustomerSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllProductCategoryCustomerFailed());
    }
};

export const createProductCategory = async (
    accessToken,
    dispatch,
    productCategoryData,
    axiosJWT
) => {
    dispatch(createProductCategoryStart());
    try {
        const res = await axiosJWT.post(
            "/v1/productCategory",
            productCategoryData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(createProductCategorySuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success(res?.data?.msg);
            await getAllProductCategory(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createProductCategoryFailed(error.response?.data));
    }
};

export const updateProductCategory = async (
    accessToken,
    dispatch,
    id,
    productCategoryData,
    axiosJWT
) => {
    dispatch(updateProductCategoryStart());
    try {
        const res = await axiosJWT.put(
            "/v1/productCategory/" + id,
            productCategoryData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateProductCategorySuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllProductCategory(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateProductCategoryFailed(error.response?.data));
    }
};

export const deleteProductCategory = async (
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteProductCategoryStart());
    try {
        const res = await axiosJWT.delete("/v1/productCategory/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteProductCategorySuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllProductCategory(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteProductCategoryFailed(error.response?.data));
    }
};
