import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "weather-icons-react";
import useWeather from "../hooks/useWeather";
import SearchInput from "../components/SearchInput";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -5,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3 },
  },
};

function Home() {
  const [showHourly, setShowHourly] = useState(false);
  const {
    city,
    setCity,
    weatherData,
    loading,
    error,
    handleSubmit,
    formatDate,
  } = useWeather();

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode === 0) return <WiDaySunny size={48} color="#FFD700" />;
    if (weatherCode <= 3) return <WiCloudy size={48} color="#A9A9A9" />;
    if (weatherCode <= 67) return <WiRain size={48} color="#4682B4" />;
    if (weatherCode <= 77) return <WiSnow size={48} color="#E0FFFF" />;
    if (weatherCode <= 99) return <WiThunderstorm size={48} color="#483D8B" />;
    return <WiFog size={48} color="#D3D3D3" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h1
            className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600 mb-3"
            whileHover={{ scale: 1.02 }}
          >
            Weather Forecast
          </motion.h1>
          <p className="text-blue-600 text-lg mb-8">
            Get accurate weather predictions for any location
          </p>
          <SearchInput
            city={city}
            setCity={setCity}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </motion.header>
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-lg max-w-xl mx-auto shadow-md"
            >
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {weatherData && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-10"
          >
            {/* Location Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100"
            >
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold">
                      {weatherData.location}
                    </h2>
                    <p className="opacity-90 mt-1">{weatherData.timezone}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-200 text-sm">
                      {formatDate(weatherData.daily.time[0])}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-6xl font-bold text-blue-800">
                      {
                        weatherData.hourly.temperature_2m[
                          weatherData.hourly.time.findIndex(
                            (t) =>
                              new Date(t).getHours() ===
                                new Date().getHours() &&
                              new Date(t).getDate() === new Date().getDate()
                          )
                        ]
                      }
                      °C
                    </p>
                    <p className="text-blue-600 mt-2 capitalize">
                      {weatherData.daily.precipitation_sum[0] > 0
                        ? "Rainy"
                        : "Clear"}{" "}
                      conditions
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="scale-150 transform origin-center">
                      {getWeatherIcon(
                        weatherData.daily.weathercode
                          ? weatherData.daily.weathercode[0]
                          : 0
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Daily Forecast */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100"
            >
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white">
                <h3 className="text-2xl font-semibold">7-Day Forecast</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-5">
                  {weatherData.daily.time.map((date, index) => (
                    <motion.div
                      key={date}
                      variants={itemVariants}
                      className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-5 text-center border border-blue-100 shadow-md hover:shadow-lg transition-all"
                    >
                      <p className="font-semibold text-blue-800">
                        {formatDate(date)}
                      </p>
                      <div className="my-4 flex justify-center">
                        {getWeatherIcon(
                          weatherData.daily.weathercode
                            ? weatherData.daily.weathercode[index]
                            : 0
                        )}
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-red-600 font-bold">
                          {weatherData.daily.temperature_2m_max[index]}°
                        </span>
                        <span className="text-blue-600 font-bold">
                          {weatherData.daily.temperature_2m_min[index]}°
                        </span>
                      </div>
                      <div className="mt-3 bg-blue-100 rounded-full h-1 w-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full"
                          style={{
                            width: `${Math.min(
                              weatherData.daily.precipitation_sum[index] * 10,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs mt-2 text-blue-600">
                        {weatherData.daily.precipitation_sum[index]}mm
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Hourly Forecast Toggle */}
            <motion.div variants={itemVariants} className="text-center">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowHourly(!showHourly)}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg"
              >
                {showHourly ? (
                  <>
                    <WiDaySunny className="inline-block mr-2 text-xl" />
                    Hide Hourly Forecast
                  </>
                ) : (
                  <>
                    <WiRain className="inline-block mr-2 text-xl" />
                    Show 24-Hour Forecast
                  </>
                )}
              </motion.button>
            </motion.div>

            <AnimatePresence>
              {showHourly && weatherData.hourly && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100"
                >
                  <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-6 text-white">
                    <h3 className="text-2xl font-semibold">24-Hour Forecast</h3>
                  </div>
                  <div className="p-6 overflow-x-auto custom-scroll-hide">
                    <div className="flex space-x-4 pb-4">
                      {weatherData.hourly.time
                        .slice(0, 24)
                        .map((time, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex-shrink-0 w-32 bg-gradient-to-b from-blue-50 to-white rounded-xl p-4 text-center border border-blue-100 shadow-md hover:shadow-lg transition-all"
                          >
                            <p className="font-medium text-blue-800">
                              {new Date(time).toLocaleTimeString([], {
                                hour: "2-digit",
                                hour12: true,
                              })}
                            </p>
                            <div className="my-3 flex justify-center">
                              {getWeatherIcon(
                                weatherData.hourly.weathercode
                                  ? weatherData.hourly.weathercode[index]
                                  : 0
                              )}
                            </div>
                            <p className="text-xl font-bold text-blue-800 mb-2">
                              {weatherData.hourly.temperature_2m[index]}°
                            </p>
                            <div className="flex justify-between text-xs">
                              <span className="text-blue-600">
                                <span className="block font-medium">Rain</span>
                                {weatherData.hourly.precipitation[index]}mm
                              </span>
                              <span className="text-blue-600">
                                <span className="block font-medium">Wind</span>
                                {weatherData.hourly.wind_speed_10m[index]}km/h
                              </span>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Home;
