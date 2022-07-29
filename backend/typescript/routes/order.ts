import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import User from '../schemas/User';
import Stripe from '../index';
import Restaurant from '../schemas/Restaurant';
import adminAuth from '../middleware/adminAuth';
import Order from '../schemas/Order';
import Alert from '../classes/Alert';

/**
 * @POST 
 * @desc place an order
 */
router.post('/:restaurant',async (req, res) => {
    let {items = [], user = null, instructions = '', delivery = {address: null, bool: false}} = req.body;
    let restaurant: any = req.params.restaurant;
    try {
        // if user isn't guest check the user exists
        if (user !== 'guest') user = await User.findById(user);
        if (!user) return res.status(400).json({msgs:  new Alert({
            title: 'Server Error',
            text: `Oops An Error Occured O2`,
            options: {
                variant: 'error',
                type: 'modal'
            }
        }), isAuthenticted: false, error: true});

        // check items
        if (items.length <= 0) return res.status(400).json({msgs:  new Alert({
            title: 'Server Error',
            text: `Oops An Error Occured O3`,
            options: {
                variant: 'error',
                type: 'modal'
            }
        }), error: true});

        // get restaurant
        restaurant = await Restaurant.findById(restaurant);
        if (!restaurant) return res.status(400).json({msgs:  new Alert({
            title: 'Server Error',
            text: `Oops An Error Occured O4`,
            options: {
                variant: 'error',
                type: 'modal'
            }
        }), error: true});

        // if user exists initiate stripe payment session
        const session = await Stripe.checkout.sessions.create({
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
                }
            }),
            success_url: 'http://localhost:3000/paymentsuccess',
            cancel_url: 'http://localhost:3000/canceledpayment'
        });
        // if session created successfully create order in db
        const order = new Order({
            user: user == 'guest' ? 'guest' : user._id,
            items,
            totalItems: items.length,
            total: items.reduce((total, item) => total + item.price),
            instructions,
            delivery
        });
        await order.save();

        // once order is created send payment url to client
        res.json({data: session.url, error: false});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs:  new Alert({
            title: 'Server Error',
            text: 'Server Error O1',
            options: {
                variant: 'error',
                type: 'modal'
            }
        })});
    } 
});

/**
 * @GET
 * @desc get orders
 */
router.get('/', adminAuth, async (req, res) => {
    try {
        // get orders
        const orders = await Order.find();
        res.json({data: orders, error: false});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs:  new Alert({
            title: 'Server Error',
            text: 'Server Error O2',
            options: {
                variant: 'error',
                type: 'modal'
            }
        })});
    } 
});

/**
 * @POST
 * @desc update order
 */
router.post('/update', adminAuth, async (req, res) => {
    try {
        const {order} = req.body;

        // check if order exists
        let _order = await Order.findById(order._id);
        if (!order) return res.status(400).json({msgs:  new Alert({
            title: 'Error',
            text: `Order Doesn't Exist This Is Likely A Problem On Our End Try Again Later`,
            options: {
                variant: 'error',
                type: 'modal'
            }
        }), error: true});

        // if order exists update it
        _order.user = order.user;
        _order.items = order.items;
        _order.totalItems = order.items.length;
        _order.total = order.items.reduce((total, item) => total + item.price);
        _order.instructions = order.instructions;
        _order.delivery = order.delivery;
        await _order.save();
        const orders = await Order.find();
        res.json({msgs:  new Alert({
            title: 'Success',
            text: 'Successfully Updated Order',
            options: {
                variant: 'success',
                type: 'alert'
            }
        }), error: false, data: orders});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs:  new Alert({
            title: 'Server Error',
            text: 'Server Error O3',
            options: {
                variant: 'error',
                type: 'modal'
            }
        })});
    } 
});

/**
 * @DELETE
 * @desc delete order
 */
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const id = req.params.id;

        // check if order exists
        const order = await Order.findById(id);
        if (!order) return res.status(400).json({msgs:  new Alert({
            title: 'Error',
            text: `Restaurant Doesn't Exist This Is Likely A Problem On Our End Try Again Later`,
            options: {
                variant: 'error',
                type: 'modal'
            }
        }), error: true});

        // if order exists remove it
        order.remove();
        const orders = await Order.find();
        res.json({msgs:  new Alert({
            title: 'Success',
            text: `Successfully Deleted Order ${order.id}`,
            options: {
                variant: 'success',
                type: 'alert'
            }
        }), error: false, data: orders});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs:  new Alert({
            title: 'Server Error',
            text: 'Server Error O4',
            options: {
                variant: 'error',
                type: 'modal'
            }
        })});
    }
});

export default router;