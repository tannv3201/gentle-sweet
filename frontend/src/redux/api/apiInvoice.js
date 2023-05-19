import toast from "react-hot-toast";

import {
    createInvoiceFailed,
    createInvoiceStart,
    createInvoiceSuccess,
    deleteInvoiceFailed,
    deleteInvoiceStart,
    deleteInvoiceSuccess,
    getAllInvoiceFailed,
    getAllInvoiceStart,
    getAllInvoiceSuccess,
    getInvoiceByIdFailed,
    getInvoiceByIdStart,
    getInvoiceByIdSuccess,
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
            toast.success("Thêm hóa đơn thành công");
            getAllInvoice(accessToken, dispatch, axiosJWT);
        }
        console.log(res?.data?.data);

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
            toast.success(res?.data?.msg);
            // getAllInvoice(accessToken, dispatch, axiosJWT);
            getInvoiceById(dispatch, id, accessToken, axiosJWT);
        }
        console.log(res?.data);
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
            getInvoiceById(dispatch, id, accessToken, axiosJWT);
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
            getAllInvoice(accessToken, dispatch, axiosJWT);
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
