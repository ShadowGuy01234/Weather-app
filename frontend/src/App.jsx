import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import WeatherNewsPage from "./pages/WeatherNewsPage";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WeatherChatbot from "./components/WeatherChatbot";

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <AnimatedRoutes />
      </LayoutWrapper>
    </Router>
  );
}

// Optional: Hide Navbar/Footer/Chatbot on auth pages
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <WeatherChatbot />}
      {!isAuthPage && <Footer />}
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/news" element={<WeatherNewsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
