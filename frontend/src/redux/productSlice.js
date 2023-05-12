import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        product: {
            productList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllProductStart: (state) => {
            state.product.isFetching = true;
        },
        getAllProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.product.productList = action.payload;
        },
        getAllProductFailed: (state) => {
            state.product.isFetching = false;
            state.product.error = true;
        },
    },
});

export const { getAllProductStart, getAllProductSuccess, getAllProductFailed } =
    productSlice.actions;

export default productSlice.reducer;
