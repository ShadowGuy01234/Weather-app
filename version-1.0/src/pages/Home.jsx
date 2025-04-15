import React from "react";
import SearchInput from "../components/SearchInput";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
          <h2 className="text-2xl font-bold mb-4">Weather App</h2>
          <SearchInput />
        </div>
      </div>
    </>
  );
}

export default Home;
