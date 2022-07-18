"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
        items: [{
                name: {
                    type: String,
                    required: true
                },
                instructions: {
                    type: String,
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
        }
    }
});
const User = mongoose_1.default.model('user', UserSchema);
exports.default = User;
