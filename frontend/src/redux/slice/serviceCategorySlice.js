import { createSlice } from "@reduxjs/toolkit";

const serviceCategorySlice = createSlice({
    name: "serviceCategory",
    initialState: {
        serviceCategory: {
            serviceCategoryList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all Product Category
        getAllServiceCategoryStart: (state) => {
            state.serviceCategory.isFetching = true;
        },
        getAllServiceCategorySuccess: (state, action) => {
            state.serviceCategory.isFetching = false;
            state.serviceCategory.serviceCategoryList = action.payload;
        },

        getAllServiceCategoryFailed: (state) => {
            state.serviceCategory.isFetching = false;
            state.serviceCategory.error = true;
        },

        // Create Product Category
        createServiceCategoryStart: (state) => {
            state.serviceCategory.isFetching = true;
        },
        createServiceCategorySuccess: (state, action) => {
            state.serviceCategory.isFetching = false;
            state.msg = action.payload;
        },
        createServiceCategoryFailed: (state, action) => {
            state.serviceCategory.isFetching = false;
            state.serviceCategory.error = true;
            state.msg = action.payload;
        },

        // Update Product Category
        updateServiceCategoryStart: (state) => {
            state.serviceCategory.isFetching = true;
        },
        updateServiceCategorySuccess: (state, action) => {
            state.serviceCategory.isFetching = false;
            state.msg = action.payload;
        },
        updateServiceCategoryFailed: (state, action) => {
            state.serviceCategory.isFetching = false;
            state.serviceCategory.error = true;
            state.msg = action.payload;
        },

        // Delete Product Category
        deleteServiceCategoryStart: (state) => {
            state.serviceCategory.isFetching = true;
        },
        deleteServiceCategorySuccess: (state, action) => {
            state.serviceCategory.isFetching = false;
            state.msg = action.payload;
        },
        deleteServiceCategoryFailed: (state, action) => {
            state.serviceCategory.isFetching = false;
            state.serviceCategory.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllServiceCategoryStart,
    getAllServiceCategorySuccess,
    getAllServiceCategoryFailed,

    createServiceCategoryStart,
    createServiceCategorySuccess,
    createServiceCategoryFailed,

    updateServiceCategoryStart,
    updateServiceCategorySuccess,
    updateServiceCategoryFailed,

    deleteServiceCategoryStart,
    deleteServiceCategorySuccess,
    deleteServiceCategoryFailed,
} = serviceCategorySlice.actions;

export default serviceCategorySlice.reducer;
