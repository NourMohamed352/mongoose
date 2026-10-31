import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blog_app');
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
};