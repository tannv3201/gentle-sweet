import { createSlice } from "@reduxjs/toolkit";

const bookingDetailSlice = createSlice({
    name: "bookingDetail",
    initialState: {
        bookingDetail: {
            bookingDetailList: [],
            bookingDetail: null,
            bookingDetailByBooking: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllBookingDetailStart: (state) => {
            state.bookingDetail.isFetching = true;
        },
        getAllBookingDetailSuccess: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.bookingDetailList = action.payload;
        },
        getAllBookingDetailFailed: (state) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.error = true;
        },

        // Get all ADMIN USER
        getBookingDetailByIdStart: (state) => {
            state.bookingDetail.isFetching = true;
        },
        getBookingDetailByIdSuccess: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.bookingDetail = action.payload;
        },
        getBookingDetailByIdFailed: (state) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.error = true;
        },

        // Get all ADMIN USER
        getBookingDetailByBookingIdStart: (state) => {
            state.bookingDetail.isFetching = true;
        },
        getBookingDetailByBookingIdSuccess: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.bookingDetailByBooking = action.payload;
        },
        getBookingDetailByBookingIdFailed: (state) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.error = true;
        },

        // Create BookingDetail Category
        createBookingDetailStart: (state) => {
            state.bookingDetail.isFetching = true;
        },
        createBookingDetailSuccess: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.msg = action.payload;
        },
        createBookingDetailFailed: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.error = true;
            state.msg = action.payload;
        },

        // Update BookingDetail
        updateBookingDetailStart: (state) => {
            state.bookingDetail.isFetching = true;
        },
        updateBookingDetailSuccess: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.msg = action.payload;
        },
        updateBookingDetailFailed: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.error = true;
            state.msg = action.payload;
        },

        // Delete BookingDetail
        deleteBookingDetailStart: (state) => {
            state.bookingDetail.isFetching = true;
        },
        deleteBookingDetailSuccess: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.msg = action.payload;
        },
        deleteBookingDetailFailed: (state, action) => {
            state.bookingDetail.isFetching = false;
            state.bookingDetail.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllBookingDetailStart,
    getAllBookingDetailSuccess,
    getAllBookingDetailFailed,

    getBookingDetailByIdStart,
    getBookingDetailByIdSuccess,
    getBookingDetailByIdFailed,

    getBookingDetailByBookingIdStart,
    getBookingDetailByBookingIdSuccess,
    getBookingDetailByBookingIdFailed,

    createBookingDetailStart,
    createBookingDetailSuccess,
    createBookingDetailFailed,

    updateBookingDetailStart,
    updateBookingDetailSuccess,
    updateBookingDetailFailed,

    deleteBookingDetailStart,
    deleteBookingDetailSuccess,
    deleteBookingDetailFailed,
} = bookingDetailSlice.actions;

export default bookingDetailSlice.reducer;
