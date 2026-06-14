import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }

    setLiked(!liked);
  };

  const handleComment = () => {
    if (!comment.trim()) return;

    setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="post-card">
      <div className="post-header">{post.username}</div>

      <img src={post.image} alt="post" className="post-image" />

      <div className="post-content">
        <p>{post.caption}</p>

        <div className="post-actions">
          <div
            className={`like-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
            <span>{likes}</span>
          </div>

          <div className="comment-btn">
            <MessageCircle size={18} />
            <span>{comments.length}</span>
          </div>
        </div>

        <div className="comment-section">
          <div className="comment-input-row">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="comment-input"
            />

            <button className="comment-submit-btn" onClick={handleComment}>
              Add
            </button>
          </div>

          {comments.map((item, index) => (
            <div key={index} className="comment-item">
              <strong>Aakash:</strong> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
