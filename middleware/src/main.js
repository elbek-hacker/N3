import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import router from './router/players.route.js';
import errorHandle from './utils/error-handle.js';
config();

const app = express();
const PORT = +process.env.PORT;
app.use(express.json());

await connectDB();
app.use('/players', router);

app.use(errorHandle);
app.listen(PORT, ()=>console.log('Server running on PORT', PORT));