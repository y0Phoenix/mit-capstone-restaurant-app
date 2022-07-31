import React from "react";
import { NavigateFunction } from "react-router-dom";
import { Item } from "../../../backend/typescript/interfaces/Item";
import { Restaurant } from "./Restaurant";

export interface Modal {
    delivery: DeliveryModal,
    confirm: ConfirmModal
}

export interface DeliveryModal {
    show: boolean
    address: string,
    bool: boolean,
};

export interface ConfirmModalPayload {
    id?: string,
    navigate?: string
}

export interface ConfirmModal {
    show: boolean,
    title: string,
    text: string,
    type: 'warning' | 'danger',
    callbacks: {
        navigate?: NavigateFunction,
        generic: Function
    },
    payload?: ConfirmModalPayload
}

export interface ModalAction {
    type: string,
    payload?: SetModalPayload
};

type Payload = Omit<Modal, 'delivery' | 'confirm'>;

export interface SetModalPayload extends Payload {
    delivery?: DeliveryModal
    confirm?: ConfirmModal
    type: 'item' | 'confirm'
};