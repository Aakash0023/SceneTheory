import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { searchMovies, fetchMoviesByGenre } from "../api/tmdb";

const SearchBar = ({ onSearch, genres }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      try {
        const matchingGenre = genres.find((genre) =>
          genre.name.toLowerCase().includes(query.trim().toLowerCase())
        );

        let movies;

        if (matchingGenre) {
          movies = await fetchMoviesByGenre(matchingGenre.id);
        } else {
          movies = await searchMovies(query);
        }

        setResults(
          movies
            .filter((movie) => movie.poster_path)
            .filter((movie) => movie.vote_count > 50)
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Search Error:", error);
      }
    };

    const timer = setTimeout(fetchResults, 300);

    return () => clearTimeout(timer);
  }, [query, genres]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    onSearch(query);

    setResults([]);
  };

  return (
    <form className="navbar-search" onSubmit={handleSubmit}>
      <Search className="search-icon" size={18} />

      <input
        type="text"
        placeholder="Search Interstellar, Action, Crime..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 && (
        <div className="search-dropdown">
          {results.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="search-item"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="search-item-content">
                <h4>{movie.title}</h4>

                <span className="search-year">
                  {movie.release_date?.split("-")[0]}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
