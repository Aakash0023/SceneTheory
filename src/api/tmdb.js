const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
};
