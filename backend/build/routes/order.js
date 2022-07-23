"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = __importDefault(require("../schemas/User"));
const index_1 = __importDefault(require("../index"));
const Restaurant_1 = __importDefault(require("../schemas/Restaurant"));
/**
 * @POST
 * @desc place an order
 */
router.post('/:restaurant', async (req, res) => {
    let { items = [], user = null, } = req.body;
    let restaurant = req.params.restaurant;
    try {
        // if user isn't guest check the user exists
        if (user !== 'guest')
            user = await User_1.default.findById(user);
        if (!user)
            return res.status(400).json({ msgs: [{ msg: `Oops An Error Occured O2` }], isAuthenticted: false, error: true });
        // check items
        if (items.length <= 0)
            return res.status(400).json({ msgs: [{ msg: `Oops An Error Occured O3` }], error: true });
        // get restaurant
        restaurant = await Restaurant_1.default.findById(restaurant);
        if (!restaurant)
            return res.status(400).json({ msgs: [{ msg: `Oops An Error Occured O4` }], error: true });
        // if user exists initiate stripe payment session
        const session = await index_1.default.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                const [dbitem] = restaurant.items.filter(_item => _item.name === item.name && _item.priceInCents === item.priceInCents);
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: dbitem.name
                        },
                        unit_amount: dbitem.priceInCents
                    },
                    quantity: item.quantity
                };
            }),
            success_url: 'http://localhost:3000/paymentsuccess',
            cancel_url: 'http://localhost:3000/canceledpayment'
        });
        // if session created successfully send the payment url to client
        res.json({ data: session.url, error: false });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{ msg: 'Server Error O1' }] });
    }
});
