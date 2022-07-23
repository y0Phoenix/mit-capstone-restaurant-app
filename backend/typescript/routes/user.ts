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
    if (!errors.isEmpty()) return res.status(400).json({ msgs: errors.array(), error: true, check: true });

    const {name, email, password}: CreateBody = req.body;

    try {
        // check if user exists
        let user: any = await User.findOne({email});
        if (user) return res.status(400).json({ msgs: [{msg: {
            title: 'Invalid Credentials',
            text: 'User Already Exists With Provided Email',
            type: 'error'}}], error: true });

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
            res.json({msgs: [{ msg: {
                title: 'Success',
                text: 'User Created Successfully',
                type: 'success'} }], token, data: user, isAuthenticated: true, error: false});
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error U1',
            type: 'error'}}], error: true });
    }
});

/**
 * @POST
 * @desc update the user
 * @body {name: string, cart: Cart}
 */
router.post('/update', auth, async (req: any, res) => {
    try {
        const {name} = req.body;

        req.user.name = name;

        req.user.save();

        res.json({msgs: [{msg: {
            title: 'Success', 
            text: 'User Updated Successfully',
            type: 'success'}}], error: false});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error', 
            text: 'Server Error U2',
            type: 'error'}}], error: true});
    }
});

/**
 * @DELETE
 * @desc deletes the user
 * @body {email: string, password: string}
 */
router.delete('/', auth, [
    check('password', 'Password Is Required').not().isEmpty()
], async (req, res) => {
    // check the body
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({msgs: errors.array(), error: true, chech: true});

    try {
        const {password} = req.body;

        // check the password provided for validation
        const bool = await bcrypt.compare(password, req.user.password);
        if (!bool) return res.status(401).json({msgs: [{msg: {
            title: 'Invalid Credentials',
            text: 'Password Was Incorrect',
            type: 'error'}}], error: true});

        // delete user
        req.user.remove();
        res.json({msgs: [{msg: {
            title: 'Success',
            text: 'User Deleted Successfully',
            type: 'success'}}], error: false, isAuthenticated: false});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error U3',
            type: 'error'}}], error: true});
    }
})

export default router;