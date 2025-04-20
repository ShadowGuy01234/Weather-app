/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import useWeather from "../hooks/useWeather";

function SearchInput({ city, setCity, handleSubmit, loading }) {
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div className="flex gap-3 " whileHover={{ scale: 1.01 }}>
        <motion.input
          whileFocus={{
            boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)",
          }}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full px-6 py-4 rounded-xl border-2 border-blue-200 focus:outline-none focus:border-blue-400 shadow-lg"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 max-w-max bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}

export default SearchInput;
