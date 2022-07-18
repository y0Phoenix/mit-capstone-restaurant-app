import mongoose from "mongoose";
import {ItemSchema} from '../interfaces/Item';

const UserSchema = new mongoose.Schema({
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
        items: [ItemSchema],
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

const User = mongoose.model('user', UserSchema);

export default User;