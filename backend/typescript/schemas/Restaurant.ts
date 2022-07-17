import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
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

const Restaurant = mongoose.model('restaurant', RestaurantSchema);

export default Restaurant;