import { createSlice } from "@reduxjs/toolkit";

const productCategorySlice = createSlice({
    name: "productCategory",
    initialState: {
        productCategory: {
            productCategoryList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all Product Category
        getAllProductCategoryStart: (state) => {
            state.productCategory.isFetching = true;
        },
        getAllProductCategorySuccess: (state, action) => {
            state.productCategory.isFetching = false;
            state.productCategory.productCategoryList = action.payload;
        },

        getAllProductCategoryFailed: (state) => {
            state.productCategory.isFetching = false;
            state.productCategory.error = true;
        },

        // Create Product Category
        createProductCategoryStart: (state) => {
            state.productCategory.isFetching = true;
        },
        createProductCategorySuccess: (state, action) => {
            state.productCategory.isFetching = false;
            state.msg = action.payload;
        },
        createProductCategoryFailed: (state, action) => {
            state.productCategory.isFetching = false;
            state.productCategory.error = true;
            state.msg = action.payload;
        },

        // Update Product Category
        updateProductCategoryStart: (state) => {
            state.productCategory.isFetching = true;
        },
        updateProductCategorySuccess: (state, action) => {
            state.productCategory.isFetching = false;
            state.msg = action.payload;
        },
        updateProductCategoryFailed: (state, action) => {
            state.productCategory.isFetching = false;
            state.productCategory.error = true;
            state.msg = action.payload;
        },

        // Delete Product Category
        deleteProductCategoryStart: (state) => {
            state.productCategory.isFetching = true;
        },
        deleteProductCategorySuccess: (state, action) => {
            state.productCategory.isFetching = false;
            state.msg = action.payload;
        },
        deleteProductCategoryFailed: (state, action) => {
            state.productCategory.isFetching = false;
            state.productCategory.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllProductCategoryStart,
    getAllProductCategorySuccess,
    getAllProductCategoryFailed,

    createProductCategoryStart,
    createProductCategorySuccess,
    createProductCategoryFailed,

    updateProductCategoryStart,
    updateProductCategorySuccess,
    updateProductCategoryFailed,

    deleteProductCategoryStart,
    deleteProductCategorySuccess,
    deleteProductCategoryFailed,
} = productCategorySlice.actions;

export default productCategorySlice.reducer;
