import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "service",
    initialState: {
        service: {
            serviceList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllServiceStart: (state) => {
            state.service.isFetching = true;
        },
        getAllServiceSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.serviceList = action.payload;
        },
        getAllServiceFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },
        // Create Service Category
        createServiceStart: (state) => {
            state.service.isFetching = true;
        },
        createServiceSuccess: (state, action) => {
            state.service.isFetching = false;
            state.msg = action.payload;
        },
        createServiceFailed: (state, action) => {
            state.service.isFetching = false;
            state.service.error = true;
            state.msg = action.payload;
        },

        // Update Service
        updateServiceStart: (state) => {
            state.service.isFetching = true;
        },
        updateServiceSuccess: (state, action) => {
            state.service.isFetching = false;
            state.msg = action.payload;
        },
        updateServiceFailed: (state, action) => {
            state.service.isFetching = false;
            state.service.error = true;
            state.msg = action.payload;
        },

        // Delete Service
        deleteServiceStart: (state) => {
            state.service.isFetching = true;
        },
        deleteServiceSuccess: (state, action) => {
            state.service.isFetching = false;
            state.msg = action.payload;
        },
        deleteServiceFailed: (state, action) => {
            state.service.isFetching = false;
            state.service.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllServiceStart,
    getAllServiceSuccess,
    getAllServiceFailed,

    createServiceStart,
    createServiceSuccess,
    createServiceFailed,

    updateServiceStart,
    updateServiceSuccess,
    updateServiceFailed,

    deleteServiceStart,
    deleteServiceSuccess,
    deleteServiceFailed,
} = serviceSlice.actions;

export default serviceSlice.reducer;