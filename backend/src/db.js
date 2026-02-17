const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const url = process.env.MONGODB_URI;
const connectDb = async () => {
  try {
    await mongoose.connect(url);
    // console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting DB", error);
    throw error;
  }
};
module.exports = connectDb;
