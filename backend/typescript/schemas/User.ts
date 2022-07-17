import mongoose from "mongoose";

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

const User = mongoose.model('user', UserSchema);

export default User;