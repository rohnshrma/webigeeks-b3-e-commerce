import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/wgB3eCommerceDB");
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
