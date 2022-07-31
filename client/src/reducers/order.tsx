import { stat } from 'fs';
import {
    FILTER_ORDERS,
    FILTER_ORDERS_FAIL,
    GET_ORDER,
    GET_ORDER_FAIL,
} from '../actions/types';
import {Order, OrderState} from '../types/Order';

const initialState: OrderState = {
    orders: []
};

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case GET_ORDER:
            state = {...state, orders: payload};
            return state;
        case FILTER_ORDERS: 
            state = {...state, filtered: payload};
            return state;
        case GET_ORDER_FAIL:
        case FILTER_ORDERS_FAIL:
            state = initialState;
            return state
        default:
            return state
    }
}