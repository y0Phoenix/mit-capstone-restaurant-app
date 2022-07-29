import express from 'express';
const router = express.Router();
import Cart from '../classes/Cart';
import auth from '../middleware/auth';
import Alert from '../classes/Alert';

/**
 * @POST
 * @desc update user cart
 */
router.post('/', auth, async (req: any, res) => {
    interface Body {
        cart: Cart
    };
    try {
        const {cart}: Body = req.body;
        
        // update user cart
        req.user.cart = cart;

        // save data
        await req.user.save()

        res.json({data: req.user, error: false});

    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: {msg: new Alert({
            title: 'Server Error',
            text: 'Server Error C1',
            options: {
                variant: 'error',
                type: 'modal'
            }
        })}, error: true});
    }
});

export default router;