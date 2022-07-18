"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.ItemSchema = new mongoose_1.default.Schema({
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
