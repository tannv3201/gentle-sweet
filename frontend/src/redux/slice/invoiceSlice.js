import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: "invoice",
    initialState: {
        invoice: {
            invoiceList: [],
            invoice: null,
            invoiceListByStatus: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
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
        getAllInvoiceByStatusStart: (state) => {
            state.invoice.isFetching = true;
        },
        getAllInvoiceByStatusSuccess: (state, action) => {
            state.invoice.isFetching = false;
            state.invoice.invoiceListByStatus = action.payload;
        },
        getAllInvoiceByStatusFailed: (state) => {
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
    getAllInvoiceStart,
    getAllInvoiceSuccess,
    getAllInvoiceFailed,

    getAllInvoiceByStatusStart,
    getAllInvoiceByStatusSuccess,
    getAllInvoiceByStatusFailed,

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
