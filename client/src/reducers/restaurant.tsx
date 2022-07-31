import { stat } from 'fs';
import {
    GET_RESTAURANT,
    GET_RESTAURANT_FAIL,
    FILTER_RESTAURANTS,
    FILTER_RESTAURANTS_FAIL,
} from '../actions/types';
import { Restaurant, RestaurantState } from '../types/Restaurant';

const initialState: RestaurantState = {
    restaurants: []
};

export default function (state = initialState, action: any) {
    const {type, payload} = action;

    switch (type) {
        case GET_RESTAURANT:
            state = initialState;
            state = {...state, restaurants: payload};
            return state;
        case FILTER_RESTAURANTS:
            state = {...state, filtered: payload};
            return state;
        case GET_RESTAURANT_FAIL:
        case FILTER_RESTAURANTS_FAIL:
            state = initialState;
            return state
        default:
            return state;
    }
}