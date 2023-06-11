import toast from "react-hot-toast";

import {
    cancelInvoiceFailed,
    cancelInvoiceStart,
    cancelInvoiceSuccess,
    confirmInvoiceFailed,
    confirmInvoiceStart,
    confirmInvoiceSuccess,
    createInvoiceFailed,
    createInvoiceStart,
    createInvoiceSuccess,
    deleteInvoiceFailed,
    deleteInvoiceStart,
    deleteInvoiceSuccess,
    getAllInvoiceByUserFailed,
    getAllInvoiceByUserStart,
    getAllInvoiceByUserSuccess,
    getAllInvoiceFailed,
    getAllInvoiceStart,
    getAllInvoiceSuccess,
    getInvoiceByIdFailed,
    getInvoiceByIdStart,
    getInvoiceByIdSuccess,
    invoiceSearchFailed,
    invoiceSearchStart,
    invoiceSearchSuccess,
    updateInvoiceFailed,
    updateInvoiceStart,
    updateInvoiceSuccess,
} from "../slice/invoiceSlice";

export const getAllInvoice = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllInvoiceStart());
    try {
        const res = await axiosJWT.get("/v1/invoice", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllInvoiceSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllInvoiceFailed());
    }
};

export const getAllInvoiceByUser = async (
    id,
    accessToken,
    dispatch,
    axiosJWT
) => {
    dispatch(getAllInvoiceByUserStart());
    try {
        const res = await axiosJWT.get("/v1/invoice/" + id + "/customer", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllInvoiceByUserSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getAllInvoiceByUserFailed());
    }
};

export const getOwnInvoiceCustomer = async (
    id,
    accessToken,
    dispatch,
    axiosJWT
) => {
    dispatch(getAllInvoiceByUserStart());
    try {
        const res = await axiosJWT.get("/v1/invoice/" + id + "/customer", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllInvoiceByUserSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllInvoiceByUserFailed());
    }
};

export const createInvoice = async (
    accessToken,
    dispatch,
    invoiceData,
    axiosJWT
) => {
    dispatch(createInvoiceStart());
    try {
        const res = await axiosJWT.post("/v1/invoice", invoiceData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createInvoiceSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Tạo đơn hàng thành công");
            await getAllInvoice(accessToken, dispatch, axiosJWT);
        }

        return res?.data?.data?.insertId;
    } catch (error) {
        dispatch(createInvoiceFailed(error.response?.data));
    }
};

export const updateInvoice = async (
    accessToken,
    dispatch,
    id,
    invoiceData,
    axiosJWT
) => {
    dispatch(updateInvoiceStart());
    try {
        const res = await axiosJWT.put("/v1/invoice/" + id, invoiceData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateInvoiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            await getInvoiceById(dispatch, id, accessToken, axiosJWT);
        }
    } catch (error) {
        dispatch(updateInvoiceFailed(error.response?.data));
    }
};

export const addDiscount = async (
    accessToken,
    dispatch,
    id,
    discountData,
    axiosJWT
) => {
    dispatch(updateInvoiceStart());
    try {
        const res = await axiosJWT.put(
            "/v1/invoice/discount/" + id,
            discountData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateInvoiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getInvoiceById(dispatch, id, accessToken, axiosJWT);
        }
    } catch (error) {
        dispatch(updateInvoiceFailed(error.response?.data));
    }
};

export const deleteInvoice = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(deleteInvoiceStart());
    try {
        const res = await axiosJWT.delete("/v1/invoice/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteInvoiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getAllInvoice(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteInvoiceFailed(error.response?.data));
    }
};

export const getInvoiceById = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(getInvoiceByIdStart());
    try {
        const res = await axiosJWT.get("/v1/invoice/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getInvoiceByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getInvoiceByIdFailed(error.response?.data));
    }
};

export const confirmInvoice = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(confirmInvoiceStart());
    try {
        const res = await axiosJWT.put(
            "/v1/invoice/confirm/" + id,
            {},
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(confirmInvoiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getInvoiceById(dispatch, id, accessToken, axiosJWT);
            await getAllInvoice(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(confirmInvoiceFailed(error.response?.data));
    }
};

export const cancelInvoice = async (
    accessToken,
    dispatch,
    id,
    note,
    axiosJWT
) => {
    dispatch(cancelInvoiceStart());
    try {
        const res = await axiosJWT.put("/v1/invoice/cancel/" + id, note, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(cancelInvoiceSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getInvoiceById(dispatch, id, accessToken, axiosJWT);
            await getAllInvoice(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(cancelInvoiceFailed(error.response?.data));
    }
};

export const invoiceSearch = async (
    accessToken,
    params,
    dispatch,
    axiosJWT
) => {
    dispatch(invoiceSearchStart());
    try {
        const res = await axiosJWT.get("/v1/invoice/search", {
            params: params,
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(invoiceSearchSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(invoiceSearchFailed());
    }
};
