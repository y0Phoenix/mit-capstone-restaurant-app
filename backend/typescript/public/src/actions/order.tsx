import {
    GET_ORDER,
    GET_ORDER_FAIL,
    DELETE_ORDER_FAIL,
    DELETE_ORDER,
    ORDER_UPDATE,
    ORDER_UPDATE_FAIL,
} from './types';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import { Order, OrderAction } from '../types/Order';
import { setAlert } from './alert';

export const getOrders = (SA: typeof setAlert) => async (dispatch: ThunkDispatch<State, undefined, OrderAction>) => {
    try {
        const token: any = localStorage.getItem('token');
        // make req to API
        const res = await axios.get('/api/order', {
            headers: {
                "x-auth-token": token
            }
        });

        // check res for msgs
        const msgs = res.data?.msgs;
        if (msgs) dispatch(SA(msgs));
        dispatch({
            type: GET_ORDER,
            payload: res.data
        })
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(SA(msgs));
        dispatch({
            type: GET_ORDER_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const deleteOrder = (id: string, SA: typeof setAlert) => async (dispatch: ThunkDispatch<State, undefined, OrderAction>) => {
    try {
        const token: any = localStorage.getItem('token');
        // make req to API
        const res = await axios.delete(`/api/order/${id}`, {
            headers: {
                "x-auth-token": token
            }
        });

        // check res for msgs
        const msgs = res.data?.msgs;
        if (msgs) dispatch(SA(msgs));
        dispatch({
            type: DELETE_ORDER,
            payload: res.data
        })
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(SA(msgs));
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const updateOrder = (order: Order, SA: typeof setAlert) => async (dispatch: ThunkDispatch<State, undefined, OrderAction>) => {
    try {
        const token: any = localStorage.getItem('token');
        // make req to API
        const res = await axios.post('/api/update', {
            order: order
        }, {
            headers: {
                "x-auth-token": token
            }
        });

        // check for msgs 
        const msgs = res.data?.msgs;
        if (msgs) dispatch(SA(msgs));

        dispatch({
            type: ORDER_UPDATE,
            payload: res.data
        });
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(SA(msgs));
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload: null
        });
        console.error(err);
    }
};