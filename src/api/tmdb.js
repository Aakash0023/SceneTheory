const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();

  return data.results;
};

export const searchActors = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`
  );

  const data = await response.json();

  return data.results || [];
};

export const fetchMovieTrailer = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
};

export const fetchSimilarMovies = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.results;
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.genres;
};

export const fetchMoviesByGenre = async (genreId) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
  );

  const data = await response.json();

  return data.results;
};
export const fetchActorDetails = async (actorId) => {
  const response = await fetch(
    `${BASE_URL}/person/${actorId}?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data;
};
export const fetchActorMovies = async (actorId) => {
  const response = await fetch(
    `${BASE_URL}/person/${actorId}/movie_credits?api_key=${API_KEY}`
  );

  const data = await response.json();

  return data.cast || [];
};
