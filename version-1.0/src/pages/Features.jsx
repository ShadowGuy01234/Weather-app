/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import {
  FaMobileAlt,
  FaBell,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaChartLine,
} from "react-icons/fa";

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
    transition: { duration: 0.5 },
  },
};

const cardVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
  },
};

function Features() {
  const features = [
    {
      icon: <WiDaySunny className="text-5xl text-yellow-400" />,
      title: "Accurate Forecasts",
      description:
        "Get precise weather predictions with our advanced algorithms.",
    },
    {
      icon: <FaMobileAlt className="text-5xl text-blue-400" />,
      title: "Responsive Design",
      description: "Access weather info seamlessly across all your devices.",
    },
    {
      icon: <WiRain className="text-5xl text-blue-600" />,
      title: "Precipitation Alerts",
      description: "Receive timely notifications about rain or snow.",
    },
    {
      icon: <FaBell className="text-5xl text-orange-400" />,
      title: "Custom Alerts",
      description: "Set up personalized weather alerts.",
    },
    {
      icon: <FaMapMarkerAlt className="text-5xl text-red-400" />,
      title: "Location-Based",
      description: "Automatic detection of your location.",
    },
    {
      icon: <FaGlobeAmericas className="text-5xl text-green-400" />,
      title: "Global Coverage",
      description: "Access weather data for any location worldwide.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            WeatherPro Features
          </h1>
          <p className="text-xl text-blue-600 max-w-3xl mx-auto">
            Discover all the powerful features that make WeatherPro your go-to
            weather app
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                ...itemVariants,
                hover: cardVariants.hover,
              }}
              className="bg-white rounded-xl shadow-lg overflow-hidden p-6 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-blue-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white"
          >
            <h2 className="text-2xl font-bold">Advanced Analytics</h2>
            <p>Detailed weather metrics for professionals and enthusiasts</p>
          </motion.div>
          <motion.div
            variants={containerVariants}
            className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className="bg-blue-50 rounded-lg p-6"
            >
              <div className="flex items-center mb-4">
                <FaChartLine className="text-blue-600 text-2xl mr-3" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Weather Trends
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <WiDaySunny className="text-blue-500 text-xl mr-2 mt-1" />
                  <span>Historical weather patterns</span>
                </li>
                <li className="flex items-start">
                  <WiRain className="text-blue-500 text-xl mr-2 mt-1" />
                  <span>Precipitation probability charts</span>
                </li>
                <li className="flex items-start">
                  <WiCloudy className="text-blue-500 text-xl mr-2 mt-1" />
                  <span>Cloud cover analysis</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-blue-50 rounded-lg p-6"
            >
              <div className="flex items-center mb-4">
                <WiThunderstorm className="text-blue-600 text-2xl mr-3" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Severe Weather
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <WiThunderstorm className="text-blue-500 text-xl mr-2 mt-1" />
                  <span>Storm tracking and alerts</span>
                </li>
                <li className="flex items-start">
                  <WiSnow className="text-blue-500 text-xl mr-2 mt-1" />
                  <span>Winter weather advisories</span>
                </li>
                <li className="flex items-start">
                  <FaBell className="text-blue-500 text-xl mr-2 mt-1" />
                  <span>Custom alert thresholds</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Features;
