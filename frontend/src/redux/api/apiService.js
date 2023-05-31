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
    getServiceByIdFailed,
    getServiceByIdStart,
    getServiceByIdSuccess,
    serviceLimitFailed,
    serviceLimitStart,
    serviceLimitSuccess,
    serviceSearchFailed,
    serviceSearchStart,
    serviceSearchSuccess,
    updateServiceFailed,
    updateServiceStart,
    updateServiceSuccess,
} from "../slice/serviceSlice";
import axios from "axios";

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
            await getAllService(accessToken, dispatch, axiosJWT);
        }

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
            await getServiceById(dispatch, id, accessToken, axiosJWT);
            await getAllService(accessToken, dispatch, axiosJWT);
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
            await getServiceById(dispatch, id, accessToken, axiosJWT);
            await getAllService(accessToken, dispatch, axiosJWT);
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
            await getAllService(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteServiceFailed(error.response?.data));
    }
};

export const getServiceById = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(getServiceByIdStart());
    try {
        const res = await axiosJWT.get("/v1/service/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getServiceByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getServiceByIdFailed(error.response?.data));
    }
};

export const serviceSearch = async (
    accessToken,
    params,
    dispatch,
    axiosJWT
) => {
    dispatch(serviceSearchStart());
    try {
        const res = await axios.get("/v1/service/search", {
            params: params,
            // headers: {
            //     token: `Bearer ${accessToken}`,
            // },
        });
        dispatch(serviceSearchSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(serviceSearchFailed());
    }
};

export const serviceLimit = async (accessToken, params, dispatch, axiosJWT) => {
    dispatch(serviceLimitStart());
    try {
        const res = await axiosJWT.get("/v1/service/search", {
            params: params,
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(serviceLimitSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(serviceLimitFailed());
    }
};
