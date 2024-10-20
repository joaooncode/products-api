import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()


// connects database
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error ${error}`);
        process.exit(1);

    }
}