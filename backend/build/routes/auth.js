"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const User_1 = __importDefault(require("../schemas/User"));
/**
 * @POST
 * @desc authenticated user for login
 * @BODY {email, password}
 */
router.post('/', [
    (0, express_validator_1.check)('email', 'Valid Email Is Required').isEmail(),
    (0, express_validator_1.check)('password', 'Password Is Required').not().isEmpty(),
], async (req, res) => {
    // check body for errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(401).json({ msgs: errors.array(), error: true, isAuthenicated: false });
    const Invalid = res.status(400).json({ msgs: [{ msg: 'Invalid Credentials' }], error: true, isAuthenticated: false });
    try {
        const { email, password, remember } = req.body;
        // check if user exists with email
        let user = await User_1.default.findOne({ email });
        if (!user)
            return Invalid;
        // if user exists check password
        const bool = await bcryptjs_1.default.compare(password, user.password);
        if (!bool)
            return Invalid;
        // if password is correct give client new token
        jsonwebtoken_1.default.sign({ user: { id: user.id } }, config_1.default.get('jwtSecret'), { expiresIn: remember ? '60d' : '1d' }, async (err, token) => {
            if (err)
                return res.status(500).json({ msgs: [{ msg: 'Server Error A2' }], error: true, isAuthenicated: false });
            user = await User_1.default.findById(user.id).select({ password: 0 });
            res.json({ token, data: user, isAuthenticated: true, error: false, msgs: [{ msg: 'Login Successfull' }] });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{ msg: 'Server Error A1' }], error: true, isAuthenticated: false });
    }
});
exports.default = router;
