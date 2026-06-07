import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/movies";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = movies.find(
    (m) => m.title.toLowerCase().replace(/\s+/g, "-") === movieId
  );

  if (!movie) {
    return <h1>Movie not found</h1>;
  }

  return (
    <div className="movie-details">
      <button className="secondary-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <img src={movie.image} alt={movie.title} className="details-poster" />

      <div className="details-content">
        <h1>{movie.title}</h1>

        <p className="movie-year">{movie.year}</p>
        <p className="movie-rating">⭐ {movie.rating}/10</p>

        <p className="movie-description">{movie.description}</p>

        <button className="primary-btn">Watch Trailer</button>
      </div>
    </div>
  );
};

export default MovieDetails;
