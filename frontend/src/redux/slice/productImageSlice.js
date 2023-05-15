import { createSlice } from "@reduxjs/toolkit";

const productImageSlice = createSlice({
    name: "productImage",
    initialState: {
        productImage: {
            productImageList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllProductImageStart: (state) => {
            state.productImage.isFetching = true;
        },
        getAllProductImageSuccess: (state, action) => {
            state.productImage.isFetching = false;
            state.productImage.productList = action.payload;
        },
        getAllProductImageFailed: (state) => {
            state.productImage.isFetching = false;
            state.productImage.error = true;
        },

        // Get all ADMIN USER
        getAllProductImageByProductIdStart: (state) => {
            state.productImage.isFetching = true;
        },
        getAllProductImageByProductIdSuccess: (state, action) => {
            state.productImage.isFetching = false;
            state.productImage.productImageList = action.payload;
        },
        getAllProductImageByProductIdFailed: (state) => {
            state.productImage.isFetching = false;
            state.productImage.error = true;
        },
        // Create ProductImage Category
        createProductImageStart: (state) => {
            state.productImage.isFetching = true;
        },
        createProductImageSuccess: (state, action) => {
            state.productImage.isFetching = false;
            state.msg = action.payload;
        },
        createProductImageFailed: (state, action) => {
            state.productImage.isFetching = false;
            state.productImage.error = true;
            state.msg = action.payload;
        },

        // Update ProductImage
        updateProductImageStart: (state) => {
            state.productImage.isFetching = true;
        },
        updateProductImageSuccess: (state, action) => {
            state.productImage.isFetching = false;
            state.msg = action.payload;
        },
        updateProductImageFailed: (state, action) => {
            state.productImage.isFetching = false;
            state.productImage.error = true;
            state.msg = action.payload;
        },

        // Delete ProductImage
        deleteProductImageStart: (state) => {
            state.productImage.isFetching = true;
        },
        deleteProductImageSuccess: (state, action) => {
            state.productImage.isFetching = false;
            state.msg = action.payload;
        },
        deleteProductImageFailed: (state, action) => {
            state.productImage.isFetching = false;
            state.productImage.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllProductImageStart,
    getAllProductImageSuccess,
    getAllProductImageFailed,

    getAllProductImageByProductIdStart,
    getAllProductImageByProductIdSuccess,
    getAllProductImageByProductIdFailed,

    createProductImageStart,
    createProductImageSuccess,
    createProductImageFailed,

    updateProductImageStart,
    updateProductImageSuccess,
    updateProductImageFailed,

    deleteProductImageStart,
    deleteProductImageSuccess,
    deleteProductImageFailed,
} = productImageSlice.actions;

export default productImageSlice.reducer;
