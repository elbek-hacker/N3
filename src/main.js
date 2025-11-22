import express from 'express';

import { connectDB } from './config/db.js';
import router from './router/user.route.js';

const app = express();
app.use(express.json());


await connectDB()
app.use('/user', router)

app.listen(2025, console.log('running on port:', 2025))