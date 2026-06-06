const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">
        Scene<span>Theory</span>
      </h1>

      <ul className="nav-links">
        <li>Discover</li>
        <li>Quizzes</li>
        <li>Community</li>
        <li>Lists</li>
      </ul>

      <button className="signup-btn">Sign Up</button>
    </nav>
  );
};

export default Navbar;
