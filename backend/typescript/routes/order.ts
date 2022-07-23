import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import gravatar from 'gravatar';
import Cart from '../classes/Cart';
import auth from '../middleware/auth';
import User from '../schemas/User';
import Stripe from '../index';
import Restaurant from '../schemas/Restaurant';
import {Item} from '../interfaces/Item';

/**
 * @POST 
 * @desc place an order
 */
router.post('/:restaurant',async (req, res) => {
    let {items = [], user = null,} = req.body;
    let restaurant: any = req.params.restaurant;
    try {
        // if user isn't guest check the user exists
        if (user !== 'guest') user = await User.findById(user);
        if (!user) return res.status(400).json({msgs: [{msg: {
            title: 'Server Error',
            text: `Oops An Error Occured O2`,
            type: 'error'}}], isAuthenticted: false, error: true});

        // check items
        if (items.length <= 0) return res.status(400).json({msgs: [{msg: {
            title: 'Server Error',
            text: `Oops An Error Occured O3`,
            type: 'error'}}], error: true});

        // get restaurant
        restaurant = await Restaurant.findById(restaurant);
        if (!restaurant) return res.status(400).json({msgs: [{msg: {
            title: 'Server Error',
            text: `Oops An Error Occured O4`,
            type: 'error'}}], error: true});

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
        
        // if session created successfully send the payment url to client
        res.json({data: session.url, error: false});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error O1',
            type: 'error'}}]});
    } 
})