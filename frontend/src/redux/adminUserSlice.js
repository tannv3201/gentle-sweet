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

        // Create ADMIN USER
        getAdminUserFailed: (state) => {
            state.adminUser.isFetching = false;
            state.adminUser.error = true;
        },
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
    },
});

export const {
    getAdminUserStart,
    getAdminUserSuccess,
    getAdminUserFailed,
    createAdminUserStart,
    createAdminUserSuccess,
    createAdminUserFailed,
} = adminUserSlice.actions;

export default adminUserSlice.reducer;
