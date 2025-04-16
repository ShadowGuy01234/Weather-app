import React from "react";

function SearchInput() {
  return (
    <form>
      <input
        type="text"
        placeholder="Enter city name"
        className="border border-gray-300 rounded-lg p-2 w-full mb-4"
      />
      <button className="bg-blue-500 text-white rounded-lg py-2 px-4 w-full">
        Get Weather
      </button>
    </form>
  );
}

export default SearchInput;
