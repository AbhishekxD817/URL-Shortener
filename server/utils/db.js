import mongoose from "mongoose";

export default async function connectDb() {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log("Db connected successfully");
    } catch (error) {
        console.log(error);
    }
}