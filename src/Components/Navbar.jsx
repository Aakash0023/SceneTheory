import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
const Navbar = ({ onSearch }) => {
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

        <li>
          <a href="#watchlists">Watchlists</a>
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
