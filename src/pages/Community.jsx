import PostCard from "../components/PostCard";
import "../styles/community.css";
import { useNavigate } from "react-router-dom";

function Community({ posts }) {
  const navigate = useNavigate();

  return (
    <div className="community-page">
      <div className="community-header">
        <h1 className="community-title">Community</h1>

        <button
          className="create-post-btn"
          onClick={() => navigate("/create-post")}
        >
          + Create Post
        </button>
      </div>

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Community;
