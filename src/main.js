import express from 'express';
import {config} from 'dotenv';
config();

import { countryRouter } from './router/country.routes.js'
const app = express();
const PORT = +process.env.PORT;

app.use(express.json());


app.use('/countries', countryRouter);
app.listen(PORT, ()=>console.log("Server running on port", PORT))