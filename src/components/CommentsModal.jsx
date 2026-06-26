import { useState } from "react";
import { motion } from "framer-motion";
import { RiChat3Line, RiSendPlaneFill, RiCloseLine } from "react-icons/ri";

const CommentsModal = ({ post, closeModal, posts, setPosts }) => {
  const [comment, setComment] = useState("");

  const addComment = () => {
    if (!comment.trim()) return;

    const updatedPosts = posts.map((item) => {
      if (item.id === post.id) {
        return {
          ...item,
          comments: [
            ...(item.comments || []),
            {
              id: Date.now(),
              username: "Aakash",
              text: comment,
              createdAt: new Date().toISOString(),
            },
          ],
        };
      }

      return item;
    });

    setPosts(updatedPosts);

    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));

    setComment("");
  };

  const timeAgo = (time) => {
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

        <div className="comments-list">
          {post.comments?.length ? (
            post.comments.map((comment) => (
              <div className="comment-card" key={comment.id}>
                <div className="comment-avatar">🎬</div>

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

        <div className="comment-input-area">
          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={addComment}>
            <RiSendPlaneFill />
            Post Comment
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CommentsModal;
