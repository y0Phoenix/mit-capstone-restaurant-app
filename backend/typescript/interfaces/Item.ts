import mongoose from "mongoose"

export interface Item {
    name: string,
    instrutions: string,
    price: number
}

export const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    instructions: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
});