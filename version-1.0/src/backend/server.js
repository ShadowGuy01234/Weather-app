import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import fetch from "node-fetch";

const app = express();

dotenv.config();
app.use(cors());


app.get('/', (req, res) => {
    res.send("Hello from server");
});

app.get('/api/weather', async (req, res) => {
    const API_KEY = process.env.WEATHER_API_KEY
    const {city}  = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
      }

    const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
        const response = await fetch(URL);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Failed to fetch the weather data'})
    }
});

app.listen(process.env.PORT);