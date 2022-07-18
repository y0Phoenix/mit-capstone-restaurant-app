import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import gravatar from 'gravatar';
import Cart from '../classes/Cart';

import User from '../schemas/User';

interface CreateBody {
    name: string,
    email: string,
    password: string
}

/**
 * @POST
 * @desc Creates User
 * Requires name, email, and password with length of atleast 6 
 */
router.post('/', [
    check('name', 'Name Is Required').not().isEmpty(),
    check('email', 'Valid Email Is Required').isEmail(),
    check('password', 'Valid Password Of 6 Or More Is Required').isLength({min: 6}),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msgs: errors.array(), error: true });

    const {name, email, password}: CreateBody = req.body;

    try {
        // check if user exists
        let user = await User.findOne({email});
        if (user) return res.status(400).json({ msgs: [{msg: 'User Already Exists With Provided Email'}], error: true });

        // get avatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        // create user
        user = new User({
            name,
            email,
            password,
            avatar,
            cart: new Cart()
        });

        // hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // create JWT token for authentication
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600000}, async (err, token) => {
            if (err) throw err;
            user = await User.findById(user.id).select({password: 0});
            res.json({msgs: [{ msg: 'User Created Successfully' }], token, data: user, isAuthenticated: true, error: false});
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{msg: 'Server Error U1'}], error: true });
    }
});

export default router;