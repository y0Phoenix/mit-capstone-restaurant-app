"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Item_1 = require("../interfaces/Item");
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
    },
    cart: {
        items: [Item_1.ItemSchema],
        totalItems: {
            type: Number,
        },
        total: {
            type: Number,
        }
    }
});
const User = mongoose_1.default.model('user', UserSchema);
exports.default = User;
