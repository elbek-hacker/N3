import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import router from "./router/movie.router.js";
config()

const PORT = process.env.PORT;

await connectDB();
const app = express();
app.use(express.json());

app.use('/movie', router)

app.listen(PORT, console.log('server running on port:', PORT));