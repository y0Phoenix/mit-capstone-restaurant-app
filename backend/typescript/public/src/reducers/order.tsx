import { stat } from 'fs';
import {
    ORDER_UPDATE,
    ORDER_UPDATE_FAIL,
} from '../actions/types';
import {Order} from '../types/Order';

const initialState: Order[] = [];

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case ORDER_UPDATE:
            state = [...state, payload];
            return state;
        case ORDER_UPDATE_FAIL:
            state = initialState;
            return state
        default:
            return state
    }
}