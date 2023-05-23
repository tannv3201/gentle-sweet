import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
    name: "discount",
    initialState: {
        discount: {
            discountList: [],
            discountListCustomer: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllDiscountStart: (state) => {
            state.discount.isFetching = true;
        },
        getAllDiscountSuccess: (state, action) => {
            state.discount.isFetching = false;
            state.discount.discountList = action.payload;
        },
        getAllDiscountFailed: (state) => {
            state.discount.isFetching = false;
            state.discount.error = true;
        },

        // Get all ADMIN USER
        getAllDiscountCustomerStart: (state) => {
            state.discount.isFetching = true;
        },
        getAllDiscountCustomerSuccess: (state, action) => {
            state.discount.isFetching = false;
            state.discount.discountListCustomer = action.payload;
        },
        getAllDiscountCustomerFailed: (state) => {
            state.discount.isFetching = false;
            state.discount.error = true;
        },
        // Create Discount Category
        createDiscountStart: (state) => {
            state.discount.isFetching = true;
        },
        createDiscountSuccess: (state, action) => {
            state.discount.isFetching = false;
            state.msg = action.payload;
        },
        createDiscountFailed: (state, action) => {
            state.discount.isFetching = false;
            state.discount.error = true;
            state.msg = action.payload;
        },

        // Update Discount
        updateDiscountStart: (state) => {
            state.discount.isFetching = true;
        },
        updateDiscountSuccess: (state, action) => {
            state.discount.isFetching = false;
            state.msg = action.payload;
        },
        updateDiscountFailed: (state, action) => {
            state.discount.isFetching = false;
            state.discount.error = true;
            state.msg = action.payload;
        },

        // Delete Discount
        deleteDiscountStart: (state) => {
            state.discount.isFetching = true;
        },
        deleteDiscountSuccess: (state, action) => {
            state.discount.isFetching = false;
            state.msg = action.payload;
        },
        deleteDiscountFailed: (state, action) => {
            state.discount.isFetching = false;
            state.discount.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllDiscountStart,
    getAllDiscountSuccess,
    getAllDiscountFailed,

    getAllDiscountCustomerStart,
    getAllDiscountCustomerSuccess,
    getAllDiscountCustomerFailed,

    createDiscountStart,
    createDiscountSuccess,
    createDiscountFailed,

    updateDiscountStart,
    updateDiscountSuccess,
    updateDiscountFailed,

    deleteDiscountStart,
    deleteDiscountSuccess,
    deleteDiscountFailed,
} = discountSlice.actions;

export default discountSlice.reducer;
