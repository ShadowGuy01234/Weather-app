import { useState, useEffect } from 'react';

export default function useWeather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    if (!cityName || !cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://weather-app-backend-774123782107.us-central1.run.app/api/weather?city=${encodeURIComponent(cityName)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      setWeatherData({
        location: data.city,
        timezone: data.timezone,
        daily: data.daily,
        hourly: data.hourly,
      });
      setCity(cityName);
    } catch (error) {
      setError(error.message || "An error occurred while fetching weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getCurrentLocationWeather = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();

      const detectedCity =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.county ||
        data.display_name.split(",")[0];

      if (detectedCity) {
        setCity(detectedCity);
        await fetchWeather(detectedCity);
      } else {
        throw new Error("Could not determine city name from location");
      }
    } catch (error) {
      setError(error.message || "Could not fetch weather for current location.");
    }
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);
  
  return {
    city,
    setCity,
    weatherData,
    loading,
    error,
    fetchWeather,
    handleSubmit,
    formatDate,
  };
}