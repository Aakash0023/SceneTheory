import MovieCard from "./MovieCard";
import movies from "../data/movies";
import { motion } from "framer-motion";

const Hero = () => {
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
          <button className="primary-btn">Start Exploring</button>

          <button className="secondary-btn">Watch Trailer</button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.1,
          }}
        >
          <div className="stat">
            <h3>48K+</h3>
            <p>Films</p>
          </div>

          <div className="stat">
            <h3>1.2M</h3>
            <p>Members</p>
          </div>

          <div className="stat">
            <h3>9400</h3>
            <p>Quizzes</p>
          </div>
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
    </section>
  );
};

export default Hero;
