import toast from "react-hot-toast";

import {
    createCustomerFailed,
    createCustomerStart,
    createCustomerSuccess,
    deleteCustomerFailed,
    deleteCustomerStart,
    deleteCustomerSuccess,
    getAllCustomerFailed,
    getAllCustomerStart,
    getAllCustomerSuccess,
    getCustomerUserByIdFailed,
    getCustomerUserByIdStart,
    getCustomerUserByIdSuccess,
    passwordChangeFailed,
    passwordChangeStart,
    passwordChangeSuccess,
    resetPasswordFailed,
    resetPasswordStart,
    resetPasswordSuccess,
    updateCustomerFailed,
    updateCustomerStart,
    updateCustomerSuccess,
} from "../slice/customerUserSlice";

export const getAllCustomerUser = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllCustomerStart());
    try {
        const res = await axiosJWT.get("/v1/customerUser", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllCustomerSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllCustomerFailed());
    }
};

export const createCustomerUser = async (
    accessToken,
    dispatch,
    customerUserData,
    axiosJWT
) => {
    dispatch(createCustomerStart());
    try {
        const res = await axiosJWT.post(
            "/v1/customerUser/create",
            customerUserData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(createCustomerSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success(res?.data?.msg);
            await getAllCustomerUser(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createCustomerFailed(error.response?.data));
    }
};

export const updateCustomerUser = async (
    accessToken,
    dispatch,
    id,
    customerUserData,
    axiosJWT
) => {
    dispatch(updateCustomerStart());
    try {
        const res = await axiosJWT.put(
            "/v1/customerUser/" + id,
            customerUserData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateCustomerSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllCustomerUser(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateCustomerFailed(error.response?.data));
    }
};

export const passwordChange = async (
    accessToken,
    dispatch,
    id,
    passwordData,
    axiosJWT
) => {
    dispatch(passwordChangeStart());
    try {
        const res = await axiosJWT.put(
            "/v1/customerUser/passwordChange/" + id,
            passwordData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(passwordChangeSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        if (res?.data?.status === 401) {
            toast.error(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(passwordChangeFailed(error.response?.data));
    }
};

export const resetPassword = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(resetPasswordStart());
    try {
        const res = await axiosJWT.put(
            "/v1/customerUser/resetPassword/" + id,
            {},
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(resetPasswordSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
    } catch (error) {
        dispatch(resetPasswordFailed(error.response?.data));
    }
};

export const deleteCustomerUser = async (
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteCustomerStart());
    try {
        const res = await axiosJWT.delete("/v1/customerUser/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteCustomerSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllCustomerUser(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteCustomerFailed(error.response?.data));
    }
};

export const getCustomerUserById = async (
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(getCustomerUserByIdStart());
    try {
        const res = await axiosJWT.get("/v1/customerUser/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getCustomerUserByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getCustomerUserByIdFailed(error.response?.data));
    }
};
