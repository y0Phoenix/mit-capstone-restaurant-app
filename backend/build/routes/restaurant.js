"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Restaurant_1 = __importDefault(require("../schemas/Restaurant"));
/**
 * @GET
 * @desc get all restaurants
 */
router.get('/', async (req, res) => {
    try {
        // get all restaurants
        const restaurants = await Restaurant_1.default.find();
        // check if restaurants exist
        if (restaurants.length <= 0)
            return res.json({ msgs: [{ msg: 'No Restaurants Exist In Database' }], error: false });
        // if restaurants exist send them back
        res.json({ data: restaurants, error: false });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msgs: [{ msg: 'Server Error R1' }], error: true });
    }
});
exports.default = router;
