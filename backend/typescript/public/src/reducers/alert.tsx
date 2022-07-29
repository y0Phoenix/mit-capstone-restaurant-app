import { SetAlertAction, AlertState } from "../types/Alert";
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../actions/types';


const initialState: AlertState = {
    title: '',
    text: '',
    type: [''],
    show: false
};

export default function(state = initialState, action: SetAlertAction) {
    const {type, payload} = action;
    switch (type) {
        case SET_ALERT:
            console.log(payload);
            let Msg = ``;
            let title = ``;
            let Type = [``];
            if (Array.isArray(payload)) payload.forEach(msg => {
                if (typeof msg.msg == 'string') return Msg += `${msg.msg}\n`;
                Msg += `${msg.msg.text}\n`;
                title = msg.msg.title
                Type = msg.msg.type;
            });
            state = {title: title, text: Msg, type: Type, show: true};
            return state;
        case REMOVE_ALERT:
            state = {title: '', text: '', type: [''], show: false}
            return state;
        default:
            return state
    }
};