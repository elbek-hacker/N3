import { connect } from "mongoose"
import { envConfig } from "./index.js";

export async function connectDB(){
    try {
        await connect(envConfig.MONGO_URL);
        console.log("Database connected!!")
    } catch (error) {
        console.log("error on connecting database")
    }
}
