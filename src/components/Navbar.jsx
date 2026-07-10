import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiUser3Line,
  RiLogoutBoxLine,
  RiSettings3Line,
  RiBookmark3Line,
  RiArrowDownSLine,
} from "react-icons/ri";

import SearchBar from "./SearchBar";

const Navbar = ({ onSearch, genres, onGenreSelect }) => {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [showGenres, setShowGenres] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [streak, setStreak] = useState(0);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const updateNavbar = () => {
      setStreak(Number(localStorage.getItem("cineStreak")) || 0);

      setUser(JSON.parse(localStorage.getItem("user")));

      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    updateNavbar();

    window.addEventListener("storage", updateNavbar);

    window.addEventListener("streakUpdated", updateNavbar);

    return () => {
      window.removeEventListener("storage", updateNavbar);

      window.removeEventListener("streakUpdated", updateNavbar);
    };
  }, []);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setShowMenu(false);

    setIsLoggedIn(false);

    navigate("/login");
  };
  return (
    <nav className="navbar">
      {/* =========================
        LOGO
    ========================= */}

      <Link to="/" className="logo" style={{ textDecoration: "none" }}>
        <div className="logo-icon">ST</div>

        <h2>
          Scene<span>Theory</span>
        </h2>
      </Link>

      {/* =========================
        NAV LINKS
    ========================= */}

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

      {/* =========================
        SEARCH
    ========================= */}

      <SearchBar
        onSearch={onSearch}
        genres={genres}
        onGenreSelect={onGenreSelect}
      />

      {/* =========================
        STREAK
    ========================= */}

      <div className="streak-badge">🔥 {streak} Day Streak</div>

      {/* =========================
        USER MENU
    ========================= */}

      {!isLoggedIn ? (
        <Link to="/signup" className="signup-btn">
          Sign Up
        </Link>
      ) : (
        <div className="profile-menu" ref={dropdownRef}>
          <button
            className="profile-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="navbar-avatar" />
            ) : (
              <div className="navbar-avatar-placeholder">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <RiArrowDownSLine className={`arrow ${showMenu ? "rotate" : ""}`} />
          </button>
          <AnimatePresence>
            {showMenu && (
              <motion.div
                className="profile-dropdown"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-header">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="dropdown-avatar"
                    />
                  ) : (
                    <div className="dropdown-avatar-placeholder">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}

                  <div>
                    <h4>{user?.username || "Movie Lover"}</h4>
                    <p>Cinephile</p>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <Link
                  to="/profile"
                  className="dropdown-item"
                  onClick={() => setShowMenu(false)}
                >
                  <RiUser3Line />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/watchlist"
                  className="dropdown-item"
                  onClick={() => setShowMenu(false)}
                >
                  <RiBookmark3Line />
                  <span>My Watchlist</span>
                </Link>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout-btn" onClick={logout}>
                  <RiLogoutBoxLine />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
