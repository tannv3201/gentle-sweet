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
        }
    } catch (error) {
        dispatch(createAdminUserFailed(error.response?.data));
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
