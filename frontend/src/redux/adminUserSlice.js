import { createSlice } from "@reduxjs/toolkit";

const adminUserSlice = createSlice({
    name: "adminUser",
    initialState: {
        adminUser: {
            allAdminUser: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAdminUserStart: (state) => {
            state.adminUser.isFetching = true;
        },
        getAdminUserSuccess: (state, action) => {
            state.adminUser.isFetching = false;
            state.adminUser.allAdminUser = action.payload;
        },

        getAdminUserFailed: (state) => {
            state.adminUser.isFetching = false;
            state.adminUser.error = true;
        },

        // Create ADMIN USER
        createAdminUserStart: (state) => {
            state.adminUser.isFetching = true;
        },
        createAdminUserSuccess: (state, action) => {
            state.adminUser.isFetching = false;
            state.msg = action.payload;
        },
        createAdminUserFailed: (state, action) => {
            state.adminUser.isFetching = false;
            state.adminUser.error = true;
            state.msg = action.payload;
        },

        // Delete ADMIN USER
        deleteAdminUserStart: (state) => {
            state.adminUser.isFetching = true;
        },
        deleteAdminUserSuccess: (state, action) => {
            state.adminUser.isFetching = false;
            state.msg = action.payload;
        },
        deleteAdminUserFailed: (state, action) => {
            state.adminUser.isFetching = false;
            state.adminUser.error = true;
            state.msg = action.payload;
        },

        // Delete ADMIN USER
        updateAdminUserStart: (state) => {
            state.adminUser.isFetching = true;
        },
        updateAdminUserSuccess: (state, action) => {
            state.adminUser.isFetching = false;
            state.msg = action.payload;
        },
        updateAdminUserFailed: (state, action) => {
            state.adminUser.isFetching = false;
            state.adminUser.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAdminUserStart,
    getAdminUserSuccess,
    getAdminUserFailed,
    createAdminUserStart,
    createAdminUserSuccess,
    createAdminUserFailed,
    deleteAdminUserStart,
    deleteAdminUserSuccess,
    deleteAdminUserFailed,
    updateAdminUserStart,
    updateAdminUserSuccess,
    updateAdminUserFailed,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
