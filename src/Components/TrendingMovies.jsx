import MovieCard from "./MovieCard";

const TrendingMovies = ({ movies = [] }) => {
  const filteredMovies = movies.filter((movie) => movie.poster_path);

  return (
    <section className="trending-section">
      <div className="section-header">
        <p className="section-eyebrow">What's Trending</p>

        <h2 className="section-title">Trending Movies</h2>
      </div>

      <div className="movie-slider">
        <div className="movie-track">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}

          {filteredMovies.map((movie) => (
            <MovieCard
              key={`duplicate-${movie.id}`}
              id={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingMovies;
