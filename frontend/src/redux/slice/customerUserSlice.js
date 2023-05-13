import { createSlice } from "@reduxjs/toolkit";

const customerUserSlice = createSlice({
    name: "customerUser",
    initialState: {
        customerUser: {
            customerUserList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllCustomerStart: (state) => {
            state.customerUser.isFetching = true;
        },
        getAllCustomerSuccess: (state, action) => {
            state.customerUser.isFetching = false;
            state.customerUser.customerUserList = action.payload;
        },

        getAllCustomerFailed: (state) => {
            state.customerUser.isFetching = false;
            state.customerUser.error = true;
        },

        // Create ADMIN USER
        createCustomerStart: (state) => {
            state.customerUser.isFetching = true;
        },
        createCustomerSuccess: (state, action) => {
            state.customerUser.isFetching = false;
            state.msg = action.payload;
        },
        createCustomerFailed: (state, action) => {
            state.customerUser.isFetching = false;
            state.customerUser.error = true;
            state.msg = action.payload;
        },

        // Delete ADMIN USER
        deleteCustomerStart: (state) => {
            state.customerUser.isFetching = true;
        },
        deleteCustomerSuccess: (state, action) => {
            state.customerUser.isFetching = false;
            state.msg = action.payload;
        },
        deleteCustomerFailed: (state, action) => {
            state.customerUser.isFetching = false;
            state.customerUser.error = true;
            state.msg = action.payload;
        },

        // Update ADMIN USER
        updateCustomerStart: (state) => {
            state.customerUser.isFetching = true;
        },
        updateCustomerSuccess: (state, action) => {
            state.customerUser.isFetching = false;
            state.msg = action.payload;
        },
        updateCustomerFailed: (state, action) => {
            state.customerUser.isFetching = false;
            state.customerUser.error = true;
            state.msg = action.payload;
        },

        // Change Password by ADMIN USER
        passwordChangeStart: (state) => {
            state.customerUser.isFetching = true;
        },
        passwordChangeSuccess: (state, action) => {
            state.customerUser.isFetching = false;
            state.msg = action.payload;
        },
        passwordChangeFailed: (state, action) => {
            state.customerUser.isFetching = false;
            state.customerUser.error = true;
            state.msg = action.payload;
        },

        // Change Password by ADMIN USER
        // Delete ADMIN USER
        resetPasswordStart: (state) => {
            state.customerUser.isFetching = true;
        },
        resetPasswordSuccess: (state, action) => {
            state.customerUser.isFetching = false;
            state.msg = action.payload;
        },
        resetPasswordFailed: (state, action) => {
            state.customerUser.isFetching = false;
            state.customerUser.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllCustomerStart,
    getAllCustomerSuccess,
    getAllCustomerFailed,
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
} = customerUserSlice.actions;

export default customerUserSlice.reducer;
