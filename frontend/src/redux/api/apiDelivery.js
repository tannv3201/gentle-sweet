import toast from "react-hot-toast";

import {
    createDeliveryFailed,
    createDeliveryStart,
    createDeliverySuccess,
    deleteDeliveryFailed,
    deleteDeliveryStart,
    deleteDeliverySuccess,
    getAllDeliveryFailed,
    getAllDeliveryStart,
    getAllDeliverySuccess,
    getDeliveryByIdFailed,
    getDeliveryByIdStart,
    getDeliveryByIdSuccess,
    getDeliveryByInvoiceIdFailed,
    getDeliveryByInvoiceIdStart,
    getDeliveryByInvoiceIdSuccess,
    getDeliveryByUserIdFailed,
    getDeliveryByUserIdStart,
    getDeliveryByUserIdSuccess,
    updateDeliveryFailed,
    updateDeliveryStart,
    updateDeliverySuccess,
} from "../slice/deliverySlice";

export const getAllDelivery = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllDeliveryStart());
    try {
        const res = await axiosJWT.get("/v1/delivery", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllDeliverySuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllDeliveryFailed());
    }
};

export const createDelivery = async (
    accessToken,
    dispatch,
    deliveryData,
    axiosJWT
) => {
    dispatch(createDeliveryStart());
    try {
        const res = await axiosJWT.post("/v1/delivery", deliveryData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createDeliverySuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Thêm thông tin giao hàng thành công.");
        }

        return res?.data?.data;
    } catch (error) {
        dispatch(createDeliveryFailed(error.response?.data));
    }
};

export const updateDelivery = async (
    accessToken,
    dispatch,
    deliveryId,
    deliveryData,
    axiosJWT,
    invoiceId
) => {
    dispatch(updateDeliveryStart());
    try {
        const res = await axiosJWT.put(
            "/v1/delivery/" + deliveryId,
            deliveryData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateDeliverySuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getDeliveryByInvoiceId(
                dispatch,
                invoiceId,
                accessToken,
                axiosJWT
            );
        }
    } catch (error) {
        dispatch(updateDeliveryFailed(error.response?.data));
    }
};

export const deleteDelivery = async (
    accessToken,
    dispatch,
    deliveryItemId,
    userId,
    axiosJWT
) => {
    dispatch(deleteDeliveryStart());
    try {
        const res = await axiosJWT.delete("/v1/delivery/" + deliveryItemId, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteDeliverySuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getDeliveryByUserId(accessToken, dispatch, userId, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteDeliveryFailed(error.response?.data));
    }
};

export const getDeliveryById = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(getDeliveryByIdStart());
    try {
        const res = await axiosJWT.get("/v1/delivery/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getDeliveryByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getDeliveryByIdFailed(error.response?.data));
    }
};

export const getDeliveryByInvoiceId = async (
    dispatch,
    invoiceId,
    accessToken,
    axiosJWT
) => {
    dispatch(getDeliveryByInvoiceIdStart());
    try {
        const res = await axiosJWT.get("/v1/delivery/invoice/" + invoiceId, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getDeliveryByInvoiceIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getDeliveryByInvoiceIdFailed(error.response?.data));
    }
};

export const getDeliveryByUserId = async (
    accessToken,
    dispatch,
    userId,
    axiosJWT
) => {
    dispatch(getDeliveryByUserIdStart());
    try {
        const res = await axiosJWT.get("/v1/delivery/" + userId + "/customer", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getDeliveryByUserIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getDeliveryByUserIdFailed(error.response?.data));
    }
};
