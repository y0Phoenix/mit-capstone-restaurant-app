import {
    GET_ORDER,
    GET_ORDER_FAIL,
    FILTER_ORDERS,
    FILTER_ORDERS_FAIL
} from './types';
import axios from 'axios';
import { UserState } from '../types/User';
import { Delivery } from '../types/Order';
import { NavigateFunction } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import { setAlert } from './alert';

export const initOrder = (user: UserState, delivery: Delivery, navigate: NavigateFunction, callback: () => void) => (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        // make req to api
        const res = await axios.post(`/api/order/${user.cart.restaurant}`, {
            user: user,
            
        })
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(setAlert(msgs));
        console.error(err);
}