import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsBookmarkPlus } from "react-icons/bs";
import { motion } from "framer-motion";

import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchSimilarMovies,
} from "../api/tmdb";

import SimilarMovies from "../components/SimilarMovies";
import TrailerModal from "../components/TrailerModal";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const addToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.find((item) => item.id === movie.id);

    if (exists) {
      alert("Movie already in watchlist!");
      return;
    }

    watchlist.push(movie);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    alert("Added to Watchlist!");
  };

  useEffect(() => {
    const getMovie = async () => {
      const data = await fetchMovieDetails(movieId);
      setMovie(data);

      const videos = await fetchMovieTrailer(movieId);

      const similar = await fetchSimilarMovies(movieId);
      setSimilarMovies(similar.slice(0, 4));

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
    <div
      className="movie-details"
      style={{
        backgroundImage: `linear-gradient(
          rgba(5,5,5,0.85),
          rgba(5,5,5,0.95)
        ),
        url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <button className="secondary-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <motion.img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="details-poster"
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="details-content"
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>{movie.title}</h1>
        <div className="movie-meta">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>

          <span>🎬 {movie.genres?.map((g) => g.name).join(" • ")}</span>

          <span>⏱ {movie.runtime} min</span>

          <span>🌎 {movie.original_language?.toUpperCase()}</span>
        </div>

        <p className="movie-year">{movie.release_date}</p>

        <p className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}/10</p>

        <p className="movie-description">{movie.overview}</p>

        <div className="details-buttons">
          <button className="primary-btn" onClick={() => setShowTrailer(true)}>
            ▶ Watch Trailer
          </button>

          <button className="secondary-btn" onClick={addToWatchlist}>
            <BsBookmarkPlus />
            Add to Watchlist
          </button>

          <Link
            to={`/movie/${movieId}/quiz`}
            className="secondary-btn quiz-link"
          >
            🧠 Start Quiz
          </Link>
        </div>

        <TrailerModal
          trailerUrl={showTrailer ? trailerUrl : ""}
          onClose={() => setShowTrailer(false)}
        />
      </motion.div>

      <SimilarMovies movies={similarMovies} />
    </div>
  );
};

export default MovieDetails;
