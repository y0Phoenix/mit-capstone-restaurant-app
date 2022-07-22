import { stat } from 'fs';
import {
    RESTAURANT_UPDATE,
    RESTAURANT_UPDATE_FAIL
} from '../actions/types';
import { Restaurant } from '../types/Restaurant';

const initialState: Restaurant[] = [];

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case RESTAURANT_UPDATE:
            state = [...state, payload];
            return state;
        case RESTAURANT_UPDATE_FAIL:
            state = initialState;
            return state
        default:
            return state;
    }
}