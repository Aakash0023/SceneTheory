import { useState } from "react";
import { motion } from "framer-motion";
import { RiChat3Line, RiSendPlaneFill, RiCloseLine } from "react-icons/ri";

import API from "../api/auth";

const CommentsModal = ({ post, closeModal, posts, setPosts }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // Add Comment
  // =====================================

  const addComment = async () => {
    if (!comment.trim()) {
      alert("Please write a comment.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(`/posts/${post._id}/comment`, {
        text: comment,
      });

      setPosts((prev) =>
        prev.map((item) => (item._id === post._id ? res.data : item))
      );

      setComment("");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to add comment.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Time Ago
  // =====================================

  const timeAgo = (time) => {
    if (!time) return "Just now";

    const diff = Math.floor((new Date() - new Date(time)) / 1000);

    if (diff < 60) return "Just now";

    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

    if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;

    return `${Math.floor(diff / 86400)} days ago`;
  };
  return (
    <div className="comments-overlay" onClick={closeModal}>
      <motion.div
        className="comments-modal"
        initial={{
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===========================
          HEADER
      =========================== */}

        <div className="comments-header">
          <div>
            <h2>
              <RiChat3Line />
              Comments
            </h2>

            <p>{post.comments?.length || 0} Comments</p>
          </div>

          <button onClick={closeModal} className="close-comments">
            <RiCloseLine />
          </button>
        </div>

        {/* ===========================
          COMMENTS LIST
      =========================== */}

        <div className="comments-list">
          {post.comments?.length ? (
            post.comments.map((comment, index) => (
              <div className="comment-card" key={comment._id || index}>
                <div className="comment-avatar">{comment.avatar || "🎬"}</div>

                <div className="comment-content">
                  <div className="comment-top">
                    <h4>{comment.username}</h4>

                    <span>{timeAgo(comment.createdAt)}</span>
                  </div>

                  <p>{comment.text}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-comments">
              <RiChat3Line />

              <h3>No comments yet</h3>

              <p>Be the first to join the discussion.</p>
            </div>
          )}
        </div>

        {/* ===========================
          INPUT
      =========================== */}

        <div className="comment-input-area">
          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={addComment} disabled={loading}>
            <RiSendPlaneFill />

            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentsModal;
  