import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
    name: "rating",
    initialState: {
        rating: {
            ratingProductList: [],
            ratingServiceList: [],
            ratingInvoiceList: [],
            ratingBookingList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all Rating
        getRatingByProductIdStart: (state) => {
            state.rating.isFetching = true;
        },
        getRatingByProductIdSuccess: (state, action) => {
            state.rating.isFetching = false;
            state.rating.ratingProductList = action.payload;
        },
        getRatingByProductIdFailed: (state) => {
            state.rating.isFetching = false;
            state.rating.error = true;
        },

        // Get all Rating by invoice_id
        getRatingByInvoiceIdStart: (state) => {
            state.rating.isFetching = true;
        },
        getRatingByInvoiceIdSuccess: (state, action) => {
            state.rating.isFetching = false;
            state.rating.ratingInvoiceList = action.payload;
        },
        getRatingByInvoiceIdFailed: (state) => {
            state.rating.isFetching = false;
            state.rating.error = true;
        },

        // get all rating by service_id

        getRatingByServiceIdStart: (state) => {
            state.rating.isFetching = true;
        },
        getRatingByServiceIdSuccess: (state, action) => {
            state.rating.isFetching = false;
            state.rating.ratingServiceList = action.payload;
        },
        getRatingByServiceIdFailed: (state) => {
            state.rating.isFetching = false;
            state.rating.error = true;
        },

        // get all rating by booking_id
        getRatingByBookingIdStart: (state) => {
            state.rating.isFetching = true;
        },
        getRatingByBookingIdSuccess: (state, action) => {
            state.rating.isFetching = false;
            state.rating.ratingBookingList = action.payload;
        },
        getRatingByBookingIdFailed: (state) => {
            state.rating.isFetching = false;
            state.rating.error = true;
        },

        // Create Rating Category
        createRatingStart: (state) => {
            state.rating.isFetching = true;
        },
        createRatingSuccess: (state, action) => {
            state.rating.isFetching = false;
            state.msg = action.payload;
        },
        createRatingFailed: (state, action) => {
            state.rating.isFetching = false;
            state.rating.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getRatingByProductIdStart,
    getRatingByProductIdSuccess,
    getRatingByProductIdFailed,

    getRatingByInvoiceIdStart,
    getRatingByInvoiceIdSuccess,
    getRatingByInvoiceIdFailed,

    getRatingByServiceIdStart,
    getRatingByServiceIdSuccess,
    getRatingByServiceIdFailed,

    getRatingByBookingIdStart,
    getRatingByBookingIdSuccess,
    getRatingByBookingIdFailed,

    createRatingStart,
    createRatingSuccess,
    createRatingFailed,
} = ratingSlice.actions;

export default ratingSlice.reducer;
