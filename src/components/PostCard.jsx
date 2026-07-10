import { useState } from "react";
import { motion } from "framer-motion";
import {
  RiHeart3Line,
  RiHeart3Fill,
  RiChat3Line,
  RiBookmarkLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import CommentsModal from "./CommentsModal";
import API from "../api/auth";

const PostCard = ({ post, posts, setPosts }) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  // ==================================
  // Toggle Like
  // ==================================

  const toggleLike = async () => {
    if (loadingLike) return;

    setLoadingLike(true);

    try {
      const res = await API.patch(`/posts/${post._id}/like`);

      setPosts((prev) =>
        prev.map((item) => (item._id === post._id ? res.data : item))
      );

      setLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update like.");
    } finally {
      setLoadingLike(false);
    }
  };

  // ==================================
  // Delete Post
  // ==================================

  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${post._id}`);

      setPosts((prev) => prev.filter((item) => item._id !== post._id));

      alert("Review deleted successfully.");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to delete review.");
    }
  };

  // ==================================
  // Time Ago
  // ==================================

  const timeAgo = () => {
    if (!post.createdAt) return "Just now";

    const diff = Math.floor((new Date() - new Date(post.createdAt)) / 1000);

    if (diff < 60) return "Just now";

    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;

    return `${Math.floor(diff / 86400)} days ago`;
  };
  return (
    <>
      <motion.div
        className="post-card"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
      >
        {/* ===========================
          HEADER
      =========================== */}

        <div className="post-header">
          <div className="post-user">
            <div className="post-avatar">{post.avatar || "🎬"}</div>

            <div>
              <h3>{post.username || "Movie Lover"}</h3>

              <span>{timeAgo()}</span>
            </div>
          </div>

          <button className="delete-post-btn" onClick={deletePost}>
            <RiDeleteBin6Line />
          </button>
        </div>

        {/* ===========================
          MOVIE REVIEW CARD
      =========================== */}

        {post.movieTitle && (
          <div className="movie-review-card">
            <img
              src={
                post.moviePoster
                  ? post.moviePoster
                  : "https://via.placeholder.com/300x450"
              }
              alt={post.movieTitle}
              className="review-poster"
              onClick={() => navigate(`/movie/${post.movieId}`)}
            />

            <div className="review-details">
              <div className="review-top">
                <div>
                  <h2>{post.movieTitle}</h2>

                  <span>
                    {post.movieYear || "Unknown"} • ⭐{" "}
                    {Number(post.tmdbRating || 0).toFixed(1)}
                  </span>
                </div>

                <div className="user-rating">
                  {"⭐".repeat(post.rating || 5)}
                </div>
              </div>

              <p className="review-overview">
                {post.movieOverview
                  ? post.movieOverview.length > 160
                    ? post.movieOverview.substring(0, 160) + "..."
                    : post.movieOverview
                  : "No overview available."}
              </p>
            </div>
          </div>
        )}

        {/* ===========================
          REVIEW TEXT
      =========================== */}

        <p className="post-caption">{post.review || post.caption}</p>

        {/* ===========================
          REVIEW IMAGE
      =========================== */}

        {post.image && (
          <img src={post.image} alt="Review" className="post-image" />
        )}
        {/* ===========================
          ACTIONS
      =========================== */}

        <div className="post-footer">
          <button
            className="post-action"
            onClick={toggleLike}
            disabled={loadingLike}
          >
            {liked ? <RiHeart3Fill color="#f5c518" /> : <RiHeart3Line />}

            <span>{post.likes?.length || 0}</span>
          </button>

          <button className="post-action" onClick={() => setShowComments(true)}>
            <RiChat3Line />

            <span>{post.comments?.length || 0}</span>
          </button>

          <button className="post-action">
            <RiBookmarkLine />
          </button>
        </div>
      </motion.div>

      {/* ===========================
        COMMENTS MODAL
    =========================== */}

      {showComments && (
        <CommentsModal
          post={post}
          posts={posts}
          setPosts={setPosts}
          closeModal={() => setShowComments(false)}
        />
      )}
    </>
  );
};

export default PostCard;
