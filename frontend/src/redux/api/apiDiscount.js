import toast from "react-hot-toast";

import {
    createDiscountFailed,
    createDiscountStart,
    createDiscountSuccess,
    deleteDiscountFailed,
    deleteDiscountStart,
    deleteDiscountSuccess,
    getAllDiscountCustomerFailed,
    getAllDiscountCustomerStart,
    getAllDiscountCustomerSuccess,
    getAllDiscountFailed,
    getAllDiscountStart,
    getAllDiscountSuccess,
    updateDiscountFailed,
    updateDiscountStart,
    updateDiscountSuccess,
} from "../slice/discountSlice";
import axios from "axios";

export const getAllDiscount = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllDiscountStart());
    try {
        const res = await axiosJWT.get("/v1/discount", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllDiscountSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllDiscountFailed());
    }
};

export const getAllDiscountCustomer = async (dispatch) => {
    dispatch(getAllDiscountCustomerStart());
    try {
        const res = await axios.get("/v1/discount/customer");
        dispatch(getAllDiscountCustomerSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllDiscountCustomerFailed());
    }
};

export const createDiscount = async (
    accessToken,
    dispatch,
    discountData,
    axiosJWT
) => {
    dispatch(createDiscountStart());
    try {
        const res = await axiosJWT.post("/v1/discount", discountData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createDiscountSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success("Thêm sản phẩm thành công.");
            await getAllDiscount(accessToken, dispatch, axiosJWT);
        }
        return res?.data?.data;
    } catch (error) {
        dispatch(createDiscountFailed(error.response?.data));
    }
};

export const updateDiscount = async (
    accessToken,
    dispatch,
    id,
    discountData,
    axiosJWT
) => {
    dispatch(updateDiscountStart());
    try {
        const res = await axiosJWT.put("/v1/discount/" + id, discountData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateDiscountSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllDiscount(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateDiscountFailed(error.response?.data));
    }
};

export const deleteDiscount = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(deleteDiscountStart());
    try {
        const res = await axiosJWT.delete("/v1/discount/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteDiscountSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllDiscount(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteDiscountFailed(error.response?.data));
    }
};
