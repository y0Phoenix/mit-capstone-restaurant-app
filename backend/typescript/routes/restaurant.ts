import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import gravatar from 'gravatar';
import Cart from '../classes/Cart';
import auth from '../middleware/auth';
import Restaurant from '../schemas/Restaurant';

/**
 * @GET
 * @desc get all restaurants
 */
router.get('/', async (req, res) => {
    try {
        // get all restaurants
        const restaurants = Restaurant.find();

        // check if restaurants exist
        if (!restaurants) return res.json({msgs: [{msg: 'No Restaurants Exist In Database'}], error: false});

        // if restaurants exist send them back
        res.json({data: restaurants, error: false});

    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: 'Server Error R1'}], error: true});
    }
});

export default router;