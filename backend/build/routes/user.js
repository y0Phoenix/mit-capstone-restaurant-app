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
const gravatar_1 = __importDefault(require("gravatar"));
const Cart_1 = __importDefault(require("../classes/Cart"));
const User_1 = __importDefault(require("../schemas/User"));
/**
 * @POST
 * @desc Creates User
 * Requires name, email, and password with length of atleast 6
 */
router.post('/', [
    (0, express_validator_1.check)('name', 'Name Is Required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Valid Email Is Required').isEmail(),
    (0, express_validator_1.check)('password', 'Valid Password Of 6 Or More Is Required').isLength({ min: 6 }),
], async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ msgs: errors.array(), error: true });
    const { name, email, password } = req.body;
    try {
        // check if user exists
        let user = await User_1.default.findOne({ email });
        if (user)
            return res.status(400).json({ msgs: [{ msg: 'User Already Exists With Provided Email' }], error: true });
        // get avatar
        const avatar = gravatar_1.default.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        // create user
        user = new User_1.default({
            name,
            email,
            password,
            avatar,
            cart: new Cart_1.default()
        });
        // hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        user.password = await bcryptjs_1.default.hash(password, salt);
        await user.save();
        // create JWT token for authentication
        const payload = {
            user: {
                id: user.id
            }
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.get('jwtSecret'), { expiresIn: 3600000 }, async (err, token) => {
            if (err)
                throw err;
            user = await User_1.default.findById(user.id).select({ password: 0 });
            res.json({ msgs: [{ msg: 'User Created Successfully' }], token, data: user, isAuthenticated: true, error: false });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{ msg: 'Server Error U1' }], error: true });
    }
});
exports.default = router;
