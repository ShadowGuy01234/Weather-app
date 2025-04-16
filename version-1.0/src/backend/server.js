import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

const app = express();
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

async function getCoordinates(city) {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;

  try {
    const response = await fetch(geocodingUrl);
    const data = await response.json();

    const results = data.results;
    if (!results || results.length === 0) {
      throw new Error("City not found.");
    }

    const { latitude, longitude, name, timezone } = results[0];
    return { latitude, longitude, name, timezone };
  } catch (error) {
    throw new Error(`Error fetching coordinates: ${error.message}`);
  }
}

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const { latitude, longitude, name, timezone } = await getCoordinates(city);

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=${encodeURIComponent(
      timezone
    )}`;

    const response = await fetch(weatherUrl);
    const weatherData = await response.json();

    res.json({
      city: name,
      timezone,
      daily: weatherData.daily,
      hourly: weatherData.hourly,
    });
  } catch (error) {
    console.error("Weather API error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT);
