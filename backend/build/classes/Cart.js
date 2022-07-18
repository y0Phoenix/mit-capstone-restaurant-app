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
    constructor({ items, totalItems, total }) {
        this.items = items;
        this.totalItems = totalItems;
        this.total = total;
    }
    ;
}
exports.default = Cart;
