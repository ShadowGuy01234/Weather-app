import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://weather-app-backend-774123782107.us-central1.run.app/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Sign-in failed");
        console.error("Sign-in failed:", data.error);
      } else {
        login(data.user, data.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Error during sign-in request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 w-full max-w-md border border-blue-100"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">☁️</div>
          <h1 className="text-3xl font-bold text-blue-700">WeatherPro</h1>
          <p className="text-gray-600 mt-2">Your accurate weather companion</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4"
          >
            <p className="flex items-center">
              <span className="mr-2">❌</span>
              {error}
            </p>
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-200
                ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>
          </div>
        </form>
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
