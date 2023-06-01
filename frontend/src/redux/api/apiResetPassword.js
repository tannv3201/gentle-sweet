import axios from "axios";
import { toast } from "react-hot-toast";

export const resetPassword = async (email) => {
    try {
        const res = await axios.get("/v1/resetPassword/email/" + email);
        console.log(res?.data);
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const checkVerifyCode = async (verifyCodeCustomer, codeId) => {
    try {
        const res = await axios.get("/v1/resetPassword/checkVerifyCode", {
            params: {
                verifyCodeCustomer: verifyCodeCustomer,
                codeId: codeId,
            },
        });
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        } else {
            toast.error(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};

export const passwordChangeWhenReset = async (customerUserId, passwordData) => {
    try {
        const res = await axios.put(
            "/v1/resetPassword/passwordChange/" + customerUserId,
            passwordData
        );
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        if (res?.data?.status === 401) {
            toast.error(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        console.log(error);
    }
};
