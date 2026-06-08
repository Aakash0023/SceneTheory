import MovieCard from "./MovieCard";

const SearchResults = ({ movies = [] }) => {
  if (!movies.length) return null;

  return (
    <section className="trending-section">
      <div className="section-header">
        <p className="section-eyebrow">Search Results</p>

        <h2 className="section-title">{movies.length} Movies Found</h2>
      </div>

      <div className="trending-grid">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
      </div>
    </section>
  );
};

export default SearchResults;
