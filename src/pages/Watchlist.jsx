import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("watchlist")) || [];

    setWatchlist(savedMovies);
  }, []);

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

        <h1>My List</h1>

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
            <div key={movie.id} className="watchlist-card">
              <Link to={`/movie/${movie.id}`}>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
