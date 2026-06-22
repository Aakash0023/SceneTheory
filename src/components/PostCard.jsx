import { useState } from "react";
import { Heart, MessageCircle, Pencil, Trash2, Check } from "lucide-react";

function PostCard({ post, posts, setPosts }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [editing, setEditing] = useState(false);

  const [editedCaption, setEditedCaption] = useState(post.caption);

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

  const handleDelete = () => {
    const updatedPosts = posts.filter((item) => item.id !== post.id);

    setPosts(updatedPosts);
  };

  const handleSave = () => {
    const updatedPosts = posts.map((item) =>
      item.id === post.id
        ? {
            ...item,
            caption: editedCaption,
          }
        : item
    );

    setPosts(updatedPosts);

    setEditing(false);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-user">
          <div className="user-avatar">{post.username.charAt(0)}</div>

          <div className="user-info">
            <h4>{post.username}</h4>

            <span>Just now</span>
          </div>
        </div>

        <div className="post-owner-actions">
          {!editing ? (
            <button onClick={() => setEditing(true)}>
              <Pencil size={16} />
            </button>
          ) : (
            <button onClick={handleSave}>
              <Check size={16} />
            </button>
          )}

          <button onClick={handleDelete}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <img src={post.image} alt="post" className="post-image" />

      <div className="post-content">
        {editing ? (
          <textarea
            className="edit-caption"
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
          />
        ) : (
          <p className="post-caption">{post.caption}</p>
        )}

        <div className="post-actions">
          <button
            className={`like-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />

            <span>{likes}</span>
          </button>

          <button className="comment-btn">
            <MessageCircle size={18} />

            <span>{comments.length}</span>
          </button>
        </div>

        <div className="comment-section">
          <div className="comment-input-row">
            <input
              type="text"
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="comment-input"
            />

            <button className="comment-submit-btn" onClick={handleComment}>
              Post
            </button>
          </div>

          {comments.length > 0 && (
            <div className="comments-list">
              {comments.map((item, index) => (
                <div key={index} className="comment-item">
                  <div className="comment-avatar">A</div>

                  <div className="comment-content">
                    <strong>Aakash</strong>

                    <p>{item}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
