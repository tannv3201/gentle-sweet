import toast from "react-hot-toast";

import {
    createRoleFailed,
    createRoleStart,
    createRoleSuccess,
    deleteRoleFailed,
    deleteRoleStart,
    deleteRoleSuccess,
    getAllRoleFailed,
    getAllRoleStart,
    getAllRoleSuccess,
    getRoleByIdFailed,
    getRoleByIdStart,
    getRoleByIdSuccess,
    updateRoleFailed,
    updateRoleStart,
    updateRoleSuccess,
} from "../slice/roleSlice";
import axios from "axios";

export const getAllRole = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllRoleStart());
    try {
        const res = await axios.get("/v1/role", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllRoleSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getAllRoleFailed());
    }
};

export const getRoleById = async (accessToken, roleId, dispatch, axiosJWT) => {
    dispatch(getRoleByIdStart());
    try {
        const res = await axiosJWT.get("/v1/role/" + roleId, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getRoleByIdSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getRoleByIdFailed());
    }
};

export const createRole = async (accessToken, dispatch, roleData, axiosJWT) => {
    dispatch(createRoleStart());
    try {
        const res = await axiosJWT.post("/v1/role", roleData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createRoleSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success(res?.data?.msg);
            await getAllRole(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(createRoleFailed(error.response?.data));
    }
};

export const updateRole = async (
    accessToken,
    dispatch,
    roleId,
    roleData,
    axiosJWT
) => {
    dispatch(updateRoleStart());
    try {
        const res = await axiosJWT.put("/v1/role/" + roleId, roleData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateRoleSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllRole(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateRoleFailed(error.response?.data));
    }
};

export const deleteRole = async (dispatch, roleId, accessToken, axiosJWT) => {
    dispatch(deleteRoleStart());
    try {
        const res = await axiosJWT.delete("/v1/role/" + roleId, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteRoleSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllRole(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteRoleFailed(error.response?.data));
    }
};
