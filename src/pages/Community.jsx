import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiMovie2Line,
  RiTeamLine,
  RiFireLine,
  RiSendPlaneFill,
} from "react-icons/ri";

import PostCard from "../components/PostCard";
import "../styles/community.css";
import { searchMovies } from "../api/searchMovies";

function Community({ posts, setPosts }) {
  const [caption, setCaption] = useState("");
  const [movieRating, setMovieRating] = useState(5);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [preview, setPreview] = useState(null);

  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Reviews", "Theories", "Recommendations"];

  const publishPost = (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      alert("Write something first!");
      return;
    }

    const newPost = {
      id: Date.now(),
      username: "Aakash",
      avatar: "🎬",
      movieTitle: selectedMovie?.title || "",
      moviePoster: selectedMovie?.poster_path
        ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
        : "",
      movieId: selectedMovie?.id || "",
      movieYear: selectedMovie?.release_date
        ? selectedMovie.release_date.split("-")[0]
        : "",
      movieGenre: selectedMovie?.genre_ids || [],
      tmdbRating: selectedMovie?.vote_average || 0,
      movieOverview: selectedMovie?.overview || "",
      rating: movieRating,
      caption,
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));

    setCaption("");
    setSelectedMovie(null);
    setSearch("");
    setMovieRating(5);
    setPreview(null); //
  };

  const handleMovieSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    const movies = await searchMovies(value);
    setResults(movies.slice(0, 5));
  };

  return (
    <div className="community-page">
      <motion.section
        className="community-hero"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-eyebrow">CINECOMMUNITY</p>

        <h1 className="community-title">
          Join the <span>CineCommunity</span>
        </h1>

        <p className="community-subtitle">
          Share reviews, discuss fan theories, recommend hidden gems and connect
          with movie lovers around the world.
        </p>

        <div className="community-stats">
          <motion.div whileHover={{ y: -8 }} className="community-stat">
            <RiMovie2Line />
            <h3>{posts.length}</h3>
            <span>Movie Posts</span>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="community-stat">
            <RiTeamLine />
            <h3>10</h3>
            <span>Cinephiles</span>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="community-stat">
            <RiFireLine />
            <h3>5</h3>
            <span>Trending Today</span>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="create-post-inline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2>What's on your mind?</h2>
        <p>Share your latest review, recommendation or fan theory.</p>

        <form onSubmit={publishPost}>
          <div className="search-card">
            <p className="input-heading">SEARCH A MOVIE</p>

            <div className="movie-search-box">
              <div className="search-left">
                <input
                  type="text"
                  placeholder="Search your favorite movie..."
                  value={search}
                  onChange={handleMovieSearch}
                  className="movie-input"
                />
              </div>

              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => {
                    setSearch("");
                    setResults([]);
                    setSelectedMovie(null);
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="movie-results">
                {results.map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-result"
                    onClick={() => {
                      setSelectedMovie(movie);
                      setSearch(movie.title);
                      setResults([]);
                    }}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                          : "https://via.placeholder.com/92x138"
                      }
                      alt={movie.title}
                    />
                    <div>
                      <h4>{movie.title}</h4>
                      <span>⭐ {movie.vote_average.toFixed(1)}</span>
                      <p>{movie.release_date?.split("-")[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedMovie && (
            <motion.div
              className="selected-movie-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img
                src={
                  selectedMovie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`
                    : "/placeholder.jpg"
                }
                alt={selectedMovie.title}
              />
              <div className="selected-movie-info">
                <h3>{selectedMovie.title}</h3>
                <p>{selectedMovie.release_date?.split("-")[0]}</p>
                <div className="selected-movie-rating">
                  ⭐ {selectedMovie.vote_average.toFixed(1)} / 10
                </div>
                <p className="selected-overview">
                  {selectedMovie.overview.length > 120
                    ? selectedMovie.overview.substring(0, 120) + "..."
                    : selectedMovie.overview}
                </p>
              </div>
            </motion.div>
          )}

          <div className="rating-container">
            <div className="rating-card">
              <div className="rating-header">
                <h3>Your Rating</h3>
                <span>{movieRating}/5</span>
              </div>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={star <= movieRating ? "star active" : "star"}
                    onClick={() => setMovieRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <textarea
            className="caption-input"
            placeholder="Write a review, theory or recommendation..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div className="post-actions">
            <button type="submit" className="publish-btn">
              <RiSendPlaneFill />
              Publish Review
            </button>
          </div>
        </form>
      </motion.section>

      <div className="community-main">
        <div className="community-layout">
          <div className="community-feed">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  posts={posts}
                  setPosts={setPosts}
                />
              ))
            ) : (
              <motion.div
                className="empty-community"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <RiMovie2Line />
                <h2>No Posts Yet</h2>
                <p>
                  Be the first person to share a movie review with the
                  community.
                </p>
                <button
                  className="primary-btn"
                  onClick={() =>
                    document.querySelector(".caption-input")?.focus()
                  }
                >
                  Create First Post
                </button>
              </motion.div>
            )}
          </div>

          <aside className="community-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">
                🔥
                <div>
                  <h3>Trending Movies</h3>
                  <span>What's hot right now</span>
                </div>
              </div>

              {[
                {
                  title: "Interstellar",
                  image:
                    "https://image.tmdb.org/t/p/w92/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                },
                {
                  title: "Oppenheimer",
                  image:
                    "https://image.tmdb.org/t/p/w92/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
                },
                {
                  title: "Dune",
                  image:
                    "https://image.tmdb.org/t/p/w92/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
                },
                {
                  title: "Parasite",
                  image:
                    "https://image.tmdb.org/t/p/w92/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                },
                {
                  title: "The Batman",
                  image:
                    "https://image.tmdb.org/t/p/w92/74xTEgt7R36Fpooo50r9T25onhq.jpg",
                },
              ].map((movie, index) => (
                <div className="trending-item" key={movie.title}>
                  <img src={movie.image} alt={movie.title} />

                  <div className="trending-info">
                    <span className="movie-rank">{index + 1}</span>

                    <h4>{movie.title}</h4>
                  </div>

                  <span className="arrow">›</span>
                </div>
              ))}
            </div>

            <div className="sidebar-card">
              <div className="sidebar-title">
                🏆
                <div>
                  <h3>Top Cinephiles</h3>
                  <span>Most active this month</span>
                </div>
              </div>

              {[
                {
                  rank: "🥇",
                  name: "Aakash",
                  points: "1250",
                },
                {
                  rank: "🥈",
                  name: "Rahul",
                  points: "980",
                },
                {
                  rank: "🥉",
                  name: "Alex",
                  points: "720",
                },
              ].map((user) => (
                <div className="leaderboard-user" key={user.name}>
                  <div className="leader-left">
                    <div className="leader-rank">{user.rank}</div>

                    <div className="leader-avatar">{user.name.charAt(0)}</div>

                    <h4>{user.name}</h4>
                  </div>

                  <div className="leader-score">
                    {user.points}
                    <span>pts</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="sidebar-card community-tip">
              <div className="sidebar-title">
                💡
                <div>
                  <h3>Community Tip</h3>
                  <span>Grow your audience</span>
                </div>
              </div>

              <div className="tip-content">
                <div className="tip-icon">🎬</div>

                <div>
                  <h4>Write reviews that stand out</h4>

                  <p>
                    Reviews with thoughtful opinions, ratings and detailed
                    explanations usually receive the highest engagement from
                    fellow cinephiles.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Community;
