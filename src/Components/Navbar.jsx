import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <div className="logo-icon">ST</div>

        <h2>
          Scene<span>Theory</span>
        </h2>
      </div>

      <ul className="nav-links">
        <li>Discover</li>
        <li>Quizzes</li>
        <li>Community</li>
        <li>Lists</li>
      </ul>

      <Link to="/signup" className="signup-btn">
        Sign Up
      </Link>
    </nav>
  );
};

export default Navbar;
