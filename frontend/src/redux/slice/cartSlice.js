import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {
            cartList: [],
            cart: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllCartStart: (state) => {
            state.cart.isFetching = true;
        },
        getAllCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.cart.cartList = action.payload;
        },
        getAllCartFailed: (state) => {
            state.cart.isFetching = false;
            state.cart.error = true;
        },

        // Get all ADMIN USER
        getCartByIdStart: (state) => {
            state.cart.isFetching = true;
        },
        getCartByIdSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.cart.cart = action.payload;
        },
        getCartByIdFailed: (state) => {
            state.cart.isFetching = false;
            state.cart.error = true;
        },

        // Get all ADMIN USER
        getCartByUserIdStart: (state) => {
            state.cart.isFetching = true;
        },
        getCartByUserIdSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.cart.cartList = action.payload;
        },
        getCartByUserIdFailed: (state) => {
            state.cart.isFetching = false;
            state.cart.error = true;
        },

        // Create Cart Category
        createCartStart: (state) => {
            state.cart.isFetching = true;
        },
        createCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.msg = action.payload;
        },
        createCartFailed: (state, action) => {
            state.cart.isFetching = false;
            state.cart.error = true;
            state.msg = action.payload;
        },

        // Update Cart
        updateCartStart: (state) => {
            state.cart.isFetching = true;
        },
        updateCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.msg = action.payload;
        },
        updateCartFailed: (state, action) => {
            state.cart.isFetching = false;
            state.cart.error = true;
            state.msg = action.payload;
        },

        // Delete Cart
        deleteCartStart: (state) => {
            state.cart.isFetching = true;
        },
        deleteCartSuccess: (state, action) => {
            state.cart.isFetching = false;
            state.msg = action.payload;
        },
        deleteCartFailed: (state, action) => {
            state.cart.isFetching = false;
            state.cart.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllCartStart,
    getAllCartSuccess,
    getAllCartFailed,

    getCartByIdStart,
    getCartByIdSuccess,
    getCartByIdFailed,

    getCartByUserIdStart,
    getCartByUserIdSuccess,
    getCartByUserIdFailed,

    createCartStart,
    createCartSuccess,
    createCartFailed,

    updateCartStart,
    updateCartSuccess,
    updateCartFailed,

    deleteCartStart,
    deleteCartSuccess,
    deleteCartFailed,
} = cartSlice.actions;

export default cartSlice.reducer;
