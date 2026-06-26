import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCurrentStreak } from "../utils/streak";

const Profile = () => {
  const navigate = useNavigate();

  const [streak, setStreak] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [posts, setPosts] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    setStreak(getCurrentStreak());
    setWatchlist(JSON.parse(localStorage.getItem("watchlist")) || []);
    setPosts(JSON.parse(localStorage.getItem("communityPosts")) || []);
    setQuizCount(Number(localStorage.getItem("quizCompleted")) || 0);
    setProfilePic(localStorage.getItem("profilePicture") || "");
  }, []);

  const handleProfilePicture = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePicture", reader.result);
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const totalPoints = streak + watchlist.length + posts.length + quizCount;
  const level = Math.max(1, Math.floor(totalPoints / 3));
  const xp = totalPoints * 20;

  const achievements = [
    { icon: "🥇", title: "First Quiz", unlocked: quizCount >= 1 },
    { icon: "🔥", title: "7 Day Streak", unlocked: streak >= 7 },
    { icon: "🎬", title: "Movie Buff", unlocked: watchlist.length >= 10 },
    { icon: "✍️", title: "Reviewer", unlocked: posts.length >= 5 },
    { icon: "👑", title: "Quiz Master", unlocked: quizCount >= 25 },
    { icon: "💎", title: "Cine Legend", unlocked: level >= 10 },
  ];

  return (
    <div className="profile-page">
      <motion.section
        className="profile-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-overlay">
          <div className="hero-left">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="profile-avatar-img"
              />
            ) : (
              <div className="profile-avatar">🎬</div>
            )}
            <label className="upload-btn">
              📷 Change Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfilePicture}
              />
            </label>
          </div>

          <div className="hero-right">
            <h1>Aakash</h1>
            <p>Movie Explorer • SceneTheory Member</p>
            <div className="level-pill">🎖 Level {level}</div>
            <div className="xp-wrapper">
              <div className="xp-bar">
                <motion.div
                  className="xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${xp % 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <span>{xp} XP</span>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="premium-stats"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="stat-card">
          <span>🔥</span>
          <h2>{streak}</h2>
          <p>Current Streak</p>
        </div>
        <div className="stat-card">
          <span>🎬</span>
          <h2>{watchlist.length}</h2>
          <p>Watchlist</p>
        </div>
        <div className="stat-card">
          <span>🧠</span>
          <h2>{quizCount}</h2>
          <p>Quizzes Completed</p>
        </div>
        <div className="stat-card">
          <span>📝</span>
          <h2>{posts.length}</h2>
          <p>Community Posts</p>
        </div>
      </motion.section>

      <div className="profile-container">
        {/* ================= Continue Watching ================= */}
        <motion.section
          className="continue-section glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-heading">
            <h2>Continue Watching</h2>
            <p>Your recently saved movies</p>
          </div>

          {watchlist.length > 0 ? (
            <div className="continue-row">
              {watchlist.slice(0, 8).map((movie) => (
                <motion.div
                  whileHover={{ scale: 1.06, y: -8 }}
                  key={movie.id}
                  className="continue-card"
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <div className="continue-info">
                    <h4>{movie.title}</h4>
                    <span>
                      ⭐{" "}
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "N/A"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No Movies Yet</h3>
              <p>Start exploring movies and build your personal watchlist.</p>
            </div>
          )}
        </motion.section>

        {/* ================= Favorite Movie ================= */}
        <motion.section
          className="favorite-section glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-heading">
            <h2>Favourite Movie</h2>
            <p>Your top pick from the watchlist</p>
          </div>

          {/* ✅ Guard: only render movie details if watchlist is non-empty */}
          {watchlist.length > 0 ? (
            <div className="favorite-layout">
              <motion.img
                whileHover={{ scale: 1.04 }}
                src={`https://image.tmdb.org/t/p/w500${watchlist[0].poster_path}`}
                alt={watchlist[0].title}
                className="favorite-poster"
              />
              <div className="favorite-details">
                <span className="favorite-tag">⭐ Favorite Movie</span>
                <h2>{watchlist[0].title}</h2>
                <div className="favorite-meta">
                  <span>
                    ⭐{" "}
                    {watchlist[0].vote_average
                      ? watchlist[0].vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                  <span>
                    📅{" "}
                    {watchlist[0].release_date
                      ? watchlist[0].release_date.slice(0, 4)
                      : "Unknown"}
                  </span>
                  <span>
                    🌎 {watchlist[0].original_language?.toUpperCase()}
                  </span>
                </div>
                <p className="favorite-overview">
                  {watchlist[0].overview
                    ? watchlist[0].overview.substring(0, 220) + "..."
                    : "No overview available."}
                </p>
                <div className="favorite-buttons">
                  <button
                    className="primary-btn"
                    onClick={() => navigate(`/movie/${watchlist[0].id}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="secondary-btn"
                    onClick={() => navigate("/watchlist")}
                  >
                    Open Watchlist
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // ✅ Empty state is now correctly inside the section
            <div className="empty-state">
              <h3>No Favourite Movie</h3>
              <p>
                Add movies to your watchlist to see your favourite movie here.
              </p>
            </div>
          )}
        </motion.section>

        {/* ================= Achievements ================= */}
        <motion.section
          className="achievement-section glass-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-heading">
            <h2>Achievements</h2>
            <p>Your SceneTheory milestones</p>
          </div>
          <div className="achievement-grid">
            {achievements.map((badge) => (
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                key={badge.title}
                className={`achievement-card ${
                  badge.unlocked ? "achievement-unlocked" : "achievement-locked"
                }`}
              >
                <div className="achievement-icon">{badge.icon}</div>
                <h3>{badge.title}</h3>
                <p>{badge.unlocked ? "Unlocked" : "Locked"}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= Activity Timeline ================= */}
        <motion.section
          className="timeline-section glass-card"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="section-heading">
            <h2>Recent Activity</h2>
            <p>Your latest actions on SceneTheory</p>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-icon">🔥</div>
              <div className="timeline-content">
                <h4>Current Streak</h4>
                <p>
                  You are on a <strong>{streak} day</strong> streak. Keep
                  solving CineChallenges every day!
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🧠</div>
              <div className="timeline-content">
                <h4>Quiz Progress</h4>
                <p>
                  Completed <strong>{quizCount}</strong> movie quizzes.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🎬</div>
              <div className="timeline-content">
                <h4>Watchlist Updated</h4>
                <p>
                  You have saved <strong>{watchlist.length}</strong> movies.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">📝</div>
              <div className="timeline-content">
                <h4>Community Activity</h4>
                <p>
                  You have published <strong>{posts.length}</strong> posts.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Profile;
