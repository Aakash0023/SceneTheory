import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const searchMovies = async (query) => {
  if (!query) return [];

  const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return res.data.results;
};
