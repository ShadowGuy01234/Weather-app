import React from "react";
import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-6 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex items-center mb-4 md:mb-0">
          <WiDaySunny className="h-6 w-6 text-yellow-300 mr-2" />
          <span className="text-sm">
            © {new Date().getFullYear()} WeatherPro
          </span>
        </div>

        
        <div className="flex space-x-6">
          <a
            href="https://github.com/ShadowGuy01234/Weather-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
