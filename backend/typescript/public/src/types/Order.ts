import { Item } from "../../../interfaces/Item";

export interface Order {
    user: string,
    items: Item[],
    totalItems: number,
    total: number,
    date: Date,
    instructions: string,
    delivery: Delivery
};

export interface Delivery {
    bool: boolean,
    address: string | null
};