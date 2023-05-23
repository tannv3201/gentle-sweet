import { createSlice } from "@reduxjs/toolkit";

const provinceSlice = createSlice({
    name: "province",
    initialState: {
        province: {
            provinceList: [],
            districtList: [],
            wardList: [],
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getProvinceStart: (state) => {
            state.province.isFetching = true;
        },
        getProvinceSuccess: (state, action) => {
            state.province.isFetching = false;
            state.province.provinceList = action.payload;
        },
        getProvinceFailed: (state) => {
            state.province.isFetching = false;
            state.province.error = true;
        },

        // Get all ADMIN USER
        getDistrictStart: (state) => {
            state.province.isFetching = true;
        },
        getDistrictSuccess: (state, action) => {
            state.province.isFetching = false;
            state.province.districtList = action.payload;
        },
        getDistrictFailed: (state) => {
            state.province.isFetching = false;
            state.province.error = true;
        },

        // Get all ADMIN USER
        getWardStart: (state) => {
            state.province.isFetching = true;
        },
        getWardSuccess: (state, action) => {
            state.province.isFetching = false;
            state.province.wardList = action.payload;
        },
        getWardFailed: (state) => {
            state.province.isFetching = false;
            state.province.error = true;
        },
    },
});

export const {
    getProvinceStart,
    getProvinceSuccess,
    getProvinceFailed,

    getDistrictStart,
    getDistrictSuccess,
    getDistrictFailed,

    getWardStart,
    getWardSuccess,
    getWardFailed,
} = provinceSlice.actions;

export default provinceSlice.reducer;
