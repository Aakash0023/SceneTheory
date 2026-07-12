import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/auth";

const UserProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await API.get(`/profile/${id}`);
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await API.get(`/posts/user/${id}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <img
          src={user.avatar || "/default-avatar.png"}
          alt={user.username}
          className="profile-avatar"
        />

        <h1>{user.username}</h1>

        <p>{user.bio}</p>

        <div className="profile-stats">
          <div>
            <h3>{user.postsCount}</h3>
            <span>Posts</span>
          </div>

          <div>
            <h3>{user.quizCompleted}</h3>
            <span>Quizzes</span>
          </div>

          <div>
            <h3>{user.streak}</h3>
            <span>Streak</span>
          </div>
        </div>
      </div>

      <h2>User Reviews</h2>

      <div className="user-posts">
        {posts.map((post) => (
          <div className="review-card" key={post._id}>
            <img src={post.moviePoster} alt={post.movieTitle} />

            <h3>{post.movieTitle}</h3>

            <p>{post.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
