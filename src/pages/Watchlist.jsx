import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("watchlist")) || [];

    setWatchlist(savedMovies);
  }, []);

  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);

    setWatchlist(updatedWatchlist);

    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="watchlist-page">
      <h1>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <div className="trending-grid">
          {watchlist.map((movie) => (
            <div key={movie.id} style={{ position: "relative" }}>
              <Link to={`/movie/${movie.id}`} className="movie-link">
                <div className="poster-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="poster-image"
                  />
                </div>
              </Link>

              <div className="remove-container">
                <button
                  onClick={() => removeFromWatchlist(movie.id)}
                  className="remove-btn"
                >
                  🗑
                </button>

                <span className="tooltip">Remove from Watchlist</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
