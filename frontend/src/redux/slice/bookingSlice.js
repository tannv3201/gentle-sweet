import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        booking: {
            bookingList: [],
            booking: null,
            bookingListSearch: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        getAllBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.booking.bookingList = action.payload;
        },
        getAllBookingFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },

        // Get all booking by status
        bookingSearchStart: (state) => {
            state.booking.isFetching = true;
        },
        bookingSearchSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.booking.bookingListSearch = action.payload;
        },
        bookingSearchFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },

        // Get all ADMIN USER
        getBookingByIdStart: (state) => {
            state.booking.isFetching = true;
        },
        getBookingByIdSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.booking.booking = action.payload;
        },
        getBookingByIdFailed: (state) => {
            state.booking.isFetching = false;
            state.booking.error = true;
        },

        // Create Booking Category
        createBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        createBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.msg = action.payload;
        },
        createBookingFailed: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = true;
            state.msg = action.payload;
        },

        // Update Booking
        updateBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        updateBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.msg = action.payload;
        },
        updateBookingFailed: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = true;
            state.msg = action.payload;
        },

        // confirm Booking
        confirmBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        confirmBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.msg = action.payload;
        },
        confirmBookingFailed: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = true;
            state.msg = action.payload;
        },

        // confirm Booking
        cancelBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        cancelBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.msg = action.payload;
        },
        cancelBookingFailed: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = true;
            state.msg = action.payload;
        },

        // Delete Booking
        deleteBookingStart: (state) => {
            state.booking.isFetching = true;
        },
        deleteBookingSuccess: (state, action) => {
            state.booking.isFetching = false;
            state.msg = action.payload;
        },
        deleteBookingFailed: (state, action) => {
            state.booking.isFetching = false;
            state.booking.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    clearBookingListSearch,

    getAllBookingStart,
    getAllBookingSuccess,
    getAllBookingFailed,

    getAllBookingByStatusStart,
    getAllBookingByStatusSuccess,
    getAllBookingByStatusFailed,

    bookingSearchStart,
    bookingSearchSuccess,
    bookingSearchFailed,

    getBookingByIdStart,
    getBookingByIdSuccess,
    getBookingByIdFailed,

    createBookingStart,
    createBookingSuccess,
    createBookingFailed,

    updateBookingStart,
    updateBookingSuccess,
    updateBookingFailed,

    confirmBookingStart,
    confirmBookingSuccess,
    confirmBookingFailed,

    cancelBookingStart,
    cancelBookingSuccess,
    cancelBookingFailed,

    deleteBookingStart,
    deleteBookingSuccess,
    deleteBookingFailed,
} = bookingSlice.actions;

export default bookingSlice.reducer;
