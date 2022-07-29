import { stat } from 'fs';
import {
    FILTER_ORDERS,
    FILTER_ORDERS_FAIL,
    ORDER_UPDATE,
    ORDER_UPDATE_FAIL,
} from '../actions/types';
import {Order, OrderState} from '../types/Order';

const initialState: OrderState = {
    orders: []
};

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case ORDER_UPDATE:
            state = {...state, orders: payload};
            return state;
        case FILTER_ORDERS: 
            state = {...state, filtered: payload};
            return state;
        case ORDER_UPDATE_FAIL:
        case FILTER_ORDERS_FAIL:
            state = initialState;
            return state
        default:
            return state
    }
}