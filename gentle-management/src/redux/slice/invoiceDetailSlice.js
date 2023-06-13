import { createSlice } from "@reduxjs/toolkit";

const invoiceDetailSlice = createSlice({
    name: "invoiceDetail",
    initialState: {
        invoiceDetail: {
            invoiceDetailList: [],
            invoiceDetail: null,
            invoiceDetailByInvoice: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllInvoiceDetailStart: (state) => {
            state.invoiceDetail.isFetching = true;
        },
        getAllInvoiceDetailSuccess: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.invoiceDetailList = action.payload;
        },
        getAllInvoiceDetailFailed: (state) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.error = true;
        },

        // Get all ADMIN USER
        getInvoiceDetailByIdStart: (state) => {
            state.invoiceDetail.isFetching = true;
        },
        getInvoiceDetailByIdSuccess: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.invoiceDetail = action.payload;
        },
        getInvoiceDetailByIdFailed: (state) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.error = true;
        },

        // Get all ADMIN USER
        getInvoiceDetailByInvoiceIdStart: (state) => {
            state.invoiceDetail.isFetching = true;
        },
        getInvoiceDetailByInvoiceIdSuccess: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.invoiceDetailByInvoice = action.payload;
        },
        getInvoiceDetailByInvoiceIdFailed: (state) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.error = true;
        },

        // Create InvoiceDetail Category
        createInvoiceDetailStart: (state) => {
            state.invoiceDetail.isFetching = true;
        },
        createInvoiceDetailSuccess: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.msg = action.payload;
        },
        createInvoiceDetailFailed: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.error = true;
            state.msg = action.payload;
        },

        // Update InvoiceDetail
        updateInvoiceDetailStart: (state) => {
            state.invoiceDetail.isFetching = true;
        },
        updateInvoiceDetailSuccess: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.msg = action.payload;
        },
        updateInvoiceDetailFailed: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.error = true;
            state.msg = action.payload;
        },

        // Delete InvoiceDetail
        deleteInvoiceDetailStart: (state) => {
            state.invoiceDetail.isFetching = true;
        },
        deleteInvoiceDetailSuccess: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.msg = action.payload;
        },
        deleteInvoiceDetailFailed: (state, action) => {
            state.invoiceDetail.isFetching = false;
            state.invoiceDetail.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getAllInvoiceDetailStart,
    getAllInvoiceDetailSuccess,
    getAllInvoiceDetailFailed,

    getInvoiceDetailByIdStart,
    getInvoiceDetailByIdSuccess,
    getInvoiceDetailByIdFailed,

    getInvoiceDetailByInvoiceIdStart,
    getInvoiceDetailByInvoiceIdSuccess,
    getInvoiceDetailByInvoiceIdFailed,

    createInvoiceDetailStart,
    createInvoiceDetailSuccess,
    createInvoiceDetailFailed,

    updateInvoiceDetailStart,
    updateInvoiceDetailSuccess,
    updateInvoiceDetailFailed,

    deleteInvoiceDetailStart,
    deleteInvoiceDetailSuccess,
    deleteInvoiceDetailFailed,
} = invoiceDetailSlice.actions;

export default invoiceDetailSlice.reducer;
