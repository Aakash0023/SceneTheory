import { useEffect, useState } from "react";
import { getCurrentStreak } from "../utils/streak";

const Profile = () => {
  const [streak, setStreak] = useState(0);
  const [watchlistCount, setWatchlistCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  useEffect(() => {
    setStreak(getCurrentStreak());

    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlistCount(watchlist.length);

    const posts = JSON.parse(localStorage.getItem("communityPosts")) || [];
    setPostCount(posts.length);
  }, []);

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">👤</div>

        <h1>Aakash</h1>

        <p className="profile-subtitle">
          Movie Enthusiast • CineChallenge Player
        </p>

        <div className="profile-stats">
          <div className="stat-card">
            <h2>🔥</h2>
            <h3>{streak}</h3>
            <p>Day Streak</p>
          </div>

          <div className="stat-card">
            <h2>🎬</h2>
            <h3>{watchlistCount}</h3>
            <p>Watchlist</p>
          </div>

          <div className="stat-card">
            <h2>📝</h2>
            <h3>{postCount}</h3>
            <p>Posts</p>
          </div>
        </div>

        <div className="achievement-section">
          <h2>🏆 Achievements</h2>

          <div className="achievement-grid">
            <div className="achievement-card">
              🥇
              <h4>First Challenge</h4>
            </div>

            <div className="achievement-card">
              🔥
              <h4>{streak >= 7 ? "7 Day Streak" : "Keep Going!"}</h4>
            </div>

            <div className="achievement-card">
              🎥
              <h4>
                {watchlistCount >= 10 ? "Movie Buff" : "Build Your Watchlist"}
              </h4>
            </div>

            <div className="achievement-card">
              ✍️
              <h4>{postCount >= 5 ? "Reviewer" : "Write Your First Review"}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
