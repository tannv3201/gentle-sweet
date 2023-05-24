import { createSlice } from "@reduxjs/toolkit";

const deliverySlice = createSlice({
    name: "delivery",
    initialState: {
        delivery: {
            deliveryList: [],
            delivery: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllDeliveryStart: (state) => {
            state.delivery.isFetching = true;
        },
        getAllDeliverySuccess: (state, action) => {
            state.delivery.isFetching = false;
            state.delivery.deliveryList = action.payload;
        },
        getAllDeliveryFailed: (state) => {
            state.delivery.isFetching = false;
            state.delivery.error = true;
        },

        // Get all ADMIN USER
        getDeliveryByIdStart: (state) => {
            state.delivery.isFetching = true;
        },
        getDeliveryByIdSuccess: (state, action) => {
            state.delivery.isFetching = false;
            state.delivery.delivery = action.payload;
        },
        getDeliveryByIdFailed: (state) => {
            state.delivery.isFetching = false;
            state.delivery.error = true;
        },

        // Get all ADMIN USER
        getDeliveryByUserIdStart: (state) => {
            state.delivery.isFetching = true;
        },
        getDeliveryByUserIdSuccess: (state, action) => {
            state.delivery.isFetching = false;
            state.delivery.deliveryList = action.payload;
        },
        getDeliveryByUserIdFailed: (state) => {
            state.delivery.isFetching = false;
            state.delivery.error = true;
        },

        // Create Delivery Category
        createDeliveryStart: (state) => {
            state.delivery.isFetching = true;
        },
        createDeliverySuccess: (state, action) => {
            state.delivery.isFetching = false;
            state.msg = action.payload;
        },
        createDeliveryFailed: (state, action) => {
            state.delivery.isFetching = false;
            state.delivery.error = true;
            state.msg = action.payload;
        },

        // Update Delivery
        updateDeliveryStart: (state) => {
            state.delivery.isFetching = true;
        },
        updateDeliverySuccess: (state, action) => {
            state.delivery.isFetching = false;
            state.msg = action.payload;
        },
        updateDeliveryFailed: (state, action) => {
            state.delivery.isFetching = false;
            state.delivery.error = true;
            state.msg = action.payload;
        },

        // Delete Delivery
        deleteDeliveryStart: (state) => {
            state.delivery.isFetching = true;
        },
        deleteDeliverySuccess: (state, action) => {
            state.delivery.isFetching = false;
            state.msg = action.payload;
        },
        deleteDeliveryFailed: (state, action) => {
            state.delivery.isFetching = false;
            state.delivery.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllDeliveryStart,
    getAllDeliverySuccess,
    getAllDeliveryFailed,

    getDeliveryByIdStart,
    getDeliveryByIdSuccess,
    getDeliveryByIdFailed,

    getDeliveryByUserIdStart,
    getDeliveryByUserIdSuccess,
    getDeliveryByUserIdFailed,

    createDeliveryStart,
    createDeliverySuccess,
    createDeliveryFailed,

    updateDeliveryStart,
    updateDeliverySuccess,
    updateDeliveryFailed,

    deleteDeliveryStart,
    deleteDeliverySuccess,
    deleteDeliveryFailed,
} = deliverySlice.actions;

export default deliverySlice.reducer;
