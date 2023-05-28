import toast from "react-hot-toast";

import {
    createBookingDetailFailed,
    createBookingDetailStart,
    createBookingDetailSuccess,
    deleteBookingDetailFailed,
    deleteBookingDetailStart,
    deleteBookingDetailSuccess,
    getAllBookingDetailByBookingIdFailed,
    getAllBookingDetailByBookingIdStart,
    getAllBookingDetailByBookingIdSuccess,
    getAllBookingDetailFailed,
    getAllBookingDetailStart,
    getAllBookingDetailSuccess,
    getBookingDetailByBookingIdFailed,
    getBookingDetailByBookingIdStart,
    getBookingDetailByBookingIdSuccess,
    getBookingDetailByIdFailed,
    getBookingDetailByIdStart,
    getBookingDetailByIdSuccess,
    updateBookingDetailFailed,
    updateBookingDetailStart,
    updateBookingDetailSuccess,
} from "../slice/bookingDetailSlice";
import { getAllBooking } from "./apiBooking";

export const getAllBookingDetail = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllBookingDetailStart());
    try {
        const res = await axiosJWT.get("/v1/bookingDetail", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllBookingDetailSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllBookingDetailFailed());
    }
};

export const createBookingDetail = async (
    bookingId,
    accessToken,
    dispatch,
    bookingDetailData,
    axiosJWT
) => {
    dispatch(createBookingDetailStart());
    try {
        const res = await axiosJWT.post(
            "/v1/bookingDetail",
            bookingDetailData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(createBookingDetailSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Thêm chi tiết hóa đơn thành công");
            await getBookingDetailByBookingId(
                dispatch,
                bookingId,
                accessToken,
                axiosJWT
            );
            await getAllBooking(accessToken, dispatch, axiosJWT);
        }
        return res?.data?.data?.insertId;
    } catch (error) {
        dispatch(createBookingDetailFailed(error.response?.data));
    }
};

export const createBookingDetailByCustomer = async (
    bookingId,
    accessToken,
    dispatch,
    bookingDetailData,
    axiosJWT
) => {
    dispatch(createBookingDetailStart());
    try {
        const res = await axiosJWT.post(
            "/v1/bookingDetail",
            bookingDetailData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(createBookingDetailSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Thêm chi tiết hóa đơn thành công");
            await getBookingDetailByBookingId(
                dispatch,
                bookingId,
                accessToken,
                axiosJWT
            );
            // await getBooking(accessToken, dispatch, axiosJWT);
        }
        return res?.data?.data?.insertId;
    } catch (error) {
        dispatch(createBookingDetailFailed(error.response?.data));
    }
};

export const updateBookingDetail = async (
    accessToken,
    dispatch,
    bookingDetailId,
    bookingId,
    bookingDetailData,
    axiosJWT
) => {
    dispatch(updateBookingDetailStart());
    try {
        const res = await axiosJWT.put(
            "/v1/bookingDetail/" + bookingDetailId,
            bookingDetailData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateBookingDetailSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            // getAllBookingDetail(accessToken, dispatch, axiosJWT);
            await getBookingDetailByBookingId(
                dispatch,
                bookingId,
                accessToken,
                axiosJWT
            );
            await getAllBooking(accessToken, dispatch, axiosJWT);
        }
        console.log(res?.data);
    } catch (error) {
        dispatch(updateBookingDetailFailed(error.response?.data));
    }
};

export const addDiscount = async (
    accessToken,
    dispatch,
    id,
    discountData,
    axiosJWT
) => {
    dispatch(updateBookingDetailStart());
    try {
        const res = await axiosJWT.put(
            "/v1/bookingDetail/discount/" + id,
            discountData,
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(updateBookingDetailSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getBookingDetailById(dispatch, id, accessToken, axiosJWT);
        }
    } catch (error) {
        dispatch(updateBookingDetailFailed(error.response?.data));
    }
};

export const deleteBookingDetail = async (
    dispatch,
    id,
    bookingId,
    accessToken,
    axiosJWT
) => {
    dispatch(deleteBookingDetailStart());
    try {
        const res = await axiosJWT.delete("/v1/bookingDetail/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteBookingDetailSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getBookingDetailByBookingId(
                dispatch,
                bookingId,
                accessToken,
                axiosJWT
            );
            await getAllBooking(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteBookingDetailFailed(error.response?.data));
    }
};

export const getBookingDetailById = async (
    dispatch,
    id,
    accessToken,
    axiosJWT
) => {
    dispatch(getBookingDetailByIdStart());
    try {
        const res = await axiosJWT.get("/v1/bookingDetail/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getBookingDetailByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getBookingDetailByIdFailed(error.response?.data));
    }
};

export const getBookingDetailByBookingId = async (
    dispatch,
    bookingId,
    accessToken,
    axiosJWT
) => {
    dispatch(getBookingDetailByBookingIdStart());
    try {
        const res = await axiosJWT.get(
            "/v1/bookingDetail/" + bookingId + "/bookingDetail",
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(getBookingDetailByBookingIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getBookingDetailByBookingIdFailed(error.response?.data));
    }
};

export const getAllBookingDetailByBookingId = async (
    dispatch,
    bookingId,
    accessToken,
    axiosJWT
) => {
    dispatch(getAllBookingDetailByBookingIdStart());
    try {
        const res = await axiosJWT.get(
            "/v1/bookingDetail/" + bookingId + "/bookingDetail",
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(getAllBookingDetailByBookingIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getAllBookingDetailByBookingIdFailed(error.response?.data));
    }
};
