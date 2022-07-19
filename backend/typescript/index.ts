import express from 'express';
import cors from 'cors';
import connectDB from './config/db';
import user from './routes/user';
import auth from './routes/auth';
import restaurant from './routes/restaurant';

// initialize app
const app = express();

process.env.NODE_CONFIG_DIR = './config';

// connect to database
connectDB();

// http body parser
app.use(express.json());
// http policy
app.use(cors());

app.get('/', (req, res) => res.send('API Running'));

// routers
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/restaurant', restaurant);

// defining the apps port with which to communicate with it
const PORT = process.env.PORT || 5000;

// listend on a port for communication
app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));