# WeatherPro

A modern, feature-rich weather application providing real-time forecasts, weather news, and personalized weather insights with an AI-powered chatbot.

![WeatherPro Screenshot](https://via.placeholder.com/800x400?text=WeatherPro+Screenshot)

## 🌦️ Overview

WeatherPro delivers accurate weather predictions and forecasts for any location worldwide. Built with React and powered by reliable weather APIs, this application offers an intuitive, responsive interface for accessing detailed weather information, news updates, and interactive features.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any location
- **7-Day Forecast**: Plan ahead with extended weather predictions
- **24-Hour Forecast**: Detailed hourly weather updates
- **Global Coverage**: Weather data available worldwide
- **Automatic Location Detection**: Get weather for your current location
- **Weather News**: Stay updated with latest weather-related news
- **AI-Powered Chatbot**: Get weather insights through natural conversation using Google's Gemini AI
- **Responsive Design**: Works seamlessly on all devices

## 🛠️ Technologies Used

### Frontend

- React 19
- Vite
- TailwindCSS
- Framer Motion for animations
- React Router for navigation
- React Icons

### Backend

- Node.js
- Express
- Open-Meteo API for weather data
- NewsData.io for weather news
- Google Generative AI (Gemini) for chatbot

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- API keys for:
  - NewsData.io
  - Google Generative AI (Gemini)

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/ShadowGuy01234/Weather-app.git
cd Weather-app
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with:

```
NEWS_API_KEY=your_newsdata_io_api_key
PORT=3032
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory with:

```
VITE_NEWS_API_KEY=your_newsdata_io_api_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 💻 Running the Application

### Start the backend server

```bash
cd backend
npm start
```

The server will run at http://localhost:3032

### Start the frontend development server

```bash
cd frontend
npm run dev
```

The application will be available at http://localhost:5173

## 🌐 API Documentation

### Weather API Endpoints

#### Get Weather Data

```
GET /api/weather?city={city_name}
```

Provides weather data including daily forecasts, hourly temperatures, and precipitation information.

#### Get Weather News

```
GET /api/news?category={category}&page={page_number}
```

Fetches weather-related news articles. Categories include: "extreme", "climate", "research", "global" or "all".

## 📱 Application Structure

- **Home Page**: Current weather and forecasts
- **Weather News Page**: Latest weather-related articles
- **Features Page**: Information about app capabilities
- **About Page**: Project and team details
- **Weather Chatbot**: AI assistant for weather queries

## 👥 Development Team

- **Anurag Banerjee** - CSE, B.Tech 1st Year (MMMUT, GKP)
- **Bittu Prajapati** - CSE, B.Tech 1st Year (MMMUT, GKP)
- **Deepanshi Gupta** - ECE, B.Tech 1st Year (MMMUT, GKP)
- **Harsh Mishra** - CSE, B.Tech 1st Year (MMMUT, GKP)
- **Nitigya Aswani** - IT, B.Tech 1st Year (MMMUT, GKP)

## 🔥 Key Features in Detail

### AI-Powered Weather Assistant

The integrated chatbot leverages Google's Gemini AI to answer weather-related queries, providing natural language responses to questions about weather conditions, forecasts, and climate information.

### Interactive Weather Visualization

Weather conditions are represented with intuitive icons and interactive UI elements, making it easy to understand current and upcoming weather patterns.

### Personalized Weather Alerts

The application can deliver custom notifications based on user preferences for specific weather conditions.

## 🔄 Deployment

The backend is configured for deployment on Vercel, and the frontend can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
