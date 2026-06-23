import PostCard from "../components/PostCard";
import "../styles/community.css";
import { useNavigate } from "react-router-dom";

function Community({ posts, setPosts }) {
  const navigate = useNavigate();

  return (
    <div className="community-page">
      <div className="community-hero">
        <p className="section-eyebrow">CINECOMMUNITY</p>

        <h1 className="community-title">Share Your Movie Story</h1>

        <p className="community-subtitle">
          Discuss movies, share reviews, theories and cinematic moments with
          fellow movie lovers.
        </p>
      </div>

      <div className="community-stats">
        <div className="community-stat">
          <h3>{posts.length}</h3>
          <span>Posts</span>
        </div>

        <div className="community-stat">
          <h3>1.2K</h3>
          <span>Members</span>
        </div>

        <div className="community-stat">
          <h3>82</h3>
          <span>Active Today</span>
        </div>
      </div>

      <div className="community-header">
        <div className="community-filters">
          <button className="active">All</button>

          <button>Reviews</button>

          <button>Theories</button>

          <button>Recommendations</button>
        </div>

        <button
          className="create-post-btn"
          onClick={() => navigate("/create-post")}
        >
          + Create Post
        </button>
      </div>

      <div className="community-feed">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            posts={posts}
            setPosts={setPosts}
          />
        ))}
      
    </div>
  );
}

export default Community;
