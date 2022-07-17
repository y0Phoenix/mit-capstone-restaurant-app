import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items: [{
        name: {
            type: String,
            required: true
        },
        instructions: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        }
    }],
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
    }
});

const Order = mongoose.model('order', OrderSchema);

export default Order;