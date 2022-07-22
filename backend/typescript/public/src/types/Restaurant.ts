import {Item} from '../../../interfaces/Item';

export interface Restaurant {
    name: string,
    id: string,
    picture: string,
    items: Item[],
    desc: string,
    date: Date
}