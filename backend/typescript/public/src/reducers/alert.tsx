import { SetAlertAction, AlertState } from "../types/Alert";
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types';


const initialState: AlertState = {
    title: '',
    text: '',
    options: {
        variant: 'error',
        type: 'alert'
    },
    show: false
};

export default function(state = initialState, action: SetAlertAction) {
    const {type, payload} = action;
    switch (type) {
        case SET_ALERT:
            console.log(payload);
            state = {title: payload.title, text: payload.text, options: payload.options, validator: payload?.validator, show: true};
            return state;
        case REMOVE_ALERT:
            state = initialState;
            return state;
        default:
            return state
    }
};