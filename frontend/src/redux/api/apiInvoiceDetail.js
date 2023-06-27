import toast from "react-hot-toast";

import {
    createInvoiceDetailFailed,
    createInvoiceDetailStart,
    createInvoiceDetailSuccess,
    deleteInvoiceDetailFailed,
    deleteInvoiceDetailStart,
    deleteInvoiceDetailSuccess,
    getAllInvoiceDetailFailed,
    getAllInvoiceDetailStart,
    getAllInvoiceDetailSuccess,
    getInvoiceDetailByIdFailed,
    getInvoiceDetailByIdStart,
    getInvoiceDetailByIdSuccess,
    getInvoiceDetailByInvoiceIdFailed,
    getInvoiceDetailByInvoiceIdStart,
    getInvoiceDetailByInvoiceIdSuccess,
    updateInvoiceDetailFailed,
    updateInvoiceDetailStart,
    updateInvoiceDetailSuccess,
} from "../slice/invoiceDetailSlice";
import { getAllInvoice } from "./apiInvoice";

export const getAllInvoiceDetail = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllInvoiceDetailStart());
    try {
        const res = await axiosJWT.get("/v1/invoiceDetail", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllInvoiceDetailSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllInvoiceDetailFailed());
    }
};

export const createInvoiceDetail = async (
    invoiceId,
    accessToken,
    dispatch,
    invoiceDetailData,
    axiosJWT
) => {
    dispatch(createInvoiceDetailStart());
    try {
        const res = await axiosJWT.post(
            "/v1/invoiceDetail",
            invoiceDetailData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(createInvoiceDetailSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Tạo đơn hàng thành công");
            await getInvoiceDetailByInvoiceId(
                dispatch,
                invoiceId,
                accessToken,
                axiosJWT
            );
            await getAllInvoice(accessToken, dispatch, axiosJWT);
        }
        return res?.data?.data?.insertId;
    } catch (error) {
        dispatch(createInvoiceDetailFailed(error.response?.data));
    }
};

export const updateInvoiceDetail = async (
    accessToken,
    dispatch,
    id,
    invoiceId,
    invoiceDetailData,
    axiosJWT
) => {
    dispatch(updateInvoiceDetailStart());
    try {
        const res = await axiosJWT.put(
            "/v1/invoiceDetail/" + id,
            invoiceDetailData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateInvoiceDetailSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            // getAllInvoiceDetail(accessToken, dispatch, axiosJWT);
            await getInvoiceDetailByInvoiceId(
                dispatch,
                invoiceId,
                accessToken,
                axiosJWT
            );
            await getAllInvoice(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(updateInvoiceDetailFailed(error.response?.data));
    }
};

export const addDiscount = async (
    accessToken,
    dispatch,
    id,
    discountData,
    axiosJWT
) => {
    dispatch(updateInvoiceDetailStart());
    try {
        const res = await axiosJWT.put(
            "/v1/invoiceDetail/discount/" + id,
            discountData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateInvoiceDetailSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getInvoiceDetailById(dispatch, id, accessToken, axiosJWT);
        }
    } catch (error) {
        dispatch(updateInvoiceDetailFailed(error.response?.data));
    }
};

export const deleteInvoiceDetail = async (
    dispatch,
    id,
    invoiceId,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteInvoiceDetailStart());
    try {
        const res = await axiosJWT.delete("/v1/invoiceDetail/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteInvoiceDetailSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getInvoiceDetailByInvoiceId(
                dispatch,
                invoiceId,
                accessToken,
                axiosJWT
            );
            await getAllInvoice(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteInvoiceDetailFailed(error.response?.data));
    }
};

export const getInvoiceDetailById = async (
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(getInvoiceDetailByIdStart());
    try {
        const res = await axiosJWT.get("/v1/invoiceDetail/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getInvoiceDetailByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getInvoiceDetailByIdFailed(error.response?.data));
    }
};

export const getInvoiceDetailByInvoiceId = async (
    dispatch,
    invoiceId,
    accessToken,
    axiosJWT
) => {
    dispatch(getInvoiceDetailByInvoiceIdStart());
    try {
        const res = await axiosJWT.get(
            "/v1/invoiceDetail/" + invoiceId + "/invoiceDetail",
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(getInvoiceDetailByInvoiceIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getInvoiceDetailByInvoiceIdFailed(error.response?.data));
    }
};
