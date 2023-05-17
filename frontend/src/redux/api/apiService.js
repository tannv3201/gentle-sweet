import toast from "react-hot-toast";

import {
    createServiceFailed,
    createServiceStart,
    createServiceSuccess,
    deleteServiceFailed,
    deleteServiceStart,
    deleteServiceSuccess,
    getAllServiceFailed,
    getAllServiceStart,
    getAllServiceSuccess,
    updateServiceFailed,
    updateServiceStart,
    updateServiceSuccess,
} from "../slice/serviceSlice";

export const getAllService = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllServiceStart());
    try {
        const res = await axiosJWT.get("/v1/service", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllServiceSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllServiceFailed());
    }
};

export const createService = async (
    accessToken,
    dispatch,
    serviceData,
    axiosJWT
) => {
    dispatch(createServiceStart());
    try {
        const res = await axiosJWT.post("/v1/service", serviceData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createServiceSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Thêm sản phẩm thành công.");
            getAllService(accessToken, dispatch, axiosJWT);
        }
        console.log(res?.data?.data?.insertId);

        return res?.data?.data;
    } catch (error) {
        dispatch(createServiceFailed(error.response?.data));
    }
};

export const updateService = async (
    accessToken,
    dispatch,
    id,
    serviceData,
    axiosJWT
) => {
    dispatch(updateServiceStart());
    try {
        const res = await axiosJWT.put("/v1/service/" + id, serviceData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateServiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllService(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateServiceFailed(error.response?.data));
    }
};

export const addDiscount = async (
    accessToken,
    dispatch,
    id,
    discountData,
    axiosJWT
) => {
    dispatch(updateServiceStart());
    try {
        const res = await axiosJWT.put(
            "/v1/service/discount/" + id,
            discountData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateServiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllService(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateServiceFailed(error.response?.data));
    }
};

export const deleteService = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(deleteServiceStart());
    try {
        const res = await axiosJWT.delete("/v1/service/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteServiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllService(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteServiceFailed(error.response?.data));
    }
};
