import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: "service",
    initialState: {
        service: {
            serviceList: [],
            serviceListSearch: [],
            serviceListLimit: [],
            service: null,
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

        // Search
        serviceSearchStart: (state) => {
            state.service.isFetching = true;
        },
        serviceSearchSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.serviceListSearch = action.payload;
        },
        serviceSearchFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },

        // Search
        serviceLimitStart: (state) => {
            state.service.isFetching = true;
        },
        serviceLimitSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.serviceListLimit = action.payload;
        },
        serviceLimitFailed: (state) => {
            state.service.isFetching = false;
            state.service.error = true;
        },

        // Get all ADMIN USER
        getServiceByIdStart: (state) => {
            state.service.isFetching = true;
        },
        getServiceByIdSuccess: (state, action) => {
            state.service.isFetching = false;
            state.service.service = action.payload;
        },
        getServiceByIdFailed: (state) => {
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

    serviceSearchStart,
    serviceSearchSuccess,
    serviceSearchFailed,

    serviceLimitStart,
    serviceLimitSuccess,
    serviceLimitFailed,

    getServiceByIdStart,
    getServiceByIdSuccess,
    getServiceByIdFailed,

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
