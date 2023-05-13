import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: {
            productList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllProductStart: (state) => {
            state.product.isFetching = true;
        },
        getAllProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.product.productList = action.payload;
        },
        getAllProductFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = true;
        },
        // Create Product Category
        createProductStart: (state) => {
            state.product.isFetching = true;
        },
        createProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.msg = action.payload;
        },
        createProductFailed: (state, action) => {
            state.product.isFetching = false;
            state.product.error = true;
            state.msg = action.payload;
        },

        // Update Product
        updateProductStart: (state) => {
            state.product.isFetching = true;
        },
        updateProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.msg = action.payload;
        },
        updateProductFailed: (state, action) => {
            state.product.isFetching = false;
            state.product.error = true;
            state.msg = action.payload;
        },

        // Delete Product
        deleteProductStart: (state) => {
            state.product.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.msg = action.payload;
        },
        deleteProductFailed: (state, action) => {
            state.product.isFetching = false;
            state.product.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,

    createProductStart,
    createProductSuccess,
    createProductFailed,

    updateProductStart,
    updateProductSuccess,
    updateProductFailed,

    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,
} = productSlice.actions;

export default productSlice.reducer;
