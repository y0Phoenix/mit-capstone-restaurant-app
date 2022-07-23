import jwt, { JwtPayload } from "jsonwebtoken";
import config from 'config';
import User from "../schemas/User";
import Admin from "../schemas/AdminUser";

export default async (req, res, next) => {
    // get token from header or params
    const token = req.params.token ? req.params.token : req.header('x-auth-token');

    // check if no token
    if (!token) return res.status(401).json({msgs: [{msg: {
        title: 'Auth Denied',
        text: 'No Token, Auth Denied',
        type: 'error'}}], error: true, isAuthenticated: false});

    // verify token
    try {
        // decode token
        const decoded: any = jwt.verify(token, config.get('jwtSecret'));
        
        // check if user exists from id inside decoded token
        const admin = await Admin.findById(decoded.user.id);
        if (!admin) return res.status(401).json({msgs: [{msg: {
            title: 'Auth Denied',
            text: 'Token Not Valid, Auth Denied',
            type: 'error'}}], error: true, isAuthenticated: false});
        
        // if user exists add it to req object for easy access later
        req.user = admin;
        req.isAdmin = true;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({msgs: [{msg: {
            title: 'Auth Denied',
            text: 'Token Not Valid, Auth Denied',
            type: 'error'}}], error: true, isAuthenticated: false});
    }
}