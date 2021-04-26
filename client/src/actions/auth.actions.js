import { authConstants } from "./constants";
import axios from "../helpers/axios";

export const login = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.LOGIN_REQUEST });
        const res = await axios.post(`/signin`, {
            ...user
        });


        if (res.status === 200) {
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            console.log(res.data);
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: res.data.message }
            });
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        dispatch({ type: authConstants.LOGIN_REQUEST });

        const token = localStorage.getItem('token');
        if (token) {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const res = await axios.get(`/auth/me`, config);
            console.log(res);

            if (res.status === 200) {
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user: null
                    }
                });
            }
            else {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: 'Failed to login' }
                });
            }
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const signout = () => {
    return async dispatch => {
        console.log(123);

        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.post(`/signout`);

        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }


    }
}