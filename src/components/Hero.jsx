import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import movies from "../data/movies";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [currentMovie, setCurrentMovie] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  return (
    <section id="discover" className="hero">
      <div className="hero-left">
        <motion.p
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Where every frame tells a story
        </motion.p>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
        >
          Film lives
          <br />
          beyond the
          <br />
          <span className="shimmer-text">credits.</span>
        </motion.h1>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
        >
          Discover films curated for you. Challenge yourself with quizzes.
          Connect with a community that lives and breathes cinema.
        </motion.p>
        <motion.div
          className="hero-highlights"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="highlight-item">
            <span>🎬</span>
            <p>500+ Movies</p>
          </div>

          <div className="highlight-item">
            <span>🧠</span>
            <p>AI Quizzes</p>
          </div>

          <div className="highlight-item">
            <span>👥</span>
            <p>Cine Community</p>
          </div>
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
        ></motion.div>
      </div>

      <motion.div
        className="hero-right"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.4,
        }}
      >
        <motion.div
          className="hero-right"
          key={movies[currentMovie].id}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="featured-card">
            <img
              src={movies[currentMovie].image}
              alt={movies[currentMovie].title}
              className="featured-image"
            />

            <div className="featured-content">
              <p className="featured-label">FEATURED MOVIE</p>

              <h2>{movies[currentMovie].title}</h2>

              <div className="featured-meta">
                <span>⭐ {movies[currentMovie].rating}</span>
                <span>{movies[currentMovie].year}</span>
              </div>

              <p>{movies[currentMovie].description}</p>

              <button
                className="primary-btn"
                onClick={() => navigate(`/movie/${movies[currentMovie].id}`)}
              >
                View Details →
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
