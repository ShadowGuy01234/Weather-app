import React from "react";
import { useState } from "react";
import axios from "axios";

function SearchInput() {
  const [city, setCity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:5174/api/weather`, {
        params: { city },
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error getting Weather data", err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full"
      >
        Get Weather
      </button>
    </form>
  );
}

export default SearchInput;
