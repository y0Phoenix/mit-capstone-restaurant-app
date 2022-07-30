import {
    GET_RESTAURANT,
    GET_RESTAURANT_FAIL,
    RESTAURANT_UPDATE,
    RESTAURANT_UPDATE_FAIL,
    FILTER_RESTAURANTS,
    FILTER_RESTAURANTS_FAIL,
    FilterOptions
} from './types';
import axios from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import { Restaurant, RestaurantAction, RestaurantState } from '../types/Restaurant';
import { setAlert } from './alert';
import Alert from '../../../classes/Alert';
import moment from 'moment';
import { NavigateFunction } from 'react-router-dom';

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
}

export const filterRestaurants = ({name, id, sales, restaurantState}: FilterOptions) => (dispatch: ThunkDispatch<State, undefined, any>) => {
    try {
        if (name) {
            const regex = new RegExp(name, 'gi')
            var rests = restaurantState?.restaurants.filter(rest => regex.test(rest.name) ? rest : null)
        }
        else if (id) {
            var rests = restaurantState?.restaurants.filter(rest => rest._id === id ? rest : null)
        }
        else if (sales) {
            var rests = restaurantState?.restaurants.sort((a, b) => {
                if (a.sales > b.sales) return 1;
                return -1
            });
            rests?.splice(3);
        }
        else {
            rests = restaurantState?.restaurants;
        }
        dispatch({
            type: FILTER_RESTAURANTS,
            payload: rests
        });
    } catch (err: any) {
        dispatch(setAlert(new Alert({
            title: 'Error',
            text: 'Something Went Wrong While Getting Restaurant',
            options: {
                variant: 'error',
                type: 'modal'
            }
        })));
        dispatch({
            type: FILTER_RESTAURANTS_FAIL,
            payload: null
        });
        console.error(err);
    }
};

export const addRestaurant = (formData: Restaurant, navigate: NavigateFunction) => async (dispatch: ThunkDispatch<State, undefined, any>) => {
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
        const [restaurant] = res.data.data.filter((rest: Restaurant) => rest.name == formData.name ? rest : null);
        navigate(`/restaurant/${restaurant._id}`);
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