import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';
import axios from 'axios';
import { SetAlertAction, RemoveAlertAction } from '../types/Alert';
import { ThunkDispatch } from 'redux-thunk';
import State from '../types/State';
import Alert from '../../../backend/typescript/classes/Alert';

export const setAlert = (payload: Alert) => (dispatch: ThunkDispatch<State, undefined, SetAlertAction>) => {
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