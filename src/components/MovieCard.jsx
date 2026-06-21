import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieCard = ({ id, title, image }) => {
  return (
    <Link to={`/movie/${id}`} className="movie-link">
      <motion.div
        className="poster-card"
        whileHover={{
          y: -10,
          scale: 1.05,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        <img src={image} alt={title} className="poster-image" />

        <div className="poster-overlay">
          <span>🎬 View Details</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default MovieCard;
