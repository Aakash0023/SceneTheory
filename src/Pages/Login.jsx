import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Welcome Back</h1>

        <p>Continue your cinematic journey with SceneTheory.</p>

        <form className="signup-form">
          <input type="email" placeholder="Email Address" />

          <input type="password" placeholder="Password" />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
