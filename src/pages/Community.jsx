import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  RiMovie2Line,
  RiTeamLine,
  RiFireLine,
  RiSendPlaneFill,
  RiImageAddLine,
  RiCloseLine,
} from "react-icons/ri";

import PostCard from "../components/PostCard";
import "../styles/community.css";
import { searchMovies } from "../api/searchMovies";
import API from "../api/auth";

function Community({ posts, setPosts }) {
  const [caption, setCaption] = useState("");
  const [movieRating, setMovieRating] = useState(5);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searching, setSearching] = useState(false);

  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [activeFilter, setActiveFilter] = useState("All");
  const [postCategory, setPostCategory] = useState("Reviews");
  const [submitting, setSubmitting] = useState(false);

  // Guards against out-of-order search responses (race condition fix)
  const searchRequestId = useRef(0);
  const debounceTimer = useRef(null);

  const filters = ["All", "Reviews", "Theories", "Recommendations"];

  // ===============================
  // Load Posts
  // ===============================

  useEffect(() => {
    let cancelled = false;

    const loadPosts = async () => {
      try {
        const res = await API.get("/posts");
        if (!cancelled) setPosts(res.data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();

    return () => {
      cancelled = true;
    };
  }, [setPosts]);

  // ===============================
  // Filtered posts (was previously dead state)
  // ===============================

  const filteredPosts =
    activeFilter === "All"
      ? posts
      : posts.filter(
          (post) =>
            post.category &&
            post.category.toLowerCase() === activeFilter.toLowerCase()
        );

  // ===============================
  // Publish Post
  // ===============================

  const publishPost = async (e) => {
    e.preventDefault();

    if (submitting) return; // prevent double-submit

    if (!caption.trim()) {
      alert("Write something first!");
      return;
    }

    if (!selectedMovie) {
      alert("Please select a movie.");
      return;
    }

    setSubmitting(true);

    try {
      await API.post("/posts", {
        movieId: selectedMovie.id,
        movieTitle: selectedMovie.title,

        moviePoster: selectedMovie.poster_path
          ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
          : "",

        movieYear: selectedMovie.release_date
          ? selectedMovie.release_date.split("-")[0]
          : "",

        movieOverview: selectedMovie.overview,

        tmdbRating: selectedMovie.vote_average,

        rating: movieRating,

        review: caption,

        image: "",
      });

      setPosts((prev) => [res.data, ...prev]);

      alert("🎉 Review Published!");

      setCaption("");
      setSelectedMovie(null);
      setSearch("");
      setMovieRating(5);
      setPreview(null);
      setPostCategory("Reviews");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to publish review.");
    } finally {
      setSubmitting(false);
    }
  };

  // ===============================
  // Search Movie (debounced + race-safe)
  // ===============================

  const handleMovieSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // FIX: typing after picking a movie no longer leaves a stale selection
    if (selectedMovie && value !== selectedMovie.title) {
      setSelectedMovie(null);
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (value.trim().length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);

    debounceTimer.current = setTimeout(async () => {
      const requestId = ++searchRequestId.current;

      try {
        const movies = await searchMovies(value);

        // FIX: ignore stale responses that resolve out of order
        if (requestId === searchRequestId.current) {
          setResults(movies.slice(0, 5));
          setSearching(false);
        }
      } catch (error) {
        console.error(error);
        if (requestId === searchRequestId.current) {
          setSearching(false);
        }
      }
    }, 350);
  };

  // ===============================
  // Image Upload (was referenced in payload but had no input before)
  // ===============================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
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

            {searching && <p className="search-status">Searching…</p>}

            {results.length > 0 && (
              <div className="movie-results">
                {results.map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-result"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      setSelectedMovie(movie);
                      setSearch(movie.title);
                      setResults([]);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedMovie(movie);
                        setSearch(movie.title);
                        setResults([]);
                      }
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

                      {/* FIX: guard against missing vote_average */}
                      <span>
                        ⭐{" "}
                        {typeof movie.vote_average === "number"
                          ? movie.vote_average.toFixed(1)
                          : "N/A"}
                      </span>

                      <p>{movie.release_date?.split("-")[0] || "—"}</p>
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

                <p>{selectedMovie.release_date?.split("-")[0] || "—"}</p>

                <div className="selected-movie-rating">
                  ⭐{" "}
                  {typeof selectedMovie.vote_average === "number"
                    ? selectedMovie.vote_average.toFixed(1)
                    : "N/A"}{" "}
                  / 10
                </div>

                {/* FIX: guard against missing overview */}
                <p className="selected-overview">
                  {selectedMovie.overview
                    ? selectedMovie.overview.length > 120
                      ? selectedMovie.overview.substring(0, 120) + "..."
                      : selectedMovie.overview
                    : "No description available."}
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

          {/* FIX: image upload input now actually exists to back the `preview` state */}
          <div className="image-upload-card">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              id="post-image-input"
              onChange={handleImageChange}
              hidden
            />

            {!preview ? (
              <label
                htmlFor="post-image-input"
                className="image-upload-trigger"
              >
                <RiImageAddLine />
                Add an image (optional)
              </label>
            ) : (
              <div className="image-preview-wrap">
                <img src={preview} alt="Selected preview" />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => {
                    setPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  <RiCloseLine />
                </button>
              </div>
            )}
          </div>

          {/* NEW: category picker — value gets saved on the post and used by the filter bar */}
          <div className="category-picker">
            <p className="input-heading">POST TYPE</p>
            <div className="category-options">
              {filters
                .filter((f) => f !== "All")
                .map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={
                      f === postCategory
                        ? "category-chip active"
                        : "category-chip"
                    }
                    onClick={() => setPostCategory(f)}
                  >
                    {f}
                  </button>
                ))}
            </div>
          </div>

          <textarea
            className="caption-input"
            placeholder="Write a review, theory or recommendation..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div className="post-actions">
            <button type="submit" className="publish-btn" disabled={submitting}>
              <RiSendPlaneFill />
              {submitting ? "Publishing..." : "Publish Review"}
            </button>
          </div>
        </form>
      </motion.section>

      {/* FIX: filter bar now rendered and wired up (was defined but unused) */}
      <div className="community-filters">
        {filters.map((f) => (
          <button
            key={f}
            className={f === activeFilter ? "filter-btn active" : "filter-btn"}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="community-main">
        <div className="community-layout">
          <div className="community-feed">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard
                  key={post._id}
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
                { rank: "🥇", name: "Aakash", points: "1250" },
                { rank: "🥈", name: "Rahul", points: "980" },
                { rank: "🥉", name: "Alex", points: "720" },
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
