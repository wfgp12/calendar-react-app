import { useDispatch, useSelector } from "react-redux";
import { calendarApi } from "../api";
import { checkAuth, clearErrorMessage, onClearEvents, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const startCheckAuth = () => { };

    const startLogin = async ({ email, password }) => {
        dispatch(checkAuth());
        try {
            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin(data.user));

        } catch (e) {
            console.log(e);
            dispatch(onLogout('Credentials are incorrect'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(checkAuth());
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin(data.user));

        } catch (e) {
            console.log(e);
            dispatch(onLogout(e.response.data?.msg));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    }

    const startRenewToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout('Token expired'));

        try {
            const { data } = await calendarApi.get('/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin(data.user));
        } catch (e) {
            console.log(e);
            dispatch(onLogout('Token expired'));
        }
    }

    const startLogout = () => {
        localStorage.clear;
        dispatch(onLogout(""));
        dispatch(onClearEvents());
    }

    return {
        // variables
        status,
        user,
        errorMessage,
        // Methods
        startCheckAuth,
        startLogin,
        startRegister,
        startRenewToken,
        startLogout
    }
}