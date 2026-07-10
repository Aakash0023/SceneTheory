import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import API from "../api/auth";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    try {
      const res = await API.get("/watchlist");
      setWatchlist(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load watchlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const removeMovie = async (movieId) => {
    try {
      await API.delete(`/watchlist/${movieId}`);

      setWatchlist((prev) => prev.filter((movie) => movie.movieId !== movieId));
    } catch (error) {
      console.error(error);
      alert("Failed to remove movie");
    }
  };

  if (loading) {
    return (
      <div className="watchlist-page">
        <div className="watchlist-header">
          <h1>Loading Watchlist...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div className="watchlist-header">
        <p className="section-eyebrow">PERSONAL COLLECTION</p>

        <div className="watchlist-logo">
          <div className="logo-icon">ST</div>

          <h2>
            Scene<span>Theory</span>
          </h2>
        </div>

        <h1>My Watchlist</h1>

        <p>
          {watchlist.length} Saved Movie
          {watchlist.length !== 1 ? "s" : ""}
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="watchlist-empty">
          <div className="empty-icon">🎬</div>

          <h2>No Movies In Your Watchlist Yet</h2>

          <p>
            Start building your personal movie collection and never lose track
            of what you want to watch.
          </p>

          <Link to="/" className="watchlist-discover-btn">
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <div key={movie.movieId} className="watchlist-card">
              <Link to={`/movie/${movie.movieId}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="watchlist-poster"
                />

                <div className="watchlist-overlay">
                  <h3>{movie.title}</h3>

                  <p>{movie.release_date?.split("-")[0]}</p>
                </div>
              </Link>

              <button
                className="watchlist-remove-btn"
                onClick={() => removeMovie(movie.movieId)}
              >
                <FaTrash />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
