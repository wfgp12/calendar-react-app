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
    },
});

export const { checkAuth, onLogin } = authSlice.actions;
