import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    USER_UPDATED,
    USER_UPDATED_FAIL,
    } from './types';
import axios, { AxiosError } from 'axios';
import { LoginForm } from '../types/User';

export const login = (formData: LoginForm) => async (dispatch: any) => {
    try {
        // send request to API
        const res = await axios.post('/api/admin', formData);

        // check res for msgs
        const msgs = res.data.msgs;
        if (msgs) {
             
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    } catch (err: any) {
        const msgs = err.response.data.msgs;
        if(msgs) {

        }
        console.error(err);
    }
}