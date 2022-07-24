import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';
import axios from 'axios';
import { SetAlertAction, SetAlertPayload, RemoveAlertAction } from '../types/Alert';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';

export const setAlert = (payload: SetAlertPayload) => (dispatch: ThunkDispatch<State, undefined, SetAlertAction>) => {
    dispatch({
        type: SET_ALERT,
        payload: payload
    });
};

export const removeAlert = () => (dispatch: ThunkDispatch<State, undefined, RemoveAlertAction>) => {
    dispatch({
        type: REMOVE_ALERT
    });
}