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
    } from '../actions/types';
import { UserState } from '../types/User';
import setAuthToken from '../utils/setAuthToken';

const initialState: UserState = {
    name: '',
    email: '',
    id: '',
    isAuthenticated: false
};

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case USER_LOADED:
            localStorage.setItem('token', payload.token);
            setAuthToken(payload.token);
            state = {...state, name: payload.user.name, email: payload.user.email, id: payload.user.id, isAuthenticated: payload.isAuthenticated};
            return state;
        case USER_UPDATED:
            state = {...state, isAuthenticated: true};
            return state;
        case REGISTER_FAIL:
        case USER_UPDATED_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            setAuthToken(null);
            state = initialState;
            return state;
        default:
            return state
    }
}