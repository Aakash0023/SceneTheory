import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { fetchTrendingMovies } from "../api/tmdb";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };

    getMovies();
  }, []);

  return (
    <section className="trending-section">
      <div className="section-header">
        <p className="section-eyebrow">What's trending</p>

        <h2 className="section-title">Trending Movies</h2>
      </div>

      <div className="trending-grid">
        {movies.map((movie) => (
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

export default TrendingMovies;
