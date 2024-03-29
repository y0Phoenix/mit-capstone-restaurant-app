import mongoose from "mongoose"

export interface Item {
    name: string,
    instrutions?: string,
    quantity: number,
    price: number,
    priceInCents: number,
    id: string,
    picture?: string
}

export const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    instructions: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number,
    },
    priceInCents: {
        type: Number
    },
    id: {
        type: String
    },
    picture: {
        type: String,
        default: ''
    }
});