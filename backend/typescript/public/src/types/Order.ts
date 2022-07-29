import { Item } from "../../../interfaces/Item";

export interface Order {
    _id: string,
    user: string,
    items: Item[],
    totalItems: number,
    total: number,
    date: Date,
    instructions: string,
    delivery: Delivery
};

export interface OrderState {
    orders: Order[],
    filtered?: Order[]
}

export interface Delivery {
    bool: boolean,
    address: string | null
};

export interface OrderAction {
    type: string,
    payload: Order[] | null
};