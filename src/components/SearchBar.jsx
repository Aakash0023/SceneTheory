import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { searchMovies } from "../api/tmdb";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("Query:", query);

    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      const movies = await searchMovies(query);

      console.log("Movies:", movies);

      setResults(movies.slice(0, 5));
    };

    const timer = setTimeout(fetchResults, 300);

    return () => clearTimeout(timer);
  }, [query]);
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
        placeholder="Search movies, genres..."
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
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                    : "https://via.placeholder.com/92x138?text=No+Image"
                }
                alt={movie.title}
              />

              <div className="search-item-content">
                <h4>{movie.title}</h4>

                <p>
                  ⭐ {movie.vote_average?.toFixed(1)} •{" "}
                  {movie.release_date?.split("-")[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
