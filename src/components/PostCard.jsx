import { Heart, MessageCircle } from "lucide-react";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-header">{post.username}</div>

      <img src={post.image} alt="post" className="post-image" />

      <div className="post-content">
        <p>{post.caption}</p>

        <div className="post-actions">
          <span>
            <Heart size={18} /> {post.likes}
          </span>

          <span>
            <MessageCircle size={18} /> {post.comments}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
