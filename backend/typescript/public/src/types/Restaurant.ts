import {Item} from '../../../interfaces/Item';
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

export class Restaurant {
    name: string = '';
    _id: string = '';
    picture: string = '';
    items: Item[] = [];
    desc: string = '';
    date: number = 0;
    sales: number = 0;
    constructor({name, _id, picture, items, desc, date, init, sales}: NewRestaurantPayload) {
        if (init == true) {
            this.name = uuid();
            this._id = '';
            this.picture = '';
            this.items = [];
            this.desc = '';
            this.date = Date.now();
            return
        }
        this.name = name ? name : '';
        this._id = _id ? _id : '';
        this.picture = picture ? picture : '';
        this.items = items ? items : [];
        this.desc = desc ? desc : '';
        this.sales = sales ? sales : 0;
        this.date = date ? date : Date.now();
    }
};

export interface RestaurantAction {
    type: string,
    payload: RestaurntPayload | null
};

export interface RestaurntPayload {
    data: Restaurant[],
    error: boolean
}