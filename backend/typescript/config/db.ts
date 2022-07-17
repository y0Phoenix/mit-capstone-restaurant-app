import mongoose from "mongoose";
import config from 'config';
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('connected to MongoDB');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;