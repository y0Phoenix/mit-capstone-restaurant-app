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
const AdminUser_1 = __importDefault(require("../schemas/AdminUser"));
/**
 * @POST
 * @desc Create new Admin User
 */
router.post('/', [
    (0, express_validator_1.check)('name', 'Username Required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Valid Email Required').isEmail(),
    (0, express_validator_1.check)('password', 'Valid Password of Atleast 6 Characters Required').isLength({ min: 6 }),
], async (req, res) => {
    // chech for missing props
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ msgs: errors.array(), error: true, isAuthenticated: false });
    try {
        // if all required props exist create the new user
        const { name, email, password } = req.body;
        // gravatar
        const avatar = gravatar_1.default.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        // encrypt password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // create user
        let admin = new AdminUser_1.default({
            name,
            email,
            password: hashedPassword,
            avatar,
            token: ''
        });
        // create JWT for authorization
        jsonwebtoken_1.default.sign({ admin: { id: admin.id } }, config_1.default.get('jwtSecret'), { expiresIn: '1d' }, async (err, token) => {
            if (err)
                throw err;
            admin = await AdminUser_1.default.findById(admin.id).select({ password: 0 });
            admin.token = token;
            await admin.save();
            res.json({ msgs: [{ msg: `Admin ${admin.name} Created Successfully` }], data: admin, error: false, isAuthenticated: true });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{ msg: 'Server Error AU1' }], error: true, isAuthenticated: false });
    }
});
/**
 * @POST
 * @desc Login Admin User
 */
router.post('/login', [
    (0, express_validator_1.check)('email', 'Valid Email Required').isEmail(),
    (0, express_validator_1.check)('password', 'Valid Password Required').isLength({ min: 6 }),
], async (req, res) => {
    // chech for missing props
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        return res.status(400).json({ msgs: errors.array(), error: true, isAuthenticated: false });
    try {
        // if all props exists attempt to login user
        let { email, password, remeber } = req.body;
        // check if user with email exists
        let admin = await AdminUser_1.default.findOne({ email });
        if (!admin)
            return res.status(401).json({ msgs: [{ msg: 'No User With Specified Email' }], error: true, isAuthenticated: false });
        // if user exists check password
        const bool = await bcryptjs_1.default.compare(password, admin.password);
        if (!bool)
            return res.status(401).json({ msgs: [{ msg: 'Invalid Credentials' }], error: true, isAuthenticated: false });
        // if password is correct generate new token for user and send to the client
        jsonwebtoken_1.default.sign({ admin: { id: admin.id } }, config_1.default.get('jwtSecret'), { expiresIn: remeber ? '60d' : '1d' }, async (err, token) => {
            if (err)
                throw err;
            admin = await AdminUser_1.default.findById(admin.id).select({ password: 0 });
            admin.token = token;
            await admin.save();
            res.json({ data: admin, error: false, isAuthenticated: true });
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{ msg: 'Server Error AU2' }], error: false, isAuthenticated: false });
    }
});
