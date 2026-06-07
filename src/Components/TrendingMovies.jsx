import MovieCard from "./MovieCard";
import movies from "../data/movies";

const TrendingMovies = () => {
  return (
    <section className="trending-section">
      <div className="section-header">
        <p className="section-eyebrow">What's trending</p>

        <h2 className="section-title">Trending Movies</h2>
      </div>

      <div className="trending-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            title={movie.title}
            year={movie.year}
            image={movie.image}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
