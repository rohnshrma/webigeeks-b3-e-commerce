import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import users from "./data/users.js";
import products from "./data/products.js";
import Order from "./model/orderModel.js";
import User from "./model/userModel.js";
import Product from "./model/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("sample products", sampleProducts);

    console.log("DATA IMPORTED".green.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.green.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    console.log("DATA DESTROYED".red.inverse);
    process.exit();
  } catch (err) {
    console.log(`${err}`.green.inverse);
    process.exit(1);
  }
};

if (process.argv[2] == "-d") {
  destroyData();
} else {
  importData();
}
