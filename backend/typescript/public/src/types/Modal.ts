import { Item } from "../../../interfaces/Item";
import { Restaurant } from "./Restaurant";

export interface Modal {
    item: ItemModal
}

export interface ItemModal {
    show: boolean
    name: string,
    price: number,
    priceInCents: number,
    restaurant?: Restaurant
};

export interface ModalAction {
    type: string,
    payload?: SetModalPayload
};

type Payload = Omit<Modal, 'item'>;

export interface SetModalPayload extends Payload {
    item?: ItemModal
    type: 'item'
};