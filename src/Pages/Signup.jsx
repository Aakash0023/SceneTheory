const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Join SceneTheory</h1>

        <p>Discover films. Test your knowledge. Connect with cinema lovers.</p>

        <form className="signup-form">
          <input type="text" placeholder="Full Name" />

          <input type="email" placeholder="Email Address" />

          <input type="password" placeholder="Password" />

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
