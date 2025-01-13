import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URL = process.env.MONGO_URI;

async function dbConnection() {
  mongoose.connection.on("connected", () => {
    console.log("Connected to db");
  });
  mongoose.connection.on("error", (error) => {
    console.log(
      "Something went wrong after initial connection: ",
      error.message
    );
  });
  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
}

export default dbConnection;
