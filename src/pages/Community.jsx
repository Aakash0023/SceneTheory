import PostCard from "../components/PostCard";
import "../styles/community.css";

const dummyPosts = [
  {
    id: 1,
    username: "Aakash",
    caption: "Interstellar is still one of the greatest sci-fi movies ever 🚀",
    image: "https://picsum.photos/600/400",
    likes: 24,
    comments: 8,
  },
];

function Community() {
  return (
    <div className="community-page">
      <div className="community-header">
        <h1 className="community-title">Community</h1>

        <button className="create-post-btn">+ Create Post</button>
      </div>

      <div>
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Community;
