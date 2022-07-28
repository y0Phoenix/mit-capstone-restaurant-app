import {
    GET_RESTAURANT,
    GET_RESTAURANT_FAIL,
    RESTAURANT_UPDATE,
    RESTAURANT_UPDATE_FAIL,
} from './types';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import { Restaurant, RestaurantAction } from '../types/Restaurant';
import { setAlert } from './alert';

export const getRestaurants = (setAlert: Function) => async (dispatch: ThunkDispatch<State, undefined, RestaurantAction>) => {
    try {
        // send request to API
        const res = await axios.get('/api/restaurant');

        // check for msgs
        const msgs = res.data?.msgs;
        if (msgs) setAlert(msgs);
        dispatch({
            type: GET_RESTAURANT,
            payload: res.data
        });

    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: GET_RESTAURANT_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const updateRestaurants = (restaurant: Restaurant, setAlert: Function) => async (dispatch: ThunkDispatch<State, undefined, RestaurantAction>) => {
    try {
        const token: any = localStorage.getItem('token')
        // send request to API
        const res = await axios.post('/api/restaurant', restaurant, {
            headers: {
                "x-auth-token": token
            }
        });

        // check for msgs
        const msgs = res.data?.msgs;
        if (msgs) setAlert(msgs);
        dispatch({
            type: RESTAURANT_UPDATE,
            payload: res.data
        });
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: RESTAURANT_UPDATE_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const deleteRestaurant = (id: string, setAlert: Function) => async (dispatch: ThunkDispatch<State, undefined, RestaurantAction>) => {
    try {
        // send req to API 
        const res = await axios.delete(`/api/restaurant/${id}`);

        // check res for msgs
        const msgs = res.data?.msgs;
        if (msgs) setAlert(msgs);

        dispatch({
            type: RESTAURANT_UPDATE,
            payload: res.data
        });
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) setAlert(msgs);
        dispatch({
            type: RESTAURANT_UPDATE_FAIL,
            payload: null
        });
        console.error(err);
    }
}