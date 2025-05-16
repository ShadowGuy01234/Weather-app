import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
  Navigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "./context/AuthContext";

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
    <AuthProvider>
      <Router>
        <LayoutWrapper>
          <AnimatedRoutes />
        </LayoutWrapper>
      </Router>
    </AuthProvider>
  );
}

// Optional: Hide Navbar/Footer/Chatbot on auth pages
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
      {!isAuthPage && <WeatherChatbot />}
      {!isAuthPage && <Footer />}
    </>
  );
}

// Add this ProtectedRoute component before the AnimatedRoutes component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/features"
          element={
            <ProtectedRoute>
              <Features />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <WeatherNewsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
