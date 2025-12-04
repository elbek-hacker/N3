import { config } from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import router from './routes/index.route.js'
import { errorHandle } from './middlewares/error-handle.js';
import { ApiError } from './utils/custom-error.js';
config();

const app = express();
const PORT = +process.env.PORT;
await connectDB();
app.use(express.json());

app.use('/api', router);

app.all(/(.*)/, (_req, _res, next)=>{
    next( new ApiError("URL not found", 404));
});

app.use(errorHandle);

app.listen(PORT, console.log("server running on port", PORT))