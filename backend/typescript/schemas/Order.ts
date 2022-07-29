import mongoose from "mongoose";
import {ItemSchema} from '../interfaces/Item';

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [ItemSchema],
    totalItems: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    instructions: {
        type: String,
    },
    delivery: {
        bool: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
            default: ''
        }
    },
    token: {
        type: String,
        unique: true
    },
    valid: {
        type: Boolean,
        dafault: false  
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Order = mongoose.model('order', OrderSchema);

export default Order;