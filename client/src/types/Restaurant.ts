import { Item } from "../../../backend/typescript/interfaces/Item";
import {v4 as uuid} from 'uuid';

interface NewRestaurantPayload {
    name?: string,
    _id?: string,
    picture?: string,
    items?: Item[],
    desc?: string,
    date?: number,
    init?: boolean,
    sales?: number
}

export interface RestaurantState {
    filtered?: Restaurant[],
    restaurants: Restaurant[]
}

export interface Restaurant {
    name: string,
    _id: string,
    picture: string,
    items: Item[],
    desc: string,
    date: number,
    sales: number
};

export interface RestaurantAction {
    type: string,
    payload: RestaurntPayload | null
};

export interface RestaurntPayload {
    data: Restaurant[],
    error: boolean
}