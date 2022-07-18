import jwt, { JwtPayload } from "jsonwebtoken";
import config from 'config';
import User from "../schemas/User";

export default async (req, res, next) => {
    // get token from header or params
    const token = req.params.token ? req.params.token : req.header('x-auth-token');

    // check if no token
    if (!token) return res.status(401).json({msgs: [{msg: 'No Token, Auth Denied'}], error: true, isAuthenticated: false});

    // verify token
    try {
        // decode token
        const decoded: any = jwt.verify(token, config.get('jwtSecret'));
        
        // check if user exists from id inside decoded token
        const user = await User.findById(decoded.user.id);
        if (!user) return res.status(401).json({msgs: [{msg: 'Token Not Valid, Auth Denied'}], error: true, isAuthenticated: false});
        
        // if user exists add it to req object for easy access later
        req.user = user;
        next();

    } catch (err) {
        console.error(err);
        res.status(401).json({msgs: [{msg: 'Token Not Valid, Auth Denied'}], error: true, isAuthenticated: false});
    }
}
