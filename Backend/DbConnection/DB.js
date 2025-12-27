import mongoose from "mongoose";
import "dotenv/config"
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ");
  } catch (error) {
    console.error("MongoDB Connection Failed ");
    console.log(error.message);
  
  }
};

export default connectDB;
