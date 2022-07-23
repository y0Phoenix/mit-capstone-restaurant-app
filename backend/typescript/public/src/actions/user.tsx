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
import axios from 'axios';
import { LoginForm } from '../types/User';

export const login = (formData: LoginForm) => async (dispatch: any) => {
    try {
        const res = await axios.post('/api/admin', formData, )
    } catch (err) {
        console.error(err);
    }
}