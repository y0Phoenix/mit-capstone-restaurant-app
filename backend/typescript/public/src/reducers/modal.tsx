import {
    SET_MODAL,
    RESET_MODAL
} from '../actions/types';
import { Modal, ModalAction } from '../types/Modal';

const initialState : Modal = {
    item: {
        show: false,
        name: '',
        price: 0,
        priceInCents: 0,
        id: '',
        stateData: {
            name: '',
            desc: '',
            items: []
        }
    },
    confirm: {
        title: '',
        text: '',
        type: 'warning',
        show: false,
        callbacks: {
            generic: () => {}
        }
    }
}

export default (state = initialState, action: ModalAction) => {
    const {type, payload} = action;
    switch (type) {
        case SET_MODAL:
            state = {...initialState, ...payload};
            return state
        case RESET_MODAL:
            state = initialState;
            return state
        default:
            return state;
    }
}