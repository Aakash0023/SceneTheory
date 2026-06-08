import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrendingMovies from "../components/TrendingMovies";
import SearchResults from "../components/SearchResults";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Community from "../components/Community";
import Watchlists from "../components/Watchlists";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, searchMovies } from "../api/tmdb";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getTrending = async () => {
      const data = await fetchTrendingMovies();
      setMovies(data);
    };

    getTrending();
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

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <Hero />

      <TrendingMovies movies={movies} />

      <div id="search-results">
        <SearchResults movies={searchResults} />
      </div>

      <Features />

      <Community />

      <Watchlists />

      <Footer />
    </>
  );
};

export default Home;
