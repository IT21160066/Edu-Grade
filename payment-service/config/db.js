import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDb = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URI)
      .then(() => console.log("MongoDB Connection Successfull"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

export default ConnectDb;
