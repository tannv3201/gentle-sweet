import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
    name: "rating",
    initialState: {
        rating: {
            ratingProductList: [],
            ratingServiceList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
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

    getRatingByServiceIdStart,
    getRatingByServiceIdSuccess,
    getRatingByServiceIdFailed,

    createRatingStart,
    createRatingSuccess,
    createRatingFailed,
} = ratingSlice.actions;

export default ratingSlice.reducer;
