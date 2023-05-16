import { createSlice } from "@reduxjs/toolkit";

const serviceImageSlice = createSlice({
    name: "serviceImage",
    initialState: {
        serviceImage: {
            serviceImageList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllServiceImageStart: (state) => {
            state.serviceImage.isFetching = true;
        },
        getAllServiceImageSuccess: (state, action) => {
            state.serviceImage.isFetching = false;
            state.serviceImage.serviceList = action.payload;
        },
        getAllServiceImageFailed: (state) => {
            state.serviceImage.isFetching = false;
            state.serviceImage.error = true;
        },

        // Get all ADMIN USER
        getAllServiceImageByServiceIdStart: (state) => {
            state.serviceImage.isFetching = true;
        },
        getAllServiceImageByServiceIdSuccess: (state, action) => {
            state.serviceImage.isFetching = false;
            state.serviceImage.serviceImageList = action.payload;
        },
        getAllServiceImageByServiceIdFailed: (state) => {
            state.serviceImage.isFetching = false;
            state.serviceImage.error = true;
        },
        // Create ServiceImage Category
        createServiceImageStart: (state) => {
            state.serviceImage.isFetching = true;
        },
        createServiceImageSuccess: (state, action) => {
            state.serviceImage.isFetching = false;
            state.msg = action.payload;
        },
        createServiceImageFailed: (state, action) => {
            state.serviceImage.isFetching = false;
            state.serviceImage.error = true;
            state.msg = action.payload;
        },

        // Update ServiceImage
        updateServiceImageStart: (state) => {
            state.serviceImage.isFetching = true;
        },
        updateServiceImageSuccess: (state, action) => {
            state.serviceImage.isFetching = false;
            state.msg = action.payload;
        },
        updateServiceImageFailed: (state, action) => {
            state.serviceImage.isFetching = false;
            state.serviceImage.error = true;
            state.msg = action.payload;
        },

        // Delete ServiceImage
        deleteServiceImageStart: (state) => {
            state.serviceImage.isFetching = true;
        },
        deleteServiceImageSuccess: (state, action) => {
            state.serviceImage.isFetching = false;
            state.msg = action.payload;
        },
        deleteServiceImageFailed: (state, action) => {
            state.serviceImage.isFetching = false;
            state.serviceImage.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllServiceImageStart,
    getAllServiceImageSuccess,
    getAllServiceImageFailed,

    getAllServiceImageByServiceIdStart,
    getAllServiceImageByServiceIdSuccess,
    getAllServiceImageByServiceIdFailed,

    createServiceImageStart,
    createServiceImageSuccess,
    createServiceImageFailed,

    updateServiceImageStart,
    updateServiceImageSuccess,
    updateServiceImageFailed,

    deleteServiceImageStart,
    deleteServiceImageSuccess,
    deleteServiceImageFailed,
} = serviceImageSlice.actions;

export default serviceImageSlice.reducer;
