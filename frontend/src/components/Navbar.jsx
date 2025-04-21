
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Weather News", path: "/news" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-xl sticky top-0 z-50"
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="ml-2 text-white text-2xl font-bold">
                WeatherPro
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <div className="flex space-x-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="text-blue-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <a
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-800 focus:outline-none transition-all"
              >
                {mobileMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </a>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.path}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default Navbar;
