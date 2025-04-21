import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WiDaySunny, WiRain } from "react-icons/wi";
import { FaTimes } from "react-icons/fa";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { GoogleGenerativeAI } from "@google/generative-ai";

const WeatherChatbot = () => {
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your professional weather assistant powered by Gemini. Ask me about forecasts, severe weather alerts, or climate trends.",
      sender: "bot",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { id: Date.now(), text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const prompt = `As a professional weather assistant, provide a concise, accurate response to this weather-related query: "${message}". 
      If it's not weather-related, politely explain you specialize in weather information.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: text,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "I'm experiencing technical difficulties. Please try again shortly.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action a */}
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-600 to-blue-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        aria-label={
          isOpen ? "Close weather assistant" : "Open weather assistant"
        }
      >
        {isOpen ? (
          <FaTimes className="h-5 w-5" />
        ) : (
          <MdOutlineMarkChatRead className="h-5 w-5" />
        )}
      </motion.a>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-6 z-40 w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
            style={{
              maxHeight: "calc(100vh - 120px)",
              width: "calc(100% - 48px)",
              maxWidth: "420px",
            }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-4 py-3 text-white flex items-center">
              <div className="flex items-center">
                <WiDaySunny className="h-5 w-5 mr-2" />
                <h3 className="font-medium text-sm">Weather Assistant</h3>
                <span className="ml-2 bg-blue-800 text-white text-xs px-2 py-0.5 rounded-full">
                  Gemini Flash
                </span>
              </div>
              <a
                onClick={() => setIsOpen(false)}
                className="ml-auto text-white hover:text-blue-200 focus:outline-none p-1 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Close chat"
              >
                <FaTimes className="h-4 w-4" />
              </a>
            </div>

            {/* Chat Messages */}
            <div
              className="h-72 p-4 overflow-y-auto bg-gray-50"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`mb-3 flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow-xs border border-gray-100"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="bg-white text-gray-800 rounded-bl-none shadow-xs border border-gray-100 px-3 py-2 rounded-lg max-w-[85%]">
                    <div className="flex space-x-1.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-200 bg-white"
            >
              <div className="flex items-center lg:rounded-lg bg-gray-100 shadow-sm">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about weather..."
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm "
                  disabled={isLoading}
                />
                <a
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="bg-blue-600 text-white mx-1 p-3 rounded-r-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <IoMdSend className="h-4 w-4" />
                </a>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeatherChatbot;
