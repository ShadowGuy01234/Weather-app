import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || "https://weather-app-frontend-i64p.onrender.com";

const PORT = process.env.PORT || 3000;
// Configure CORS
app.use(cors({
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

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

const categoryConfig = {
    extreme: {
        query: "extreme weather"
    },
    climate: {
        query: "climate change"
    },
    research: {
        query: "weather research"
    },
    global: {
        query: "global weather events"
    }
};

app.get("/api/news", async (req, res) => {
    const { category = "all", page = null } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "News API key not configured" });
    }

    try {
        const categoriesToFetch = category === "all" ? Object.keys(categoryConfig) : [category];
        const articles = [];
        const nextPageMap = {};

        for (const cat of categoriesToFetch) {
            const config = categoryConfig[cat];
            const baseUrl = "https://newsdata.io/api/1/news";
            const url = page
                ? `${baseUrl}?apikey=${apiKey}&q=${encodeURIComponent(config.query)}&language=en&page=${page}`
                : `${baseUrl}?apikey=${apiKey}&q=${encodeURIComponent(config.query)}&language=en`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch news for ${cat}`);
            }

            const data = await response.json();
            if (data.status === "success" && data.results) {
                const mappedArticles = data.results.map((article, index) => ({
                    id: `${cat}-${Date.now()}-${index}`,
                    title: article.title || "Untitled Article",
                    excerpt: article.description ||
                        article.content?.substring(0, 100) ||
                        "No description available",
                    category: cat,
                    date: article.pubDate
                        ? new Date(article.pubDate).toISOString().split("T")[0]
                        : "Unknown",
                    url: article.link || "#",
                    image: article.image_url || "https://via.placeholder.com/150"
                }));

                articles.push(...mappedArticles);
                if (data.nextPage) {
                    nextPageMap[cat] = data.nextPage;
                }
            }
        }

        res.json({
            articles,
            nextPage: nextPageMap
        });
    } catch (error) {
        console.error("News API error:", error.message);
        res.status(500).json({ error: error.message });
    }
});

const gemini = new GoogleGenerativeAI("AIzaSyBFjIIxhkvWk35f3vOKCtO3IDklvOme3Q4");
const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/gemini", async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const prompt = `As a professional weather assistant, provide a concise, accurate response to this weather-related query: "${message}". If it's not weather-related, politely explain you specialize in weather information.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini API error:", error.message);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

app.listen(PORT);
