import React from "react";
import { Item } from "../../../interfaces/Item";
import { Restaurant } from "./Restaurant";

export interface Modal {
    item: ItemModal,
    confirm: ConfirmModal
}

interface FormData {
    name: string,
    desc: string,
    items: Item[]
}

export interface ItemModal {
    show: boolean
    name: string,
    price: number,
    priceInCents: number,
    id: string,
    setState: React.Dispatch<React.SetStateAction<FormData>>,
    stateData: FormData
};

export interface ConfirmModalPayload {
    id?: string,
}

export interface ConfirmModal {
    show: boolean,
    title: string,
    text: string,
    type: string,
    callback: Function,
    payload?: ConfirmModalPayload
}

export interface ModalAction {
    type: string,
    payload?: SetModalPayload
};

type Payload = Omit<Modal, 'item' | 'confirm'>;

export interface SetModalPayload extends Payload {
    item?: ItemModal
    confirm?: ConfirmModal
    type: 'item' | 'confirm'
};