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
import axios, { AxiosError } from 'axios';
import { LoginAction, LoginForm, RegisterAction, RegisterForm } from '../types/User';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import { setAlert } from './alert';

export const loadUser = () => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        // make req to API
        const res = await axios.post('/api/auth/admin');
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
        const res = await axios.post('/api/admin/login', formData);

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
        const res = await axios.post('/api/admin', formData);

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