"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../middleware/auth"));
/**
 * @POST
 * @desc update user cart
 */
router.post('/', auth_1.default, async (req, res) => {
    ;
    try {
        const { cart } = req.body;
        // update user cart
        req.user.cart = cart;
        // save data
        await req.user.save();
        res.json({ data: req.user, error: false });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{ msg: 'Server Error O1' }], error: true });
    }
});
exports.default = router;
