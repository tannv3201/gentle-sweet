import toast from "react-hot-toast";

import {
    createServiceCategoryFailed,
    createServiceCategoryStart,
    createServiceCategorySuccess,
    deleteServiceCategoryFailed,
    deleteServiceCategoryStart,
    deleteServiceCategorySuccess,
    getAllServiceCategoryFailed,
    getAllServiceCategoryStart,
    getAllServiceCategorySuccess,
    getServiceCategoryByIdFailed,
    getServiceCategoryByIdStart,
    getServiceCategoryByIdSuccess,
    updateServiceCategoryFailed,
    updateServiceCategoryStart,
    updateServiceCategorySuccess,
} from "../slice/serviceCategorySlice";

export const getAllServiceCategory = async (
    accessToken,
    dispatch,
    axiosJWT
) => {
    dispatch(getAllServiceCategoryStart());
    try {
        const res = await axiosJWT.get("/v1/serviceCategory", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllServiceCategorySuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllServiceCategoryFailed());
    }
};

export const getServiceCategoryById = async (
    serviceCategoryId,
    accessToken,
    dispatch,
    axiosJWT
) => {
    dispatch(getServiceCategoryByIdStart());
    try {
        const res = await axiosJWT.get(
            "/v1/serviceCategory/" + serviceCategoryId,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(getServiceCategoryByIdSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getServiceCategoryByIdFailed());
    }
};

export const createServiceCategory = async (
    accessToken,
    dispatch,
    serviceCategoryData,
    axiosJWT
) => {
    dispatch(createServiceCategoryStart());
    try {
        const res = await axiosJWT.post(
            "/v1/serviceCategory",
            serviceCategoryData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(createServiceCategorySuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success(res?.data?.msg);
            await getAllServiceCategory(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createServiceCategoryFailed(error.response?.data));
    }
};

export const updateServiceCategory = async (
    accessToken,
    dispatch,
    id,
    serviceCategoryData,
    axiosJWT
) => {
    dispatch(updateServiceCategoryStart());
    try {
        const res = await axiosJWT.put(
            "/v1/serviceCategory/" + id,
            serviceCategoryData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateServiceCategorySuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllServiceCategory(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateServiceCategoryFailed(error.response?.data));
    }
};

export const deleteServiceCategory = async (
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteServiceCategoryStart());
    try {
        const res = await axiosJWT.delete("/v1/serviceCategory/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteServiceCategorySuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllServiceCategory(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteServiceCategoryFailed(error.response?.data));
    }
};
