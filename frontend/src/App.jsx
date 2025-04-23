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
import Navbar from "./components/Navbar";
import WeatherNewsPage from "./pages/WeatherNewsPage";
import Footer from "./components/Footer";
import WeatherChatbot from "./components/WeatherChatbot";

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
      <WeatherChatbot />
      <Footer />
    </Router>
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
      </Routes>
    </AnimatePresence>
  );
}

export default App;
