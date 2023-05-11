import axios from "axios";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailded,
    logoutStart,
    logoutSuccess,
} from "./authSlice";
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
} from "./adminUserSlice";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        if (
            res.data?.role_name === "SUPER_ADMIN" ||
            res.data?.role_name === "ADMIN" ||
            res.data?.role_name === "STAFF"
        ) {
            navigate("/admin/");
            toast.success(res.data.msg);
        } else if (res.data?.status === 200) {
            navigate("/");
            toast.success(res.data.msg);
        } else {
            toast.error(res.data.msg);
        }
    } catch (error) {
        dispatch(loginFailed());
    }
};

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
            getAllUser(accessToken, dispatch, axiosJWT);
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
            getAllUser(accessToken, dispatch, axiosJWT);
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
            getAllUser(accessToken, dispatch, axiosJWT);
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
            getAllUser(accessToken, dispatch, axiosJWT);
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
            getAllUser(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteAdminUserFailed(error.response?.data));
    }
};

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate("/");
    } catch (error) {
        dispatch(logoutFailded());
    }
};
