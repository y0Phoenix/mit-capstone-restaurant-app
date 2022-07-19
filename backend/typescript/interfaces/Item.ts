import mongoose from "mongoose"

export interface Item {
    name: string,
    instrutions: string,
    quantity: number,
    price: number,
    priceInCents: number
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
    }
});