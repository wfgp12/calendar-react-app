import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessage: '',
     },
    reducers: {
        checkAuth: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = '';
        },
        onLogin: (state, {payload}) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = '';
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        },
    },
});

export const { checkAuth, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
