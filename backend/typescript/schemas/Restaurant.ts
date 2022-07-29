import mongoose from "mongoose";
import {ItemSchema} from '../interfaces/Item';

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    items: [ItemSchema],
    picture: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    desc: {
        type: String
    },
    sales: {
        type: Number,
        default: 0
    }
});

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

export default Restaurant;