import { Link } from "react-router-dom";

const MovieCard = ({ title, year, image }) => {
  return (
    <Link
      to={`/movie/${title.toLowerCase().replace(/\s+/g, "-")}`}
      className="movie-link"
    >
      <div className="poster-card">
        <img src={image} alt={title} className="poster-image" />
      </div>
    </Link>
  );
};

export default MovieCard;
