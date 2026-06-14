import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrendingMovies from "../components/TrendingMovies";
import SearchResults from "../components/SearchResults";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Community from "../components/Community";
import Watchlists from "../components/Watchlists";

import { useEffect, useState } from "react";

import {
  fetchTrendingMovies,
  searchMovies,
  fetchGenres,
  fetchMoviesByGenre,
} from "../api/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    document.body.className = theme;

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const loadData = async () => {
      const trending = await fetchTrendingMovies();
      setMovies(trending);

      const genreData = await fetchGenres();
      setGenres(genreData);
    };

    loadData();
  }, []);

  const handleSearch = async (query) => {
    const data = await searchMovies(query);

    setSearchResults(data);

    setTimeout(() => {
      document
        .getElementById("search-results")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleGenreSelect = async (genreId) => {
    if (!genreId) {
      const trending = await fetchTrendingMovies();
      setMovies(trending);

      setTimeout(() => {
        document
          .querySelector(".trending-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return;
    }

    const filteredMovies = await fetchMoviesByGenre(genreId);

    setMovies(filteredMovies);

    setTimeout(() => {
      document
        .querySelector(".trending-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Navbar
        onSearch={handleSearch}
        genres={genres}
        onGenreSelect={handleGenreSelect}
        theme={theme}
        setTheme={setTheme}
      />

      <Hero />

      <TrendingMovies movies={movies} />

      <div id="search-results">
        <SearchResults movies={searchResults} />
      </div>

      <Features />

      <Watchlists />

      <Footer />
    </>
  );
};

export default Home;
