import axios from "axios";
import toast from "react-hot-toast";

import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailded,
    logoutStart,
    logoutSuccess,
    signupFailded,
    signupStart,
    signupSuccess,
} from "../slice/authSlice";
import { resetApp } from "../store";
import { getCustomerUserByIdSuccess } from "../slice/customerUserSlice";

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
            toast.error("Tài khoản không hợp lệ.");
        } else if (res.data?.status === 200) {
            navigate("/");
            toast.success(res.data.msg);
        } else {
            toast.error(res.data.msg);
        }

        return res?.data;
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const logout = async (
    dispatch,
    user,
    navigate,
    accessToken,
    axiosJWT
) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", user?.id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        dispatch(getCustomerUserByIdSuccess(null));
        if (parseInt(user?.role_id) === 4) {
            navigate("/");
            toast.success("Đăng xuất thành công");
        } else if (parseInt(user?.role_id) < 4) {
            navigate("/dang-nhap");
            toast.success("Đăng xuất thành công");
        }
    } catch (error) {
        dispatch(logoutFailded());
    }
};

export const signup = async (customerData, dispatch, navigate) => {
    dispatch(signupStart());
    try {
        const res = await axios.post("/v1/auth/register", customerData);
        dispatch(signupSuccess());
        if (res?.data?.insertId) {
            navigate("/dang-nhap");
        }
    } catch (error) {
        dispatch(signupFailded());
        toast.success("Có lỗi xảy ra");
    }
};
