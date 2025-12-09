import express from 'express';
import cookieParser from 'cookie-parser';

import { envConfig } from './config/index.js';
import { connectDB } from './config/db.js';
import router from './routes/index.route.js'
import { ApiError } from './utils/custom-error.js';
import { errorHandle } from './middlewares/error-handle.js';
import { createSuperAdmin } from './helpers/create-superadmin.js'

const app = express();
const PORT = envConfig.PORT;

app.use(express.json());
app.use(cookieParser());

await connectDB();
await createSuperAdmin();

app.use('/api', router);

app.all(/(.*)/, (_req, _res, next)=>{
    next( new ApiError("URL not found", 404));
});

app.use(errorHandle);

app.listen(PORT, console.log("server running on port", PORT))