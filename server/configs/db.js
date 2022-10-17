const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      autoIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
