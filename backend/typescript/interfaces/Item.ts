import mongoose from "mongoose"

export interface Item {
    name: string,
    instrutions: string,
    price: number
}

export const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    instructions: {
        type: String
    },
    price: {
        type: Number,
    }
});