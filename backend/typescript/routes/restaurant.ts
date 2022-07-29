import express from 'express';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import adminAuth from '../middleware/adminAuth';
import Restaurant from '../schemas/Restaurant';


/**
 * @GET
 * @desc get all restaurants
 */
router.get('/', async (req, res) => {
    try {
        // get all restaurants
        const restaurants = await Restaurant.find();

        // check if restaurants exist
        if (restaurants.length <= 0) return res.json({msgs: [{msg: {
            title: 'No Data',
            text: 'No Restaurants Exist In Database',
            type: 'error'}}], error: false});

        // if restaurants exist send them back
        res.json({data: restaurants, error: false});

    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error R1',
            type: 'error'}}], error: true});
    }
});

/**
 * @POST
 * @desc create restaurant
 */
router.post('/', adminAuth, [
    check('name', 'A Name Is Required').not().isEmpty(),
    check('desc', 'A Desciption Is Required').not().isEmpty(),
], async (req, res) => {
    // check req for errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ msgs: errors.array(), error: true, check: true });

    try {
        const {name, desc, picture = '', items = []} = req.body;

        // if no errors in req check if restaurant already exists
        let restaurant = await Restaurant.findOne({name});
        if (restaurant) return res.status(400).json({msgs: [{msg: {
            title: 'Invalid Input',
            text: `Restaurant ${name} Already Exists`,
            type: 'error'
        }}], error: true});

        // if restaurant doesn't exist yet create it
        restaurant = new Restaurant({
            name,
            desc,
            picture,
            items
        });
        await restaurant.save();
        const restaurants = await Restaurant.find();
        res.json({msgs: [{msg: {
            title: 'Success',
            text: 'Restaurant Created Successfully',
            type: 'success'
        }}], error: false, data: restaurants});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error R2',
            type: 'error'}}], error: true});
    }
});

/**
 * @POST
 * @desc updates a restaurant 
 */
router.post('/update', adminAuth, async (req, res) => {
    try {
        const {_id, date, desc, items, name, picture} = req.body;

        // check if restaurant exists
        let _restaurant = await Restaurant.findById(_id);
        if (!_restaurant) return res.status(400).json({msgs: [{msg: {
            title: 'Error',
            text: `Restaurant Doesn't Exist This Is Likely A Problem On Our End Try Again Later`,
            type: 'error'
        }}], error: true});

        // if restaurant exists update it
        _restaurant.name = name;
        _restaurant.items = items;
        _restaurant.picture = picture;
        _restaurant.desc = desc;
        await _restaurant.save();
        const restaurants = await Restaurant.find();
        res.json({msgs: [{msg: {
            title: 'Success',
            text: 'Restaurant Updated Successfully',
            type: 'success'
        }}], error: false, data: restaurants});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error R3',
            type: 'error'}}], error: true});
    }
});

/**
 * @DELETE
 * @desc delete a restaurant
 */
router.delete('/:id', adminAuth, async (req, res) => {
    try {
        const id = req.params.id;

        // check if restaurant exists
        let restaurant = await Restaurant.findById(id);
        if (!restaurant) return res.status(400).json({msgs: [{msg: {
            title: 'Error',
            text: `Restaurant Doesn't Exist This Is Likely A Problem On Our End Try Again Later`,
            type: 'error'
        }}], error: true});

        // if restaurant exists delete it
        await restaurant.remove();
        const restaurants = await Restaurant.find();
        res.json({msgs: [{msg: {
            title: 'Success',
            text: `Successfully Removed ${restaurant.name}`,
            type: 'success'
        }}], error: false, data: restaurants});
    } catch (err) {
        console.error(err);
        res.status(500).json({msgs: [{msg: {
            title: 'Server Error',
            text: 'Server Error R4',
            type: 'error'}}], error: true});
    }
});

export default router;