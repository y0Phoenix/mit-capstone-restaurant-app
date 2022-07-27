import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import User from '../schemas/User';
import auth from '../middleware/auth';
import adminAuth from '../middleware/adminAuth';
import Admin from '../schemas/AdminUser';

/**
 * @POST
 * @desc authenticated user for login
 * @BODY {email, password}
 */
router.post('/', [
    check('email', 'Valid Email Is Required').isEmail(),
    check('password', 'Password Is Required').not().isEmpty(),
], async (req, res) => {
    // check body for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(401).json({msgs: errors.array(), error: true, isAuthenicated: false, check: true});

    try {
        const {email, password, remember} = req.body;
        // check if user exists with email
        let user: any = await User.findOne({email});
        if (!user) return res.status(400).json({msgs: [{msg: {
            title: 'Invalid Credentials',
            text: 'Email or Password Invalid',
            type: 'error'}}], error: true, isAuthenticated: false});;

        // if user exists check password
        const bool = await bcrypt.compare(password, user.password);
        if (!bool) return res.status(400).json({msgs: [{msg: {
            title: 'Invalid Credentials',
            text: 'Email or Password Invalid',
            type: 'error'}}], error: true, isAuthenticated: false});;

        // if password is correct give client new token
        jwt.sign({user: {id: user.id}}, config.get('jwtSecret'), {expiresIn: remember ? '60d' : '1d'}, async (err, token) => {
            if (err) return res.status(500).json({msgs: [{msg: {
                title: 'Server Error',
                text: 'Server Error A2',
                type: 'error'}}], error: true, isAuthenicated: false});
            user = await User.findById(user.id).select({password: 0, token: 0});
            res.json({token, data: user, isAuthenticated: true, error: false});
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error A1',
            type: 'error'}}], error: true, isAuthenticated: false});
    }
});

/**
 * @post
 * @desc load user for client
 */
router.post('/load', auth, async (req: any, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({data: user, error: false, isAuthenticated: true});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msgs: [{ msg: {
            title: 'Server Error',
            text: 'Server Error A2',
            type: 'error'
        }}], error: true, isAuthenticated: false });
    }
});
/**
 * @post
 * @desc load user for admin
 */
router.post('/admin',adminAuth, async (req: any, res) => {
    try {
        const admin = await Admin.findById(req.user.id).select('-password');
        res.json({data: admin, error: false, isAuthenticated: true});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msgs: [{ msg: {
            title: 'Server Error',
            text: 'Server Error A3',
            type: 'error'
        }}], error: true, isAuthenticated: false });
    }
});

export default router;