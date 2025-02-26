import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is Connected");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);  // Exit process with failure
    }
};

export default connectDB;