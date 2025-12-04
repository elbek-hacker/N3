import { config } from "dotenv"
import { connect } from "mongoose"
config();
export async function connectDB(){
    try {
        await connect(process.env.MONGO_URL);
        console.log("Database connected!")
    } catch (error) {
        console.log("error on connecting database")
    }
}