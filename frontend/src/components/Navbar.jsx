import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, user, isAuthenticated } = useAuth();

  const publicNavItems = [
    { name: "Home", path: "/" },
  ];

  const privateNavItems = [
    { name: "News", path: "/news" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
  ];

  const authNavItems = isAuthenticated
    ? [
        ...publicNavItems,
        ...privateNavItems,
        {
          name: "Logout",
          path: "/login",
          onClick: () => {
            logout();
            window.location.href = "/login";
          },
        },
      ]
    : [
        ...publicNavItems,
        { name: "Login", path: "/login" },
      ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-700/90 to-blue-900/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-blue-600/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="ml-2 text-white text-2xl font-bold tracking-tight"
              >
                WeatherPro
              </motion.span>
            </div>

            {/* Welcome Message */}
            <div className="hidden lg:flex items-center">
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-1 rounded-full bg-blue-600/20 backdrop-blur-sm"
                >
                  <span className="text-white text-lg font-medium">
                    Welcome,{" "}
                    <span className="font-bold">{user.fullName || "User"}</span>
                  </span>
                </motion.div>
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              <div className="flex space-x-1">
                {authNavItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    onClick={item.onClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-blue-100 hover:text-white hover:bg-blue-600/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 focus:outline-none transition-all"
              >
                {mobileMenuOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-blue-600/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800/10 backdrop-blur-sm">
                {authNavItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.path}
                    onClick={item.onClick}
                    whileHover={{ x: 5 }}
                    className="block px-4 py-2 rounded-lg text-base font-medium text-blue-200 hover:text-white hover:bg-blue-700/50 transition-all"
                  >
                    {item.name}
                  </motion.a>
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
