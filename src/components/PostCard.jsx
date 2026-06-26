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

const PostCard = ({ post, posts, setPosts }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  const deletePost = () => {
    const updatedPosts = posts.filter((item) => item.id !== post.id);

    setPosts(updatedPosts);

    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
  };

  const timeAgo = () => {
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
        whileHover={{
          y: -6,
        }}
      >
        {/* HEADER */}

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

        {/* CAPTION */}

        {post.movieTitle && (
          <div className="movie-review-card">
            <img
              src={post.moviePoster}
              alt={post.movieTitle}
              className="review-poster"
              onClick={() => navigate(`/movie/${post.movieId}`)}
            />

            <div className="review-details">
              <div className="review-top">
                <div>
                  <h2>{post.movieTitle}</h2>

                  <span>
                    {post.movieYear} • ⭐ {post.tmdbRating.toFixed(1)}
                  </span>
                </div>

                <div className="user-rating">{"⭐".repeat(post.rating)}</div>
              </div>

              <p className="review-overview">
                {post.movieOverview.length > 150
                  ? post.movieOverview.substring(0, 150) + "..."
                  : post.movieOverview}
              </p>
            </div>
          </div>
        )}

        <p className="post-caption">{post.caption}</p>
        {/* IMAGE */}

        {post.moviePoster && (
          <img
            src={post.moviePoster}
            alt={post.movieTitle}
            className="post-image"
          />
        )}
        {/* ACTIONS */}

        <div className="post-footer">
          <button className="post-action" onClick={toggleLike}>
            {liked ? <RiHeart3Fill color="#f5c518" /> : <RiHeart3Line />}

            <span>{(post.likes || 0) + (liked ? 1 : 0)}</span>
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
