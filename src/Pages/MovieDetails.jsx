import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovieTrailer } from "../api/tmdb";
const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);

      const videos = await fetchMovieTrailer(movieId);

      const trailer = videos?.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
      }
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

        <a
          href={trailerUrl}
          target="_blank"
          rel="noreferrer"
          className="primary-btn"
        >
          ▶ Watch Trailer
        </a>
      </div>
    </div>
  );
};

export default MovieDetails;
