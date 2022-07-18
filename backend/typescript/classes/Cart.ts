import { Item } from "../interfaces/Item";

/**
 * 
 * @desc methods for manipulating the users cart
 */
export default class Cart {
    items: Item;
    totalItems: number;
    total: number
    /**
     * @param  {Cart} {Cart}
     * @desc creates a new cart
     */
    constructor({items, totalItems, total}: Cart) {
        this.items = items;
        this.totalItems = totalItems;
        this.total = total
    };

}

