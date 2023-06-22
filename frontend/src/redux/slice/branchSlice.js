import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
    name: "branch",
    initialState: {
        branch: {
            branchList: [],
            branch: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all Product Category
        getAllBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        getAllBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.branchList = action.payload;
        },

        getAllBranchFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },

        // Get all Product Category By Customer
        getBranchByIdStart: (state) => {
            state.branch.isFetching = true;
        },
        getBranchByIdSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.branch.branch = action.payload;
        },

        getBranchByIdFailed: (state) => {
            state.branch.isFetching = false;
            state.branch.error = true;
        },

        // Create Product Category
        createBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        createBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.msg = action.payload;
        },
        createBranchFailed: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = true;
            state.msg = action.payload;
        },

        // Update Product Category
        updateBranchStart: (state) => {
            state.branch.isFetching = true;
        },
        updateBranchSuccess: (state, action) => {
            state.branch.isFetching = false;
            state.msg = action.payload;
        },
        updateBranchFailed: (state, action) => {
            state.branch.isFetching = false;
            state.branch.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllBranchStart,
    getAllBranchSuccess,
    getAllBranchFailed,

    getBranchByIdStart,
    getBranchByIdSuccess,
    getBranchByIdFailed,

    createBranchStart,
    createBranchSuccess,
    createBranchFailed,

    updateBranchStart,
    updateBranchSuccess,
    updateBranchFailed,

    deleteBranchStart,
    deleteBranchSuccess,
    deleteBranchFailed,
} = branchSlice.actions;

export default branchSlice.reducer;
