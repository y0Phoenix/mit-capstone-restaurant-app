"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const User_1 = __importDefault(require("../schemas/User"));
exports.default = async (req, res, next) => {
    // get token from header or params
    const token = req.params.token ? req.params.token : req.header('x-auth-token');
    // check if no token
    if (!token)
        return res.status(401).json({ msgs: [{ msg: 'No Token, Auth Denied' }], error: true, isAuthenticated: false });
    // verify token
    try {
        // decode token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwtSecret'));
        // check if user exists from id inside decoded token
        const user = await User_1.default.findById(decoded.user.id);
        if (!user)
            return res.status(401).json({ msgs: [{ msg: 'Token Not Valid, Auth Denied' }], error: true, isAuthenticated: false });
        // if user exists add it to req object for easy access later
        req.user = user;
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ msgs: [{ msg: 'Token Not Valid, Auth Denied' }], error: true, isAuthenticated: false });
    }
};
