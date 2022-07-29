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
import Alert from '../../../classes/Alert';

export const getRestaurants = () => async (dispatch: ThunkDispatch<State, undefined, RestaurantAction>) => {
    try {
        // send request to API
        const res = await axios.get('/api/restaurant');

        // check for msgs
        const msgs = res.data?.msgs;
        if (msgs) dispatch(setAlert(msgs));
        dispatch({
            type: GET_RESTAURANT,
            payload: res.data.data
        });

    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(setAlert(msgs));
        dispatch({
            type: GET_RESTAURANT_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const updateRestaurant = (restaurant: Restaurant) => async (dispatch: ThunkDispatch<State, undefined, RestaurantAction>) => {
    try {
        // send request to API
        const res = await axios.post('/api/restaurant/update', restaurant);

        // check for msgs
        const msgs = res.data?.msgs;
        if (msgs) dispatch(setAlert(msgs));
        dispatch({
            type: RESTAURANT_UPDATE,
            payload: res.data.data
        });
    } catch (err: any) {
        const msgs = err.response.data?.msgs;
        if(msgs) dispatch(setAlert(msgs));
        dispatch({
            type: RESTAURANT_UPDATE_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const deleteRestaurant = (id: string) => async (dispatch: ThunkDispatch<State, undefined, RestaurantAction>) => {
    try {
        // send req to API 
        const res = await axios.delete(`/api/restaurant/${id}`);

        // check res for msgs
        const msgs = res.data?.msgs;
        if (msgs) setAlert(msgs);

        dispatch({
            type: RESTAURANT_UPDATE,
            payload: res.data.data
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
export const filterRestaurants = (id: string, restaurants: Restaurant[]) => (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        const regex = new RegExp(id, 'gi');
        const rests = restaurants.filter(rest => regex.test(rest._id) ? rest : null)
        dispatch({
            type: RESTAURANT_UPDATE,
            payload: rests
        });
    } catch (err: any) {
        dispatch(setAlert(new Alert({
            title: 'Error',
            text: 'Something Went Wrong While Getting Restaurant',
            type: ['error', 'modal']
        })));
        dispatch({
            type: RESTAURANT_UPDATE_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const addRestaurant = (formData: Restaurant) => async (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        // make req to API
        const res = await axios.post('/api/restaurant', formData);

        // check res for msgs
        const msgs = res.data?.msgs
        if (msgs) dispatch(setAlert(msgs));

        dispatch({
            type: GET_RESTAURANT,
            payload: res.data.data
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