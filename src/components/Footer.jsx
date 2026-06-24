import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <h2>
          Scene<span>Theory</span>
        </h2>

        <p>Discover films. Challenge yourself. Connect with cinema lovers.</p>
      </div>

      <div className="footer-links">
        <h3>Explore</h3>

        <ul>
          <li>
            <Link to="/">Discover</Link>
          </li>

          <li>
            <Link to="/movie/157336/quiz">Quizzes</Link>
          </li>

          <li>
            <Link to="/community">Community</Link>
          </li>

          <li>
            <Link to="/watchlist">Watchlists</Link>
          </li>
        </ul>
      </div>

      <div className="footer-links">
        <h3>Account</h3>

        <ul>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>

          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>

      <p className="footer-bottom">Where every scene sparks a theory.</p>
    </footer>
  );
};

export default Footer;
