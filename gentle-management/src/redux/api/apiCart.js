import toast from "react-hot-toast";

import {
    createCartFailed,
    createCartStart,
    createCartSuccess,
    deleteCartFailed,
    deleteCartStart,
    deleteCartSuccess,
    getAllCartFailed,
    getAllCartStart,
    getAllCartSuccess,
    getCartByIdFailed,
    getCartByIdStart,
    getCartByIdSuccess,
    getCartByUserIdFailed,
    getCartByUserIdStart,
    getCartByUserIdSuccess,
    updateCartFailed,
    updateCartStart,
    updateCartSuccess,
} from "../slice/cartSlice";

export const getAllCart = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllCartStart());
    try {
        const res = await axiosJWT.get("/v1/cart", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getAllCartSuccess(res?.data));
        return res?.data?.length;
    } catch (error) {
        dispatch(getAllCartFailed());
    }
};

export const createCart = async (accessToken, dispatch, cartData, axiosJWT) => {
    dispatch(createCartStart());
    try {
        const res = await axiosJWT.post("/v1/cart", cartData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(createCartSuccess(res?.data));
        if (res?.data?.status === 201) {
            // toast.success(res?.data?.msg);
            toast.success("Đã thêm vào giỏ hàng.");
            await getAllCart(accessToken, dispatch, axiosJWT);
        }

        return res?.data?.data;
    } catch (error) {
        dispatch(createCartFailed(error.response?.data));
    }
};

export const updateCart = async (
    accessToken,
    dispatch,
    userId,
    cartId,
    cartData,
    axiosJWT
) => {
    dispatch(updateCartStart());
    try {
        const res = await axiosJWT.put("/v1/cart/" + cartId, cartData, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(updateCartSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            // getAllCart(accessToken, dispatch, axiosJWT);
            await getCartByUserId(accessToken, dispatch, userId, axiosJWT);
        }
    } catch (error) {
        dispatch(updateCartFailed(error.response?.data));
    }
};

export const deleteCart = async (
    accessToken,
    dispatch,
    cartItemId,
    userId,
    axiosJWT
) => {
    dispatch(deleteCartStart());
    try {
        const res = await axiosJWT.delete("/v1/cart/" + cartItemId, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteCartSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
            await getCartByUserId(accessToken, dispatch, userId, axiosJWT);
        }
    } catch (error) {
        dispatch(deleteCartFailed(error.response?.data));
    }
};

export const getCartById = async (dispatch, id, accessToken, axiosJWT) => {
    dispatch(getCartByIdStart());
    try {
        const res = await axiosJWT.get("/v1/cart/" + id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getCartByIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getCartByIdFailed(error.response?.data));
    }
};

export const getCartByUserId = async (
    accessToken,
    dispatch,
    userId,
    axiosJWT
) => {
    dispatch(getCartByUserIdStart());
    try {
        const res = await axiosJWT.get("/v1/cart/" + userId + "/customer", {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getCartByUserIdSuccess(res?.data));
        if (res?.data?.status === 200) {
            toast.success(res?.data?.msg);
        }
        return res?.data;
    } catch (error) {
        dispatch(getCartByUserIdFailed(error.response?.data));
    }
};
