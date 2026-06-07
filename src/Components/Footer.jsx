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
          <li>Discover</li>
          <li>Quizzes</li>
          <li>Community</li>
          <li>Watchlists</li>
        </ul>
      </div>

      <div className="footer-links">
        <h3>Account</h3>

        <ul>
          <li>Sign Up</li>
          <li>Login</li>
          <li>Profile</li>
        </ul>
      </div>
      <p className="footer-bottom">Where every scene sparks a theory.</p>
    </footer>
  );
};

export default Footer;
