import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    LOAD_USER,
    LOAD_USER_FAIL,
    USER_UPDATED,
    USER_UPDATED_FAIL,
    } from '../actions/types';
import { UserState } from '../types/User';
import setAuthToken from '../utils/setAuthToken';

const initialState: UserState = {
    name: '',
    email: '',
    _id: '',
    avatar: '',
    date: 0,
    isAuthenticated: null
};

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case LOAD_USER:
            setAuthToken(payload.data.token);
            state = {...state, name: payload.data.name, email: payload.data.email, _id: payload.data._id, avatar: payload.data.avatar, isAuthenticated: payload.isAuthenticated};
            return state;
        case USER_UPDATED:
            state = {...state, isAuthenticated: true};
            return state;
        case REGISTER_FAIL:
        case USER_UPDATED_FAIL:
        case LOAD_USER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            setAuthToken(null);
            state = {...initialState, isAuthenticated: false};
            return state;
        default:
            return state
    }
}