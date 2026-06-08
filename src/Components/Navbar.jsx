import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearch, genres, onGenreSelect }) => {
  const [showGenres, setShowGenres] = useState(false);

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
          <a href="#community" onClick={() => console.log("Community clicked")}>
            Community
          </a>
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

      <SearchBar onSearch={onSearch} />

      <Link to="/signup" className="signup-btn">
        Sign Up
      </Link>
    </nav>
  );
};

export default Navbar;
