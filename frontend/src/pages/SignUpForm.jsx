import React from "react";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
      <div className="text-center mb-6">
        <img src="/cloud-rain-icon.png" alt="Weather Icon" className="mx-auto mb-4 w-20" />
        <h2 className="text-2xl font-bold text-blue-800">Create your WeatherWise account</h2>
      </div>
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="password" placeholder="Password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">Sign Up</button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account? <Link to="/" className="text-blue-600 hover:underline">Login</Link>
      </p>
    </div>
  );
}
