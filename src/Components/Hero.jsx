const Hero = () => {
  return (
    <section className="hero">
      <p className="hero-eyebrow">Where every frame tells a story</p>

      <h1 className="hero-title">
        Film lives
        <br />
        beyond the
        <br />
        <span>credits.</span>
      </h1>

      <p className="hero-description">
        Discover films curated for you. Challenge yourself with quizzes. Connect
        with a community that lives and breathes cinema.
      </p>

      <div className="hero-buttons">
        <button className="primary-btn">Start Exploring</button>

        <button className="secondary-btn">Watch Trailer</button>
      </div>
    </section>
  );
};

export default Hero;
