import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customer: {
            customerList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getCustomerStart: (state) => {
            state.customer.isFetching = true;
        },
        getCustomerSuccess: (state, action) => {
            state.customer.isFetching = false;
            state.customer.customerList = action.payload;
        },

        getCustomerFailed: (state) => {
            state.customer.isFetching = false;
            state.customer.error = true;
        },

        // Create ADMIN USER
        createCustomerStart: (state) => {
            state.customer.isFetching = true;
        },
        createCustomerSuccess: (state, action) => {
            state.customer.isFetching = false;
            state.msg = action.payload;
        },
        createCustomerFailed: (state, action) => {
            state.customer.isFetching = false;
            state.customer.error = true;
            state.msg = action.payload;
        },

        // Delete ADMIN USER
        deleteCustomerStart: (state) => {
            state.customer.isFetching = true;
        },
        deleteCustomerSuccess: (state, action) => {
            state.customer.isFetching = false;
            state.msg = action.payload;
        },
        deleteCustomerFailed: (state, action) => {
            state.customer.isFetching = false;
            state.customer.error = true;
            state.msg = action.payload;
        },

        // Update ADMIN USER
        updateCustomerStart: (state) => {
            state.customer.isFetching = true;
        },
        updateCustomerSuccess: (state, action) => {
            state.customer.isFetching = false;
            state.msg = action.payload;
        },
        updateCustomerFailed: (state, action) => {
            state.customer.isFetching = false;
            state.customer.error = true;
            state.msg = action.payload;
        },

        // Change Password by ADMIN USER
        passwordChangeStart: (state) => {
            state.customer.isFetching = true;
        },
        passwordChangeSuccess: (state, action) => {
            state.customer.isFetching = false;
            state.msg = action.payload;
        },
        passwordChangeFailed: (state, action) => {
            state.customer.isFetching = false;
            state.customer.error = true;
            state.msg = action.payload;
        },

        // Change Password by ADMIN USER
        // Delete ADMIN USER
        resetPasswordStart: (state) => {
            state.customer.isFetching = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.customer.isFetching = false;
            state.msg = action.payload;
        },
        resetPasswordFailed: (state, action) => {
            state.customer.isFetching = false;
            state.customer.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getCustomerStart,
    getCustomerSuccess,
    getCustomerFailed,
    createCustomerStart,
    createCustomerSuccess,
    createCustomerFailed,
    deleteCustomerStart,
    deleteCustomerSuccess,
    deleteCustomerFailed,
    updateCustomerStart,
    updateCustomerSuccess,
    updateCustomerFailed,
    passwordChangeStart,
    passwordChangeSuccess,
    passwordChangeFailed,
    resetPasswordStart,
    resetPasswordSuccess,
    resetPasswordFailed,
} = customerSlice.actions;

export default customerSlice.reducer;
