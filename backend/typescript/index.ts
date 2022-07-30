import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import user from './routes/user';
import auth from './routes/auth';
import restaurant from './routes/restaurant';
import adminUser from './routes/adminUser';
import order from './routes/order';
import config from 'config';
import stripe from 'stripe';
import path from 'path';

const Stripe = new stripe(config.get('stripeKey'), {apiVersion: null});

export default Stripe;

// initialize app
const app = express();

process.env.NODE_CONFIG_DIR = './config';

// connect to database
connectDB();

// http body parser
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// http policy
app.use(cors());
// public folder
app.use(express.static(path.join(__dirname, 'public')));

// routers
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/restaurant', restaurant);
app.use('/api/admin', adminUser);
app.use('/api/order', order);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));


// defining the apps port with which to communicate with it
const PORT = process.env.PORT || 5000;

// listend on a port for communication
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));