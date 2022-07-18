"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
const Order = mongoose_1.default.model('order', OrderSchema);
exports.default = Order;
