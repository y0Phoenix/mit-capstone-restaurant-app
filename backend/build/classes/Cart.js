"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * @desc methods for manipulating the users cart
 */
class Cart {
    items;
    totalItems;
    total;
    /**
     * @param  {Cart} {Cart}
     * @desc creates a new cart
     */
    constructor(cart = null) {
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
    }
    ;
}
exports.default = Cart;
