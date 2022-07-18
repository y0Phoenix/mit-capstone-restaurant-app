"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RestaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    items: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            }
        }],
    picture: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    desc: {
        type: String
    }
});
const Restaurant = mongoose_1.default.model('restaurant', RestaurantSchema);
exports.default = Restaurant;
