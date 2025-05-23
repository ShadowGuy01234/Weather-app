import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WiRain, WiDaySunny, WiSnow, WiThunderstorm } from "react-icons/wi";
import { FiArrowRight } from "react-icons/fi";

const WeatherNewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const newsCategories = [
    { id: "all", name: "All News" },
    { id: "launches", name: "Launches" },
    { id: "missions", name: "Missions" },
    { id: "research", name: "Research" },
    { id: "events", name: "Space Events" },
  ];

  const categoryIcons = {
    launches: <WiThunderstorm className="text-4xl text-purple-500" />,
    missions: <WiSnow className="text-4xl text-blue-200" />,
    research: <WiDaySunny className="text-4xl text-blue-400" />,
    events: <WiRain className="text-4xl text-blue-600" />,
  };

  const fetchNews = async (category = "all", offset = 0, append = false) => {
    if (!append) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const baseUrl = "https://api.spaceflightnewsapi.net/v4/articles/";
      const url = new URL(baseUrl);
      url.searchParams.append("limit", 10);
      url.searchParams.append("offset", offset);

      if (category !== "all") {
        url.searchParams.append("title_contains", category);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();

      // Map API response to match your article structure
      const articlesWithIcons = data.results.map((article) => ({
        id: article.id,
        title: article.title,
        excerpt: article.summary,
        image: article.image_url || "https://via.placeholder.com/150",
        url: article.url,
        date: new Date(article.published_at).toLocaleDateString(),
        category:
          category === "all" ? getPseudoCategory(article.title) : category,
        icon: categoryIcons[
          category === "all" ? getPseudoCategory(article.title) : category
        ],
      }));

      if (append) {
        setNewsArticles((prev) => [...prev, ...articlesWithIcons]);
      } else {
        setNewsArticles(articlesWithIcons);
      }

      // Check if there are more articles to load
      setHasMore(!!data.next);
      setPage(offset + 10); // Increment offset for next page
    } catch (err) {
      setError("Failed to load news articles. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Helper function to assign a pseudo-category based on article title
  const getPseudoCategory = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("launch")) return "launches";
    if (titleLower.includes("mission")) return "missions";
    if (titleLower.includes("research") || titleLower.includes("study"))
      return "research";
    return "events";
  };

  useEffect(() => {
    fetchNews("all", 0);
  }, []);

  useEffect(() => {
    setNewsArticles([]);
    setPage(0);
    setHasMore(true);
    fetchNews(activeCategory, 0);
  }, [activeCategory]);

  useEffect(() => {
    if (!hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNews(activeCategory, page, true);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [activeCategory, hasMore, loading, loadingMore, page]);

  const filteredNews =
    activeCategory === "all"
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-600 mb-3">
            News
          </h1>
          <p className="text-blue-600 text-lg">
            Stay updated with the latest space events and research
          </p>
        </motion.header>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {newsCategories.map((category) => (
            <motion.a
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              }`}
            >
              {category.name}
            </motion.a>
          ))}
        </motion.div>

        {loading && (
          <motion.div
            className="text-center text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading news articles...
          </motion.div>
        )}
        {error && (
          <motion.div
            className="text-center text-red-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence>
              {filteredNews.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                  }}
                  className="bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100 min-h-[300px] flex flex-col"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start mb-4">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-22 h-22 object-cover rounded-lg mr-4"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/150")
                        }
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
                            {article.category.toUpperCase()}
                          </span>
                          <div className="flex items-center">
                            {article.icon}
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-blue-800 mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-blue-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-sm text-blue-400">
                        {article.date}
                      </span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center group focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        Read more
                        <FiArrowRight className="ml-1 transform transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {loadingMore && (
          <motion.div
            className="text-center text-blue-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Loading more articles...
          </motion.div>
        )}
        {!hasMore && !loading && !loadingMore && filteredNews.length > 0 && (
          <motion.div
            className="text-center text-blue-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No more articles to load.
          </motion.div>
        )}
        <div ref={observerRef} className="h-10" />
      </div>
    </motion.div>
  );
};

export default WeatherNewsPage;
