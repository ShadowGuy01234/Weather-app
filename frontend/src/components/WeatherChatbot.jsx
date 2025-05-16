import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import { FaTimes } from "react-icons/fa";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const WeatherChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Weather Assistant. I can provide real-time weather info for any location. Try asking me:\n• What's the weather in Delhi?\n• Temperature in Tokyo\n• Forecast for New York\n• How's the weather in London?",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to detect if the query is asking for weather data
  const isWeatherQuery = (query) => {
    const weatherKeywords = [
      "weather",
      "temperature",
      "forecast",
      "rain",
      "sunny",
      "humidity",
      "wind",
      "climate",
      "hot",
      "cold",
    ];

    const queryLower = query.toLowerCase();
    return weatherKeywords.some((keyword) => queryLower.includes(keyword));
  };

  // Function to extract location from the query
  const extractLocation = (query) => {
    const queryLower = query.toLowerCase();

    // Check for common patterns like "weather in [location]" or "what's the temperature in [location]"
    const patterns = [
      /weather in ([a-z\s]+)(?:\?|$)/,
      /temperature in ([a-z\s]+)(?:\?|$)/,
      /forecast for ([a-z\s]+)(?:\?|$)/,
      /how is the weather in ([a-z\s]+)(?:\?|$)/,
      /what is the weather in ([a-z\s]+)(?:\?|$)/,
      /what's the weather in ([a-z\s]+)(?:\?|$)/,
      /what is the temperature in ([a-z\s]+)(?:\?|$)/,
      /what's the temperature in ([a-z\s]+)(?:\?|$)/,
      /how hot is it in ([a-z\s]+)(?:\?|$)/,
      /how cold is it in ([a-z\s]+)(?:\?|$)/,
    ];

    for (const pattern of patterns) {
      const match = queryLower.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return null;
  };

  // Function to fetch real-time weather data
  const fetchWeatherData = async (location) => {
    try {
      // Using OpenMeteo's free API that doesn't require API keys
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location
        )}&count=1&language=en&format=json`
      );

      const geocodingData = await geocodingResponse.json();

      if (!geocodingData.results || geocodingData.results.length === 0) {
        return `I couldn't find the location "${location}". Could you please check the spelling or try another location?`;
      }

      const { latitude, longitude, name, country } = geocodingData.results[0];

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
      );

      const weatherData = await weatherResponse.json();

      // Interpret weather code
      const weatherCodeMap = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        56: "Light freezing drizzle",
        57: "Dense freezing drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        66: "Light freezing rain",
        67: "Heavy freezing rain",
        71: "Slight snow fall",
        73: "Moderate snow fall",
        75: "Heavy snow fall",
        77: "Snow grains",
        80: "Slight rain showers",
        81: "Moderate rain showers",
        82: "Violent rain showers",
        85: "Slight snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail",
      };

      const current = weatherData.current;
      const daily = weatherData.daily;
      const currentWeather = weatherCodeMap[current.weather_code] || "Unknown";

      // Forecast for today and tomorrow
      const todayWeather = weatherCodeMap[daily.weather_code[0]] || "Unknown";
      const tomorrowWeather =
        weatherCodeMap[daily.weather_code[1]] || "Unknown";

      return `
Current weather in ${name}, ${country}:
Temperature: ${current.temperature_2m}${weatherData.current_units.temperature_2m}
Conditions: ${currentWeather}
Humidity: ${current.relative_humidity_2m}${weatherData.current_units.relative_humidity_2m}
Wind Speed: ${current.wind_speed_10m}${weatherData.current_units.wind_speed_10m}

Today: ${todayWeather}, high of ${daily.temperature_2m_max[0]}°C, low of ${daily.temperature_2m_min[0]}°C
Tomorrow: ${tomorrowWeather}, high of ${daily.temperature_2m_max[1]}°C, low of ${daily.temperature_2m_min[1]}°C
      `.trim();
    } catch (error) {
      console.error("Weather data fetch error:", error);
      return "I'm having trouble retrieving the weather data right now. Please try again later.";
    }
  };

  // Modified handleSendMessage to process weather queries
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      // Check if this is a weather query
      if (isWeatherQuery(message)) {
        const location = extractLocation(message);

        if (location) {
          // This is a weather query with a location
          const weatherResponse = await fetchWeatherData(location);

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: weatherResponse,
              sender: "bot",
            },
          ]);
        } else {
          // Weather query but no location specified
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now() + 1,
              text: "I'd be happy to provide weather information. Could you please specify a location? For example, 'What's the weather in Delhi?'",
              sender: "bot",
            },
          ]);
        }
      } else {
        // Not a weather query, use the existing backend
        const res = await fetch(
          "https://weather-app-backend-774123782107.us-central1.run.app/api/gemini",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
          }
        );

        const data = await res.json();

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            text: data.reply || "Sorry, I couldn't find an answer.",
            sender: "bot",
          },
        ]);
      }
    } catch (error) {
      console.error("Processing error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I'm experiencing technical difficulties. Please try again shortly.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        aria-label={
          isOpen ? "Close weather assistant" : "Open weather assistant"
        }
      >
        {isOpen ? (
          <FaTimes className="h-5 w-5" />
        ) : (
          <MdOutlineMarkChatRead className="h-5 w-5" />
        )}
      </motion.a>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 z-40 w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
            style={{
              maxHeight: "calc(100vh - 120px)",
              width: "calc(100% - 48px)",
              maxWidth: "420px",
            }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3 text-white flex items-center">
              <div className="flex items-center">
                <WiDaySunny className="h-5 w-5 mr-2" />
                <h3 className="font-medium text-sm">Weather Assistant</h3>
                <span className="ml-2 bg-blue-800 text-white text-xs px-2 py-0.5 rounded-full">
                  Real-time
                </span>
              </div>
              <a
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white hover:text-blue-200 focus:outline-none p-1 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes className="h-4 w-4" />
              </a>
            </div>

            {/* Chat Messages */}
            <div
              className="h-72 p-4 overflow-y-auto bg-gray-50"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-xs border border-gray-100"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="bg-white text-gray-800 rounded-bl-none shadow-xs border border-gray-100 px-3 py-2 rounded-lg max-w-[85%]">
                    <div className="flex space-x-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-200 bg-white"
            >
              <div className="flex items-center lg:rounded-lg bg-gray-100 shadow-sm w-full justify-between">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about weather..."
                  disabled={isLoading}
                  className="flex-1 w-full px-4 py-2 rounded-l-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <a
                  type="submit"
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="bg-blue-600 text-white mx-1 p-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoMdSend className="h-5 w-5" />
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeatherChatbot;
