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
import toast from "react-hot-toast";

import CommentsModal from "./CommentsModal";
import API from "../api/auth";

const PostCard = ({ post, posts, setPosts }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Supports both id and _id
  const loggedInUserId = user?._id || user?.id;

  const [loadingLike, setLoadingLike] = useState(false);

  const [showComments, setShowComments] = useState(false);

  const [liked, setLiked] = useState(
    Array.isArray(post.likes) &&
      post.likes.some((id) => id.toString() === loggedInUserId?.toString())
  );

  const [likesCount, setLikesCount] = useState(
    Array.isArray(post.likes) ? post.likes.length : 0
  );

  // ===============================
  // LIKE POST
  // ===============================

  const toggleLike = async () => {
    if (loadingLike) return;

    setLoadingLike(true);

    try {
      const res = await API.post(`/posts/${post._id}/like`);

      const updatedLikes = Array.isArray(res.data.likes) ? res.data.likes : [];

      setLiked(
        updatedLikes.some((id) => id.toString() === loggedInUserId?.toString())
      );

      setLikesCount(
        typeof res.data.likesCount === "number"
          ? res.data.likesCount
          : updatedLikes.length
      );

      setPosts((prev) =>
        prev.map((item) =>
          item._id === post._id
            ? {
                ...item,
                likes: updatedLikes,
              }
            : item
        )
      );
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to update like.");
    } finally {
      setLoadingLike(false);
    }
  };

  // ===============================
  // DELETE POST
  // ===============================

  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${post._id}`);

      setPosts((prev) => prev.filter((item) => item._id !== post._id));

      toast.success("Post deleted successfully.");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to delete post.");
    }
  };

  // ===============================
  // TIME AGO
  // ===============================

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
        {/* ==========================
            HEADER
        ========================== */}

        <div className="post-header">
          <div className="post-user">
            <div className="post-avatar">
              {post.avatar ? (
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="post-avatar-img"
                  onError={(e) => {
                    e.target.src = "/default-avatar.png";
                  }}
                />
              ) : (
                <div className="avatar-placeholder">🎬</div>
              )}
            </div>

            <div>
              <h3>{post.username || "Movie Lover"}</h3>

              <span>{timeAgo()}</span>
            </div>
          </div>

          {/* DELETE BUTTON */}

          {loggedInUserId === (post.user?._id || post.user)?.toString() && (
            <button
              className="delete-post-btn"
              onClick={deletePost}
              title="Delete Review"
            >
              <RiDeleteBin6Line />
            </button>
          )}
        </div>

        {/* ==========================
            MOVIE CARD
        ========================== */}

        {post.movieTitle && (
          <div className="movie-review-card">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
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
                  {"⭐".repeat(post.userRating || 5)}
                </div>
              </div>

              <p className="review-overview">
                {post.movieOverview
                  ? post.movieOverview.length > 180
                    ? post.movieOverview.substring(0, 180) + "..."
                    : post.movieOverview
                  : "No overview available."}
              </p>
            </div>
          </div>
        )}

        {/* ==========================
            REVIEW TEXT
        ========================== */}

        {post.review && <p className="post-caption">{post.review}</p>}

        {/* ==========================
            IMAGE
        ========================== */}

        {post.image && (
          <motion.img
            src={post.image}
            alt="Review"
            className="post-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        {/* ==========================
            FOOTER
        ========================== */}

        <div className="post-footer">
          <button
            className={`post-action ${liked ? "liked" : ""}`}
            onClick={toggleLike}
            disabled={loadingLike}
          >
            {liked ? <RiHeart3Fill color="#f5c518" /> : <RiHeart3Line />}

            <span>{likesCount}</span>
          </button>

          <button className="post-action" onClick={() => setShowComments(true)}>
            <RiChat3Line />

            <span>{post.comments?.length || 0}</span>
          </button>

          <button
            className="post-action"
            onClick={() => toast.success("Bookmarks feature coming soon 🚀")}
          >
            <RiBookmarkLine />
          </button>
        </div>
      </motion.div>

      {/* ==========================
          COMMENTS MODAL
      ========================== */}

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
