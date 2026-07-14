import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiUser3Line,
  RiLogoutBoxLine,
  RiSettings3Line,
  RiBookmark3Line,
  RiArrowDownSLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

import SearchBar from "./SearchBar";

const Navbar = ({ onSearch, genres, onGenreSelect }) => {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const [showGenres, setShowGenres] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showMobileMenu]);

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
        NAV LINKS (desktop)
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

        <li>
          <Link to="/people">People</Link>
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
        SEARCH (desktop)
    ========================= */}

      <div className="navbar-search-wrap">
        <SearchBar
          onSearch={onSearch}
          genres={genres}
          onGenreSelect={onGenreSelect}
        />
      </div>

      {/* =========================
        STREAK
    ========================= */}

      <div className="streak-badge">🔥 {streak} Day Streak</div>

      {/* =========================
        HAMBURGER (mobile only)
    ========================= */}

      <button
        className="hamburger-btn"
        aria-label={showMobileMenu ? "Close menu" : "Open menu"}
        aria-expanded={showMobileMenu}
        onClick={() => setShowMobileMenu((prev) => !prev)}
      >
        {showMobileMenu ? <RiCloseLine /> : <RiMenuLine />}
      </button>

      {/* =========================
        MOBILE MENU DRAWER
    ========================= */}

      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowMobileMenu(false)}
            />

            <motion.div
              className="mobile-menu-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <div className="mobile-menu-search">
                <SearchBar
                  onSearch={onSearch}
                  genres={genres}
                  onGenreSelect={onGenreSelect}
                />
              </div>

              <ul className="mobile-nav-links">
                <li>
                  <a href="#discover" onClick={() => setShowMobileMenu(false)}>
                    Discover
                  </a>
                </li>
                <li>
                  <a href="#quizzes" onClick={() => setShowMobileMenu(false)}>
                    Quizzes
                  </a>
                </li>
                <li>
                  <Link
                    to="/community"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/people" onClick={() => setShowMobileMenu(false)}>
                    People
                  </Link>
                </li>
                <li>
                  <Link
                    to="/watchlist"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Watchlist
                  </Link>
                </li>
              </ul>

              <div className="mobile-menu-genres">
                <p className="mobile-menu-label">Genres</p>
                <div className="mobile-genre-chips">
                  <span
                    onClick={() => {
                      onGenreSelect(null);
                      setShowMobileMenu(false);
                    }}
                  >
                    All
                  </span>
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      onClick={() => {
                        onGenreSelect(genre.id);
                        setShowMobileMenu(false);
                      }}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mobile-menu-footer">
                <div className="streak-badge mobile-streak">
                  🔥 {streak} Day Streak
                </div>

                {!isLoggedIn ? (
                  <Link
                    to="/signup"
                    className="signup-btn"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <RiUser3Line />
                      <span>My Profile</span>
                    </Link>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={() => {
                        setShowMobileMenu(false);
                        logout();
                      }}
                    >
                      <RiLogoutBoxLine />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================
        USER MENU (desktop)
    ========================= */}

      {!isLoggedIn ? (
        <Link to="/signup" className="signup-btn desktop-only">
          Sign Up
        </Link>
      ) : (
        <div className="profile-menu desktop-only" ref={dropdownRef}>
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
