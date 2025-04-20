/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import "../App.css";
// import {
//   WiDaySunny,
//   WiRain,
//   WiCloudy,
//   WiSnow,
//   WiThunderstorm,
//   WiFog,
// } from "weather-icons-react";

// function Home() {
//   const [city, setCity] = useState("");
//   const [weatherData, setWeatherData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showHourly, setShowHourly] = useState(false);

//   const fetchWeather = async (cityName) => {
//     if (!cityName.trim()) {
//       setError("Please enter a city name");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `http://localhost:3032/api/weather?city=${encodeURIComponent(cityName)}`
//       );
//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to fetch weather data");
//       }

//       setWeatherData({
//         location: data.city,
//         timezone: data.timezone,
//         daily: data.daily,
//         hourly: data.hourly,
//       });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchWeather(city);
//   };

//   const formatDate = (dateString) => {
//     const options = {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   useEffect(() => {
//     const getCurrentLocation = () => {
//       if (!navigator.geolocation) {
//         setError("Geolocation is not supported by your browser.");
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           try {
//             const { latitude, longitude } = position.coords;

//             // Get location name
//             const res = await fetch(
//               `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//             );
//             const data = await res.json();
//             const detectedCity =
//               data.address.city ||
//               data.address.town ||
//               data.address.village ||
//               data.display_name;

//             // Fetch weather using the detected city name
//             fetchWeather(detectedCity);
//           } catch (error) {
//             setError("Could not fetch weather for current location.");
//           }
//         },
//         (error) => {
//           setError("Location access denied or unavailable.");
//         }
//       );
//     };

//     getCurrentLocation();
//   }, []);

//   const getWeatherIcon = (weatherCode) => {
//     // Simplified weather code interpretation
//     if (weatherCode === 0) return <WiDaySunny size={48} color="#FFD700" />;
//     if (weatherCode <= 3) return <WiCloudy size={48} color="#A9A9A9" />;
//     if (weatherCode <= 67) return <WiRain size={48} color="#4682B4" />;
//     if (weatherCode <= 77) return <WiSnow size={48} color="#E0FFFF" />;
//     if (weatherCode <= 99) return <WiThunderstorm size={48} color="#483D8B" />;
//     return <WiFog size={48} color="#D3D3D3" />;
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 md:p-8">
//         <div className="max-w-6xl mx-auto">
//           <header className="text-center mb-8">
//             <h1 className="text-4xl font-bold text-blue-800 mb-2">
//               Weather Forecast
//             </h1>
//             <p className="text-blue-600 mb-6">
//               Get accurate weather predictions for any location
//             </p>

//             <form
//               onSubmit={handleSubmit}
//               className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
//             >
//               <input
//                 type="text"
//                 value={city}
//                 onChange={(e) => setCity(e.target.value)}
//                 placeholder="Enter city name"
//                 className="flex-grow px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
//               />
//               <button
//                 className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
//                 type="submit"
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg
//                       className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Loading...
//                   </span>
//                 ) : (
//                   "Get Forecast"
//                 )}
//               </button>
//             </form>
//           </header>

//           {error && (
//             <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg max-w-md mx-auto">
//               <p>{error}</p>
//             </div>
//           )}

//           {weatherData && (
//             <div className="space-y-8">
//               {/* Location Card */}
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
//                   <h2 className="text-2xl font-bold">{weatherData.location}</h2>
//                   <p className="opacity-90">{weatherData.timezone}</p>
//                 </div>
//                 <div className="p-6">
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-5xl font-bold text-blue-800">
//                         {
//                           weatherData.hourly.temperature_2m[
//                             weatherData.hourly.time.findIndex(
//                               (t) =>
//                                 new Date(t).getHours() ===
//                                   new Date().getHours() &&
//                                 new Date(t).getDate() === new Date().getDate()
//                             )
//                           ]
//                         }
//                         °C
//                       </p>
//                       <p className="text-blue-600">
//                         {formatDate(weatherData.daily.time[0])}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       {getWeatherIcon(
//                         weatherData.daily.weathercode
//                           ? weatherData.daily.weathercode[0]
//                           : 0
//                       )}
//                       <p className="capitalize text-blue-800">
//                         {weatherData.daily.precipitation_sum[0] > 0
//                           ? "Rainy"
//                           : "Clear"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Daily Forecast */}
//               <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                 <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
//                   <h3 className="text-xl font-semibold">7-Day Forecast</h3>
//                 </div>
//                 <div className="p-4">
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
//                     {weatherData.daily.time.map((date, index) => (
//                       <div
//                         key={date}
//                         className="bg-blue-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
//                       >
//                         <p className="font-medium text-blue-800">
//                           {formatDate(date)}
//                         </p>
//                         <div className="my-2 flex justify-center">
//                           {getWeatherIcon(
//                             weatherData.daily.weathercode
//                               ? weatherData.daily.weathercode[index]
//                               : 0
//                           )}
//                         </div>
//                         <div className="flex justify-between text-sm">
//                           <span className="text-red-500 font-bold">
//                             {weatherData.daily.temperature_2m_max[index]}°
//                           </span>
//                           <span className="text-blue-500 font-bold">
//                             {weatherData.daily.temperature_2m_min[index]}°
//                           </span>
//                         </div>
//                         <p className="text-xs mt-1 text-blue-600">
//                           Precip: {weatherData.daily.precipitation_sum[index]}mm
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Hourly Forecast Toggle */}
//               <div className="text-center">
//                 <button
//                   onClick={() => setShowHourly(!showHourly)}
//                   className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
//                 >
//                   {showHourly
//                     ? "Hide Hourly Forecast"
//                     : "Show 24-Hour Forecast"}
//                 </button>
//               </div>

//               {/* Hourly Forecast */}
//               {showHourly && weatherData.hourly && (
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//                   <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
//                     <h3 className="text-xl font-semibold">24-Hour Forecast</h3>
//                   </div>
//                   <div className="p-4 overflow-x-auto custom-scroll-hide">
//                     <div className="flex space-x-4 pb-4">
//                       {weatherData.hourly.time
//                         .slice(0, 24)
//                         .map((time, index) => (
//                           <div
//                             key={index}
//                             className="flex-shrink-0 w-28 bg-blue-50 rounded-lg p-3 text-center"
//                           >
//                             <p className="font-medium text-blue-800">
//                               {new Date(time).toLocaleTimeString([], {
//                                 hour: "2-digit",
//                                 hour12: true,
//                               })}
//                             </p>
//                             <div className="my-2 flex justify-center">
//                               {getWeatherIcon(
//                                 weatherData.hourly.weathercode
//                                   ? weatherData.hourly.weathercode[index]
//                                   : 0
//                               )}
//                             </div>
//                             <p className="text-lg font-bold text-blue-800">
//                               {weatherData.hourly.temperature_2m[index]}°
//                             </p>
//                             <div className="flex justify-between text-xs mt-1">
//                               <span className="text-blue-600">
//                                 <span className="block">Rain</span>
//                                 {weatherData.hourly.precipitation[index]}mm
//                               </span>
//                               <span className="text-blue-600">
//                                 <span className="block">Wind</span>
//                                 {weatherData.hourly.wind_speed_10m[index]}km/h
//                               </span>
//                             </div>
//                           </div>
//                         ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

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

            {/* Hourly Forecast */}
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
