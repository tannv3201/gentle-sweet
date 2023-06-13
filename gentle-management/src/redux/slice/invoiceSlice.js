import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        invoice: {
            invoiceList: [],
            invoice: null,
            invoiceListByUser: [],
            invoiceListSearch: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        clearInvoiceListSearch: (state) => {
            state.invoice.invoiceListSearch = [];
        },
        // Get all ADMIN USER
        getAllInvoiceStart: (state) => {
            state.invoice.isFetching = true;
        },
        getAllInvoiceSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.invoiceList = action.payload;
        },
        getAllInvoiceFailed: (state) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
        },

        // Get all invoice by status
        getAllInvoiceByUserStart: (state) => {
            state.invoice.isFetching = true;
        },
        getAllInvoiceByUserSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.invoiceListByUser = action.payload;
        },
        getAllInvoiceByUserFailed: (state) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
        },

        // Get all invoice by status
        invoiceSearchStart: (state) => {
            state.invoice.isFetching = true;
        },
        invoiceSearchSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.invoiceListSearch = action.payload;
        },
        invoiceSearchFailed: (state) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
        },

        // Get all ADMIN USER
        getInvoiceByIdStart: (state) => {
            state.invoice.isFetching = true;
        },
        getInvoiceByIdSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.invoice = action.payload;
        },
        getInvoiceByIdFailed: (state) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
        },

        // Create Invoice Category
        createInvoiceStart: (state) => {
            state.invoice.isFetching = true;
        },
        createInvoiceSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.msg = action.payload;
        },
        createInvoiceFailed: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
            state.msg = action.payload;
        },

        // Update Invoice
        updateInvoiceStart: (state) => {
            state.invoice.isFetching = true;
        },
        updateInvoiceSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.msg = action.payload;
        },
        updateInvoiceFailed: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
            state.msg = action.payload;
        },

        // confirm Invoice
        confirmInvoiceStart: (state) => {
            state.invoice.isFetching = true;
        },
        confirmInvoiceSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.msg = action.payload;
        },
        confirmInvoiceFailed: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
            state.msg = action.payload;
        },

        // confirm Invoice
        cancelInvoiceStart: (state) => {
            state.invoice.isFetching = true;
        },
        cancelInvoiceSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.msg = action.payload;
        },
        cancelInvoiceFailed: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
            state.msg = action.payload;
        },

        // Delete Invoice
        deleteInvoiceStart: (state) => {
            state.invoice.isFetching = true;
        },
        deleteInvoiceSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.msg = action.payload;
        },
        deleteInvoiceFailed: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    clearInvoiceListSearch,

    getAllInvoiceStart,
    getAllInvoiceSuccess,
    getAllInvoiceFailed,

    getAllInvoiceByUserStart,
    getAllInvoiceByUserSuccess,
    getAllInvoiceByUserFailed,

    invoiceSearchStart,
    invoiceSearchSuccess,
    invoiceSearchFailed,

    getInvoiceByIdStart,
    getInvoiceByIdSuccess,
    getInvoiceByIdFailed,

    createInvoiceStart,
    createInvoiceSuccess,
    createInvoiceFailed,

    updateInvoiceStart,
    updateInvoiceSuccess,
    updateInvoiceFailed,

    confirmInvoiceStart,
    confirmInvoiceSuccess,
    confirmInvoiceFailed,

    cancelInvoiceStart,
    cancelInvoiceSuccess,
    cancelInvoiceFailed,

    deleteInvoiceStart,
    deleteInvoiceSuccess,
    deleteInvoiceFailed,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
