import express from 'express';
import {config} from 'dotenv';
config();
import { getData, setData } from './helpers/file.js'
const app = express();
const PORT = +process.env.PORT;

app.use(express.json());

app.get('/countries',async (_req, res)=>{
    const countries = await getData();
    return res.json(countries);
});
app.get('/countries/:id', async (req, res)=>{
    const id = +req.params.id;
    const countries = await getData();
    const country = countries.find(el=>el?.id === id);
    if(!country){
        return res.status(404).json({
            message: `Country not found by ID:${id}`
        })
    }
    return res.status.apply(200).json(country);
})
app.post('/countries', async (req, res)=>{
    const country = await getData();
    const newCountry = {
        id: countries.length ? countries.at(-1)?.id + 1 : 1,
        ...req.body
    }
    countries.push(newCountry);
    await setData(countries);
    return res.status(201).json(newCountry);
})
app.put('/countries/:id', async (req, res)=>{
    const id = +req.params?.id;
    const countries = await getData();
    const index = countries.findIndex(el=>el?.id === id);
    if(index != -1){
        countries[index] = {id: +id, ...req.body};
        await setData(countries);
        return res.status(200).json(countries[index]);
    }
    return res.status(404).json({
        message: `Country not found by ID:${id}`
    })
})
app.delete('/countries/:id', async (req, res)=>{
    const id = +req.params?.id;
    const countries = await getData();
    const index = countries.findIndex(el=>el?.id === id);
    if(index != -1){
        countries.splice(index, 1);
        await setData(countries);
        return res.status(200).json({});
    }
    return res.status(404).json({
        message: `Country not found by ID:${id}`
    })
})
app.listen(PORT, ()=>console.log("Server running on port", PORT))