import toast from "react-hot-toast";

import {
    createRatingFailed,
    createRatingStart,
    createRatingSuccess,
    getRatingByBookingIdFailed,
    getRatingByBookingIdStart,
    getRatingByBookingIdSuccess,
    getRatingByInvoiceIdFailed,
    getRatingByInvoiceIdStart,
    getRatingByInvoiceIdSuccess,
    getRatingByProductIdFailed,
    getRatingByProductIdStart,
    getRatingByProductIdSuccess,
    getRatingByServiceIdFailed,
    getRatingByServiceIdStart,
    getRatingByServiceIdSuccess,
} from "../slice/ratingSlice";
import axios from "axios";

export const getRatingByProductId = async (dispatch, productId) => {
    dispatch(getRatingByProductIdStart());
    try {
        const res = await axios.get("/v1/rating/product/" + productId);
        dispatch(getRatingByProductIdSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getRatingByProductIdFailed());
    }
};

export const getRatingByInvoiceId = async (dispatch, invoiceId) => {
    dispatch(getRatingByInvoiceIdStart());
    try {
        const res = await axios.get("/v1/rating/invoice/" + invoiceId);
        dispatch(getRatingByInvoiceIdSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getRatingByInvoiceIdFailed());
    }
};

export const getRatingByBookingId = async (dispatch, bookingId) => {
    dispatch(getRatingByBookingIdStart());
    try {
        const res = await axios.get("/v1/rating/booking/" + bookingId);
        dispatch(getRatingByBookingIdSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getRatingByBookingIdFailed());
    }
};

export const getRatingByServiceId = async (dispatch, serviceId) => {
    dispatch(getRatingByServiceIdStart());
    try {
        const res = await axios.get("/v1/rating/service/" + serviceId);
        dispatch(getRatingByServiceIdSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getRatingByServiceIdFailed());
    }
};

export const createRating = async (
    accessToken,
    dispatch,
    ratingData,
    axiosJWT
) => {
    dispatch(createRatingStart());
    try {
        const res = await axiosJWT.post("/v1/rating", ratingData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createRatingSuccess(res?.data));
        if (res?.data?.status === 201) {
            toast.success("Đánh giá thành công.");
            if (ratingData?.invoice_id) {
                await getRatingByInvoiceId(dispatch, ratingData?.invoice_id);
            } else if (ratingData?.booking_id) {
                await getRatingByBookingId(dispatch, ratingData?.booking_id);
            }
        }

        return res?.data?.data;
    } catch (error) {
        dispatch(createRatingFailed(error.response?.data));
    }
};
