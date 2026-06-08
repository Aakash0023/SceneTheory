import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BsBookmarkPlus } from "react-icons/bs";
import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchSimilarMovies,
} from "../api/tmdb";
import SimilarMovies from "../components/SimilarMovies";
import TrailerModal from "../components/TrailerModal";
import { Link } from "react-router-dom";
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
        <button className="primary-btn" onClick={() => setShowTrailer(true)}>
          ▶ Watch Trailer
        </button>
        <button className="secondary-btn" onClick={addToWatchlist}>
          <BsBookmarkPlus /> Add to Watchlist
        </button>
        <Link to={`/movie/${movieId}/quiz`} className="secondary-btn">
          🧠 Start Quiz
        </Link>

        <TrailerModal
          trailerUrl={showTrailer ? trailerUrl : ""}
          onClose={() => setShowTrailer(false)}
        />
      </div>
      <SimilarMovies movies={similarMovies} />
    </div>
  );
};

export default MovieDetails;
