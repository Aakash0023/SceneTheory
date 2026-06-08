import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);
    };

    getMovie();
  }, [movieId]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="movie-details">
      <button className="secondary-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="details-poster"
      />

      <div className="details-content">
        <h1>{movie.title}</h1>

        <p className="movie-year">{movie.release_date}</p>

        <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}/10</p>

        <p className="movie-description">{movie.overview}</p>

        <button className="primary-btn">Watch Trailer</button>
      </div>
    </div>
  );
};

export default MovieDetails;
