import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
        signup: {
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        // Logout
        logoutStart: (state) => {
            state.login.isFetching = true;
            state.login.error = false;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailded: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        signupStart: (state) => {
            state.signup.isFetching = true;
            state.signup.error = false;
        },
        signupSuccess: (state) => {
            state.signup.isFetching = false;
            state.signup.error = false;
        },
        signupFailded: (state) => {
            state.signup.isFetching = false;
            state.signup.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,

    logoutStart,
    logoutSuccess,
    logoutFailded,

    signupStart,
    signupSuccess,
    signupFailded,
} = authSlice.actions;

export default authSlice.reducer;
