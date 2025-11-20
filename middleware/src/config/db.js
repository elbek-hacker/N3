import { connect } from "mongoose";
import { config } from "dotenv";
config();
export async function connectDB(){
    try {
        await connect(String(process.env.MONGOOSE_URL));
        console.log('Database connected!');
    } catch (error) {
        console.log('Error on connecting database!');
    }
}