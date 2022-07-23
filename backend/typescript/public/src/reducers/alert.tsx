import { SetAlertAction, Alert } from "../types/Alert";
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types';


const initialState: Alert = {
    title: '',
    text: '',
    type: '',
    show: false
};

export default function(state = initialState, action: SetAlertAction) {
    const {type, payload} = action;
    switch (type) {
        case SET_ALERT:
            let Msg = ``;
            if (Array.isArray(payload)) payload.forEach(msg => Msg += `${msg}\n`);
            state = {...payload, show: true};
            return state;
        case REMOVE_ALERT:
            state = {title: '', text: '', type: '', show: false}
            return state;
        default:
            return state
    }
};