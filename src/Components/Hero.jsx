import MovieCard from "./MovieCard";
import movies from "../data/movies";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-eyebrow">Where every frame tells a story</p>

        <h1 className="hero-title">
          Film lives
          <br />
          beyond the
          <br />
          <span className="shimmer-text">credits.</span>
        </h1>

        <p className="hero-description">
          Discover films curated for you. Challenge yourself with quizzes.
          Connect with a community that lives and breathes cinema.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Start Exploring</button>

          <button className="secondary-btn">Watch Trailer</button>
        </div>

        <div className="hero-stats">
          <div className="stat">
            <h3>48K+</h3>
            <p>Films</p>
          </div>

          <div className="stat">
            <h3>1.2M</h3>
            <p>Members</p>
          </div>

          <div className="stat">
            <h3>9400</h3>
            <p>Quizzes</p>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="poster-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.title}
              title={movie.title}
              year={movie.year}
              image={movie.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
