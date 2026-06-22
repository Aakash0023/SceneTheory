import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearch, genres, onGenreSelect }) => {
  const [showGenres, setShowGenres] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const updateNavbarStreak = () => {
      setStreak(Number(localStorage.getItem("cineStreak")) || 0);
    };

    updateNavbarStreak();

    window.addEventListener("streakUpdated", updateNavbarStreak);

    return () =>
      window.removeEventListener("streakUpdated", updateNavbarStreak);
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">ST</div>

        <h2>
          Scene<span>Theory</span>
        </h2>
      </div>

      <ul className="nav-links">
        <li>
          <a href="#discover">Discover</a>
        </li>

        <li>
          <a href="#quizzes">Quizzes</a>
        </li>

        <li>
          <Link to="/community">Community</Link>
        </li>

        <li className="genre-dropdown">
          <span onClick={() => setShowGenres(!showGenres)}>
            {showGenres ? "Genres ▲" : "Genres ▼"}
          </span>

          {showGenres && (
            <ul className="dropdown-menu">
              <li
                onClick={() => {
                  onGenreSelect(null);
                  setShowGenres(false);
                }}
              >
                All
              </li>

              {genres.map((genre) => (
                <li
                  key={genre.id}
                  onClick={() => {
                    onGenreSelect(genre.id);
                    setShowGenres(false);
                  }}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li>
          <Link to="/watchlist">Watchlist</Link>
        </li>
      </ul>

      <SearchBar
        onSearch={onSearch}
        genres={genres}
        onGenreSelect={onGenreSelect}
      />

      <div className="streak-badge">🔥 {streak} Day Streak</div>

      <Link to="/signup" className="signup-btn">
        Sign Up
      </Link>
    </nav>
  );
};

export default Navbar;
