import { stat } from 'fs';
import {
    GET_RESTAURANT,
    GET_RESTAURANT_FAIL,
    RESTAURANT_UPDATE,
    RESTAURANT_UPDATE_FAIL
} from '../actions/types';
import { Restaurant } from '../types/Restaurant';

const initialState: Restaurant[] = [];

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case RESTAURANT_UPDATE:
        case GET_RESTAURANT:
            state = initialState;
            state = [...state, ...payload];
            return state;
        case RESTAURANT_UPDATE_FAIL:
        case GET_RESTAURANT_FAIL:
            state = initialState;
            return state
        default:
            return state;
    }
}