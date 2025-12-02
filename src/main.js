import { config } from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import router from './routes/index.route.js'
config();

const app = express();
const PORT = +process.env.PORT;
await connectDB();
app.use(express.json());

app.use('/api', router)

app.listen(PORT, console.log("server running on port", PORT))