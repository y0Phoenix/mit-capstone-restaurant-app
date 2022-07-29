import { ThunkDispatch } from 'redux-thunk';
import { Modal, ItemModal, ModalAction, SetModalPayload } from '../types/Modal';
import State from '../types/State';
import {
    SET_MODAL,
    RESET_MODAL
} from './types';

export const setModal = (payload: SetModalPayload) => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: SET_MODAL,
        payload: payload
    });
};

export const resetModal = () => (dispatch: ThunkDispatch<State, undefined, ModalAction>) => {
    dispatch({
        type: RESET_MODAL
    });
};