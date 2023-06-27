import toast from "react-hot-toast";

import {
    bookingSearchFailed,
    bookingSearchStart,
    bookingSearchSuccess,
    cancelBookingFailed,
    cancelBookingStart,
    cancelBookingSuccess,
    confirmBookingFailed,
    confirmBookingStart,
    confirmBookingSuccess,
    createBookingFailed,
    createBookingStart,
    createBookingSuccess,
    deleteBookingFailed,
    deleteBookingStart,
    deleteBookingSuccess,
    getAllBookingByUserFailed,
    getAllBookingByUserStart,
    getAllBookingByUserSuccess,
    getAllBookingFailed,
    getAllBookingStart,
    getAllBookingSuccess,
    getBookingByIdFailed,
    getBookingByIdStart,
    getBookingByIdSuccess,
    updateBookingFailed,
    updateBookingStart,
    updateBookingSuccess,
} from "../slice/bookingSlice";

export const getAllBooking = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllBookingStart());
    try {
        const res = await axiosJWT.get("/v1/booking", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllBookingSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllBookingFailed());
    }
};

export const getAllBookingByUser = async (
    id,
    accessToken,
    dispatch,
    axiosJWT
) => {
    dispatch(getAllBookingByUserStart());
    try {
        const res = await axiosJWT.get("/v1/booking/" + id + "/customer", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllBookingByUserSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getAllBookingByUserFailed());
    }
};

export const createBooking = async (
    accessToken,
    dispatch,
    bookingData,
    axiosJWT
) => {
    dispatch(createBookingStart());
    try {
        const res = await axiosJWT.post("/v1/booking", bookingData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createBookingSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success("Thêm lịch hẹn thành công");
            getAllBooking(accessToken, dispatch, axiosJWT);
        } else {
            toast.error("Có lỗi xảy ra!");
        }

        return res?.data?.data?.insertId;
    } catch (error) {
        dispatch(createBookingFailed(error.response?.data));
    }
};

export const createBookingByCustomer = async (
    userId,
    accessToken,
    dispatch,
    bookingData,
    axiosJWT
) => {
    dispatch(createBookingStart());
    try {
        const res = await axiosJWT.post("/v1/booking", bookingData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createBookingSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            // toast.success("Thêm lịch hẹn thành công");
            getAllBookingByUser(userId, accessToken, dispatch, axiosJWT);
        } else {
            toast.error("Có lỗi xảy ra!");
        }

        return res?.data?.data?.insertId;
    } catch (error) {
        dispatch(createBookingFailed(error.response?.data));
    }
};

export const updateBooking = async (
    accessToken,
    dispatch,
    id,
    bookingData,
    axiosJWT
) => {
    dispatch(updateBookingStart());
    try {
        const res = await axiosJWT.put("/v1/booking/" + id, bookingData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateBookingSuccess(res?.data));
        if (res?.data?.status === 200) {
            getBookingById(dispatch, id, accessToken, axiosJWT);
        }
    } catch (error) {
        dispatch(updateBookingFailed(error.response?.data));
    }
};

// export const addDiscount = async (
//     accessToken,
//     dispatch,
//     id,
//     discountData,
//     axiosJWT
// ) => {
//     dispatch(updateBookingStart());
//     try {
//         const res = await axiosJWT.put(
//             "/v1/booking/discount/" + id,
//             discountData,
//             {
//                 headers: {
//                     token: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         dispatch(updateBookingSuccess(res?.data));
//         if (res?.data?.status === 200) {
//             toast.success(res?.data?.msg);
//             getBookingById(dispatch, id, accessToken, axiosJWT);
//         }
//     } catch (error) {
//         dispatch(updateBookingFailed(error.response?.data));
//     }
// };

export const deleteBooking = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(deleteBookingStart());
    try {
        const res = await axiosJWT.delete("/v1/booking/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteBookingSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            getAllBooking(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteBookingFailed(error.response?.data));
    }
};

export const getBookingById = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(getBookingByIdStart());
    try {
        const res = await axiosJWT.get("/v1/booking/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getBookingByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getBookingByIdFailed(error.response?.data));
    }
};

export const confirmBooking = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(confirmBookingStart());
    try {
        const res = await axiosJWT.put(
            "/v1/booking/confirm/" + id,
            {},
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(confirmBookingSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getBookingById(dispatch, id, accessToken, axiosJWT);
            await getAllBooking(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(confirmBookingFailed(error.response?.data));
    }
};

export const cancelBooking = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(cancelBookingStart());
    try {
        const res = await axiosJWT.put(
            "/v1/booking/cancel/" + id,
            {},
            {
                headers: {
                    token: `Bearer ${accessToken}`,
                },
            }
        );
        dispatch(cancelBookingSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getBookingById(dispatch, id, accessToken, axiosJWT);
            await getAllBooking(accessToken, dispatch, axiosJWT);
        }
    } catch (error) {
        dispatch(cancelBookingFailed(error.response?.data));
    }
};

export const bookingSearch = async (
    accessToken,
    params,
    dispatch,
    axiosJWT
) => {
    dispatch(bookingSearchStart());
    try {
        const res = await axiosJWT.get("/v1/booking/search", {
            params: params,
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(bookingSearchSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(bookingSearchFailed());
    }
};
