import {
    GET_ORDER,
    GET_ORDER_FAIL,
    DELETE_ORDER_FAIL,
    DELETE_ORDER,
    ORDER_UPDATE,
    ORDER_UPDATE_FAIL,
    FilterOptions,
    FILTER_ORDERS,
    FILTER_ORDERS_FAIL
} from './types';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import { Order, OrderAction } from '../types/Order';
import { setAlert } from './alert';
import Alert from '../../../classes/Alert';

export const getOrders = () => async (dispatch: ThunkDispatch<State, undefined, OrderAction>) => {
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
        if (msgs) setAlert(msgs);
        dispatch({
            type: GET_ORDER,
            payload: res.data
        })
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: GET_ORDER_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const deleteOrder = (id: string) => async (dispatch: ThunkDispatch<State, undefined, OrderAction>) => {
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
        if (msgs) setAlert(msgs);
        dispatch({
            type: DELETE_ORDER,
            payload: res.data
        })
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const updateOrder = (order: Order) => async (dispatch: ThunkDispatch<State, undefined, OrderAction>) => {
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
        if (msgs) setAlert(msgs);

        dispatch({
            type: ORDER_UPDATE,
            payload: res.data
        });
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const filterOrders = ({id, name, orderState}: FilterOptions) => (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        if (name) {
            const regex = new RegExp(name, 'gi')
            var rests = orderState?.orders.filter(rest => regex.test(rest.user) ? rest : null)
        }
        else if (id) {
            var rests = orderState?.orders.filter(rest => rest._id === id ? rest : null)
        }
        else {
            rests = orderState?.orders;
        }
        dispatch({
            type: FILTER_ORDERS,
            payload: rests
        });
    } catch (err: any) {
        dispatch(setAlert(new Alert({
            title: 'Error',
            text: 'Something Went Wrong While Getting Order',
            options: {
                variant: 'error',
                type: 'modal'
            }
        })));
        dispatch({
            type: FILTER_ORDERS_FAIL,
            payload: null
        });
        console.error(err);
    }
}