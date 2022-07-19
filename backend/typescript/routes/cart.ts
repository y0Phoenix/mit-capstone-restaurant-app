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

/**
 * @POST
 * @desc update user cart
 */
router.post('/', auth, async (req: any, res) => {
    interface Body {
        cart: Cart
    };
    try {
        const {cart}: Body = req.body;
        
        // update user cart
        req.user.cart = cart;

        // save data
        await req.user.save()

        res.json({data: req.user, error: false});

    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: 'Server Error C1'}], error: true});
    }
});

export default router;