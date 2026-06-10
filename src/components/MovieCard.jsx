import { Link } from "react-router-dom";

const MovieCard = ({ id, title, image }) => {
  return (
    <Link to={`/movie/${id}`} className="movie-link">
      <div className="poster-card">
        <img src={image} alt={title} className="poster-image" />
      </div>
    </Link>
  );
};

export default MovieCard;
