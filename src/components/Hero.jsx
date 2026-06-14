import { useState } from "react";
import MovieCard from "./MovieCard";
import movies from "../data/movies";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { IoFilmOutline } from "react-icons/io5";

const Hero = () => {
  const [showTrailer, setShowTrailer] = useState(false);

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
          className="hero-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
          }}
        >
          <button className="primary-btn">
            <IoFilmOutline />
            Start Exploring
          </button>

          <button
            className="secondary-btn"
            onClick={() => setShowTrailer(true)}
          >
            <FaPlay />
            Watch Trailer
          </button>
        </motion.div>
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
        <div className="poster-grid">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <MovieCard
                id={movie.id}
                title={movie.title}
                image={movie.image}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {showTrailer && (
        <div className="modal-overlay" onClick={() => setShowTrailer(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowTrailer(false)}
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="500"
              src="https://www.youtube.com/embed/zSWdZVtXT7E"
              title="Interstellar Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
