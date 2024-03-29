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

export const initOrder = (user: UserState, delivery: Delivery, instructions: string, callback: () => void) => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        // make req to api
        const res = await axios.post(`/api/order/${user.cart.restaurant}`, {
            user: user,
            instructions,
            delivery
        });

        // check res for msgs
        const msgs = res.data.msgs;
        if (msgs) dispatch(setAlert(msgs));

        // navigate to checkout page
        window.location.replace(res.data.data);

        // invoke callback
        callback();
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(setAlert(msgs));
        console.error(err);
    }
};

export const finishOrder = (token: string, cancel: boolean) => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        // make req to API
        console.log(`/api/order/${token}/${JSON.stringify(cancel)}`)
        const res = await axios.put(`/api/order/${token}/${JSON.stringify(cancel)}`);

        // check res for msgs
        const msgs = res.data.msgs;
        if (msgs) dispatch(setAlert(msgs));
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(setAlert(msgs));
        console.error(err);
    }
};