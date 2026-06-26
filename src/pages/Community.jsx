import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiMovie2Line,
  RiTeamLine,
  RiFireLine,
  RiImageAddLine,
  RiSendPlaneFill,
} from "react-icons/ri";

import PostCard from "../components/PostCard";
import "../styles/community.css";

function Community({ posts, setPosts }) {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [movieRating, setMovieRating] = useState(5);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));
  };

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
      caption,
      image: preview,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      movieTitle,
      rating: movieRating,
    };

    const updatedPosts = [newPost, ...posts];

    setPosts(updatedPosts);

    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));

    setCaption("");
    setMovieTitle("");
    setMovieRating(5);
    setPreview(null);
  };

  return (
    <div className="community-page">
      {/* ================= HERO ================= */}

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

            <h3>1.2K</h3>

            <span>Cinephiles</span>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="community-stat">
            <RiFireLine />

            <h3>82</h3>

            <span>Trending Today</span>
          </motion.div>
        </div>
      </motion.section>

      {/* ================= CREATE POST ================= */}

      <motion.section
        className="create-post-inline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2>What's on your mind?</h2>

        <p>Share your latest review, recommendation or fan theory.</p>

        <form onSubmit={publishPost}>
          <input
            type="text"
            className="movie-input"
            placeholder="🎬 Movie Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <div className="rating-container">
            <label>Your Rating</label>

            <select
              value={movieRating}
              onChange={(e) => setMovieRating(Number(e.target.value))}
            >
              <option value={1}>⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
              <option value={5}>⭐⭐⭐⭐⭐</option>
            </select>
          </div>
          <textarea
            className="caption-input"
            placeholder="Write a review, theory or recommendation..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <div className="post-actions">
            <label className="upload-btn">
              <RiImageAddLine />
              Add Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>

            <button type="submit" className="publish-btn">
              <RiSendPlaneFill />
              Publish Review
            </button>
          </div>

          {preview && (
            <img src={preview} alt="Preview" className="preview-image" />
          )}
        </form>
      </motion.section>

      {/* Continue with PART 2 */}
      {/* ================= FILTERS ================= */}

      <div className="community-toolbar">
        <div className="community-filters">
          <button className="active">All</button>

          <button>Reviews</button>

          <button>Theories</button>

          <button>Recommendations</button>
        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}

      <div className="community-layout">
        {/* ================= FEED ================= */}

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
                Be the first person to share a movie review with the community.
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

        {/* ================= SIDEBAR ================= */}

        <aside className="community-sidebar">
          <div className="sidebar-card">
            <h3>🔥 Trending Movies</h3>

            <ul>
              <li>Interstellar</li>

              <li>Oppenheimer</li>

              <li>Dune</li>

              <li>Parasite</li>

              <li>The Batman</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>🏆 Top Cinephiles</h3>

            <div className="top-user">
              <span>🥇</span>

              <p>Aakash</p>
            </div>

            <div className="top-user">
              <span>🥈</span>

              <p>Rahul</p>
            </div>

            <div className="top-user">
              <span>🥉</span>

              <p>Alex</p>
            </div>
          </div>

          <div className="sidebar-card">
            <h3>💡 Community Tip</h3>

            <p>
              Reviews with images and detailed thoughts usually receive the most
              engagement from fellow cinephiles.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Community;
