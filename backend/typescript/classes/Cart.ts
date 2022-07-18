import { Item } from "../interfaces/Item";

/**
 * 
 * @desc methods for manipulating the users cart
 */
export default class Cart {
    items: Item[];
    totalItems: number;
    total: number
    /**
     * @param  {Cart} {Cart}
     * @desc creates a new cart
     */
    constructor(cart: Cart = null ) {
        if (!cart) {
            this.items = [];
            this.totalItems = 0;
            this.total = 0;
        }
        else {
            this.items = cart.items;
            this.totalItems = cart.totalItems;
            this.total = cart.total;

        }
    };

}

