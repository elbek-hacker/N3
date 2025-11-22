import { connect } from "mongoose";
import { config } from "dotenv";
config()
export async function connectDB() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (error) {
    console.log("error on connecting database!");
  }
}
