import mongoose  from "mongoose";


export const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB");
        console.log(process.env.MONGO_URL);
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`); 
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}