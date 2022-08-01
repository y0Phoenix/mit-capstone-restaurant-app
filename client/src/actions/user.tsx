import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    LOAD_USER,
    LOAD_USER_FAIL,
    USER_UPDATED,
    USER_UPDATED_FAIL,
    } from './types';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { LoginAction, LoginForm, RegisterAction, RegisterForm, UserState } from '../types/User';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import { setAlert } from './alert';

export const loadUser = () => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        // make req to API
        const res = await axios.get('/api/auth');
        dispatch({
            type: LOAD_USER,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: null
        });
    }
};

export const login = (formData: LoginForm, setAlert: Function) => async (dispatch: ThunkDispatch<State, undefined, LoginAction>) => {
    try {
        // send request to API
        const res = await axios.post('/api/auth', formData);

        // check res for msgs
        const msgs = res.data?.msgs;
        if (msgs) setAlert(msgs);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: LOGIN_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const register = (formData: RegisterForm, setAlert: Function) => async (dispatch: ThunkDispatch<State, undefined, RegisterAction>) => {
    try {
        // send request to API
        const res = await axios.post('/api/user', formData);

        // check for msgs
        const msgs = res.data?.msgs;
        if (msgs) setAlert(msgs);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: REGISTER_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const logout = () => (dispatch: ThunkDispatch<State, undefined, any>) => {
    dispatch({
        type: LOGOUT
    });
};

export const updateUser = (user: UserState) => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        // check if user is guest
        const bool = user.isAuthenticated;
        // if user isnt guest update cart in db
        let res = undefined;
        if (bool) {
            res = await axios.post('/api/user/update', {
                user,
                cart: user.cart
            });
            // check res for msgs
            const msgs = res.data?.msgs;
            if (msgs) dispatch(setAlert(msgs));
        }
        dispatch({
            type: USER_UPDATED,
            payload: res ? res.data.data : user 
        });

    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        console.error(err);
    }
}