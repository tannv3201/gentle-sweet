import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name: "role",
    initialState: {
        role: {
            allRole: [],
            role: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        // Get all ADMIN USER
        getAllRoleStart: (state) => {
            state.role.isFetching = true;
        },
        getAllRoleSuccess: (state, action) => {
            state.role.isFetching = false;
            state.role.allRole = action.payload;
        },
        getAllRoleFailed: (state) => {
            state.role.isFetching = false;
            state.role.error = true;
        },

        // Get all ADMIN USER
        getAllRoleStart: (state) => {
            state.role.isFetching = true;
        },
        getAllRoleSuccess: (state, action) => {
            state.role.isFetching = false;
            state.role.allRole = action.payload;
        },
        getAllRoleFailed: (state) => {
            state.role.isFetching = false;
            state.role.error = true;
        },
    },
});

export const {} = roleSlice.actions;

export default roleSlice.reducer;
