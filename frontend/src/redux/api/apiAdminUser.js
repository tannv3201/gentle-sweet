import toast from "react-hot-toast";

import {
    getAdminUserStart,
    getAdminUserSuccess,
    getAdminUserFailed,
    createAdminUserStart,
    createAdminUserFailed,
    createAdminUserSuccess,
    deleteAdminUserStart,
    deleteAdminUserSuccess,
    deleteAdminUserFailed,
    updateAdminUserStart,
    updateAdminUserSuccess,
    updateAdminUserFailed,
    passwordChangeStart,
    passwordChangeSuccess,
    passwordChangeFailed,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailed,
    getAdminUserByIdStart,
    getAdminUserByIdSuccess,
    getAdminUserByIdFailed,
} from "../slice/adminUserSlice";

export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAdminUserStart());
    try {
        const res = await axiosJWT.get("/v1/adminUser", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAdminUserSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAdminUserFailed());
    }
};

export const createAdminUser = async (
    accessToken,
    dispatch,
    adminUserData,
    axiosJWT
) => {
    dispatch(createAdminUserStart());
    try {
        const res = await axiosJWT.post("/v1/adminUser", adminUserData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createAdminUserSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success(res?.data?.msg);
            await getAllUser(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createAdminUserFailed(error.response?.data));
    }
};

export const updateAdminUser = async (
    accessToken,
    dispatch,
    id,
    adminUserData,
    axiosJWT
) => {
    dispatch(updateAdminUserStart());
    try {
        const res = await axiosJWT.put("/v1/adminUser/" + id, adminUserData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateAdminUserSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllUser(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateAdminUserFailed(error.response?.data));
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
            "/v1/adminUser/passwordChange/" + id,
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
            "/v1/adminUser/resetPassword/" + id,
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

export const deleteAdminUser = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(deleteAdminUserStart());
    try {
        const res = await axiosJWT.delete("/v1/adminUser/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteAdminUserSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllUser(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteAdminUserFailed(error.response?.data));
    }
};

export const getAdminUserById = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(getAdminUserByIdStart());
    try {
        const res = await axiosJWT.get("/v1/adminUser/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAdminUserByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getAdminUserByIdFailed(error.response?.data));
    }
};
