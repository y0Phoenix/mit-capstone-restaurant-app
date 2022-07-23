import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from 'config';
import gravatar from 'gravatar';
import Admin from '../schemas/AdminUser';

/**
 * @POST 
 * @desc Create new Admin User
 */
router.post('/', [
    check('name', 'Username Required').not().isEmpty(),
    check('email', 'Valid Email Required').isEmail(),
    check('password', 'Valid Password of Atleast 6 Characters Required').isLength({min: 6}),
], async (req, res) => {
    // chech for missing props
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({msgs: errors.array(), error: true, isAuthenticated: false, check: true});

    interface Body {
        name: string,
        email: string,
        password: string
    };

    try {
        // if all required props exist create the new user
        const {name, email, password}: Body = req.body;
    
        // gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
    
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        // create user
        let admin: any = new Admin({
            name,
            email,
            password: hashedPassword,
            avatar,
            token: ''
        });
    
        // create JWT for authorization
        jwt.sign({admin: {id: admin.id}}, config.get('jwtSecret'), {expiresIn: '1d'}, async (err, token) => {
            if (err) throw err;
            admin = await Admin.findById(admin.id).select({password: 0});
            admin.token = token;
            await admin.save();
            res.json({msgs: [{msg: {
                title: 'Succecc',
                text: `Admin ${admin.name} Created Successfully`,
                type: 'success'}}], data: admin, error: false, isAuthenticated: true});
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error AU1',
            type: 'error'}}], error: true, isAuthenticated: false});
    }
});

/**
 * @POST
 * @desc Login Admin User
 */
router.post('/login', [
    check('email', 'Valid Email Required').isEmail(),
    check('password', 'Valid Password Required').isLength({min: 6}),
], async (req, res) => {
    // chech for missing props
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({msgs: errors.array(), error: true, isAuthenticated: false, check: true});

    try {
        // if all props exists attempt to login user
        let {email, password, remeber} = req.body;

        // check if user with email exists
        let admin: any = await Admin.findOne({email});
        if (!admin) return res.status(401).json({msgs: [{msg: {
            title: 'Invalid Credentials',
            text: 'No User With Specified Email',
            type: 'error'}}], error: true, isAuthenticated: false});

        // if user exists check password
        const bool = await bcrypt.compare(password, admin.password);
        if (!bool) return res.status(401).json({msgs: [{msg: {
            title: 'Invalid Credentials',
            text: 'Email or Password Invalid',
            type: 'error'}}], error: true, isAuthenticated: false});

        // if password is correct generate new token for user and send to the client
        jwt.sign({admin: {id: admin.id}}, config.get('jwtSecret'), {expiresIn: remeber ? '60d' : '1d'}, async (err, token) => {
            if (err) throw err;
            admin = await Admin.findById(admin.id).select({password: 0});
            admin.token = token
            await admin.save()
            res.json({data: admin, error: false, isAuthenticated: true});
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error AU2',
            type: 'error'}}], error: false, isAuthenticated: false});
    }
});

export default router;