import {Item} from '../../../interfaces/Item';

interface NewRestaurantPayload {
    name?: string,
    _id?: string,
    picture?: string,
    items?: Item[],
    desc?: string,
    date?: number,
    init?: boolean
}

export class Restaurant {
    name: string = '';
    _id: string = '';
    picture: string = '';
    items: Item[] = [];
    desc: string = '';
    date: number = 0;
    constructor({name, _id, picture, items = [], desc, date, init}: NewRestaurantPayload) {
        if (init == true) {
            this.name = '';
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
        this.items = items !== [] ? items : [];
        this.desc = desc ? desc : '';
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