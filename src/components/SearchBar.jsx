import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { searchMovies, searchActors } from "../api/tmdb";

const SearchBar = ({ onSearch, genres, onGenreSelect }) => {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);
  const [genreResults, setGenreResults] = useState([]);
  const [actorResults, setActorResults] = useState([]);

  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setGenreResults([]);
        setActorResults([]);
        return;
      }

      try {
        const movies = await searchMovies(query);

        setResults(
          movies
            .filter((movie) => movie.poster_path)
            .filter((movie) => movie.vote_count > 50)
            .slice(0, 5)
        );

        const actors = await searchActors(query);

        setActorResults(
          actors
            .filter((actor) => actor.known_for_department === "Acting")
            .slice(0, 3)
        );

        const matchedGenres = genres.filter((genre) =>
          genre.name.toLowerCase().includes(query.toLowerCase())
        );

        setGenreResults(matchedGenres.slice(0, 3));
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
    setGenreResults([]);
    setActorResults([]);
  };

  return (
    <form className="navbar-search" onSubmit={handleSubmit}>
      <Search className="search-icon" size={18} />

      <input
        type="text"
        placeholder="Search movies, genres, actors..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {(results.length > 0 ||
        genreResults.length > 0 ||
        actorResults.length > 0) && (
        <div className="search-dropdown">
          <div className="search-tabs">
            <button
              type="button"
              className={searchType === "all" ? "active" : ""}
              onClick={() => setSearchType("all")}
            >
              All
            </button>

            <button
              type="button"
              className={searchType === "movies" ? "active" : ""}
              onClick={() => setSearchType("movies")}
            >
              Movies
            </button>

            <button
              type="button"
              className={searchType === "actors" ? "active" : ""}
              onClick={() => setSearchType("actors")}
            >
              Actors
            </button>

            <button
              type="button"
              className={searchType === "genres" ? "active" : ""}
              onClick={() => setSearchType("genres")}
            >
              Genres
            </button>
          </div>

          {(searchType === "all" || searchType === "actors") &&
            actorResults.length > 0 && (
              <>
                <div className="search-section-title">Actors</div>

                {actorResults.map((actor) => (
                  <Link
                    key={actor.id}
                    to={`/actor/${actor.id}`}
                    className="search-item actor-item"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w92${actor.profile_path}`
                          : "https://placehold.co/92x92"
                      }
                      alt={actor.name}
                      className="actor-avatar"
                    />

                    <div className="search-item-content">
                      <h4>{actor.name}</h4>

                      <span className="search-year">Actor</span>
                    </div>
                  </Link>
                ))}
              </>
            )}

          {(searchType === "all" || searchType === "genres") &&
            genreResults.length > 0 && (
              <>
                <div className="search-section-title">Genres</div>

                {genreResults.map((genre) => (
                  <div
                    key={genre.id}
                    className="search-item genre-item"
                    onClick={() => {
                      onGenreSelect(genre.id);

                      setQuery("");

                      setResults([]);
                      setGenreResults([]);
                      setActorResults([]);
                    }}
                  >
                    🔥 {genre.name}
                  </div>
                ))}
              </>
            )}

          {(searchType === "all" || searchType === "movies") &&
            results.length > 0 && (
              <>
                <div className="search-section-title">Movies</div>

                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="search-item"
                    onClick={() => {
                      setQuery("");
                      setResults([]);
                      setGenreResults([]);
                      setActorResults([]);
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
              </>
            )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
