import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/auth";
import FollowListModal from "../components/FollowListModal";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const [streak, setStreak] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [posts, setPosts] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const [profilePic, setProfilePic] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [listModal, setListModal] = useState(null); // "followers" | "following" | null

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await API.get("/profile");

        setUsername(res.data.username);
        setBio(res.data.bio);

        setProfilePic(res.data.avatar);

        setWatchlist(res.data.watchlist);

        setQuizCount(res.data.quizCompleted);

        setStreak(res.data.streak);

        setFollowersCount(res.data.followersCount || 0);
        setFollowingCount(res.data.followingCount || 0);

        // Fall back to the id stored at login if the endpoint ever omits it
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        setUserId(res.data._id || storedUser?._id || storedUser?.id || null);

        // Community backend not built yet
        setPosts([]);
      } catch (error) {
        console.error(error);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const formData = new FormData();

      formData.append("avatar", file);

      // Only append these if you have these state variables
      formData.append("username", username);
      formData.append("bio", bio);

      const res = await API.put("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfilePic(res.data.user.avatar);

      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to upload profile picture."
      );
    }
  };

  const totalPoints = streak + watchlist.length + posts.length + quizCount;
  const level = Math.max(1, Math.floor(totalPoints / 3));
  const xp = totalPoints * 20;
  const xpProgress = xp % 100;

  const achievements = [
    {
      icon: "🥇",
      title: "First Quiz",
      desc: "Complete your first quiz",
      unlocked: quizCount >= 1,
    },
    {
      icon: "🔥",
      title: "7 Day Streak",
      desc: "Log in 7 days in a row",
      unlocked: streak >= 7,
    },
    {
      icon: "🎬",
      title: "Movie Buff",
      desc: "Save 10 movies",
      unlocked: watchlist.length >= 10,
    },
    {
      icon: "✍️",
      title: "Reviewer",
      desc: "Publish 5 posts",
      unlocked: posts.length >= 5,
    },
    {
      icon: "👑",
      title: "Quiz Master",
      desc: "Complete 25 quizzes",
      unlocked: quizCount >= 25,
    },
    {
      icon: "💎",
      title: "Cine Legend",
      desc: "Reach Level 10",
      unlocked: level >= 10,
    },
  ];

  const stats = [
    { icon: "🔥", value: streak, label: "Day Streak" },
    { icon: "🎬", value: watchlist.length, label: "Watchlist" },
    { icon: "🧠", value: quizCount, label: "Quizzes Done" },
    { icon: "📝", value: posts.length, label: "Posts" },
  ];
  if (loading) {
    return (
      <div className="profile-root">
        <h1 style={{ color: "#fff", textAlign: "center", padding: "120px" }}>
          Loading Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="profile-root">
      {/* ─────────────────── HERO ─────────────────── */}
      <motion.section
        className="profile-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        {/* Cinematic scanline accent */}
        <div className="hero-scanline" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-inner">
          {/* Avatar */}
          <div className="avatar-wrap">
            <div className="avatar-ring">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="avatar-img" />
              ) : (
                <div className="avatar-placeholder">🎬</div>
              )}
            </div>
            <label className="avatar-upload-btn" title="Change photo">
              <span className="upload-icon">📷</span>
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfilePicture}
              />
            </label>
          </div>

          {/* Identity */}
          <div className="hero-identity">
            <div className="hero-eyebrow">SceneTheory Member</div>
            <h1 className="hero-name">{username}</h1>
            <p className="hero-tagline">{bio}</p>

            <div className="follow-counts-row">
              <button
                className="follow-count-btn"
                onClick={() => setListModal("followers")}
              >
                <strong>{followersCount}</strong> Followers
              </button>
              <button
                className="follow-count-btn"
                onClick={() => setListModal("following")}
              >
                <strong>{followingCount}</strong> Following
              </button>
            </div>

            <div className="hero-level-row">
              <span className="level-badge">🎖 Level {level}</span>
              <span className="xp-label">{xp} XP</span>
            </div>

            <div className="xp-track">
              <motion.div
                className="xp-fill"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <div className="xp-hint">{xpProgress} / 100 XP to next level</div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────── STATS ROW ─────────────────── */}
      <section className="stats-row">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="stat-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.03 }}
          >
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </section>

      {/* ─────────────────── DASHBOARD GRID ─────────────────── */}
      <div className="dashboard-grid">
        {/* ── Continue Watching ── */}
        <motion.section
          className="dash-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="card-header">
            <div>
              <p className="card-eyebrow">YOUR LIST</p>
              <h2 className="card-title">Continue Watching</h2>
            </div>
            <button
              className="card-link-btn"
              onClick={() => navigate("/watchlist")}
            >
              View All →
            </button>
          </div>

          {watchlist.length > 0 ? (
            <div className="movie-grid">
              {watchlist.slice(0, 6).map((movie) => (
                <motion.div
                  key={movie.movieId}
                  className="movie-thumb"
                  whileHover={{ y: -8, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => navigate(`/movie/${movie.movieId}`)}
                >
                  <div className="movie-thumb-img-wrap">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-thumb-img"
                    />
                    <div className="movie-thumb-overlay">
                      <span className="play-icon">▶</span>
                    </div>
                  </div>
                  <div className="movie-thumb-meta">
                    <p className="movie-thumb-title">{movie.title}</p>
                    <span className="movie-thumb-rating">
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
              <div className="empty-icon">🎬</div>
              <h3>Your watchlist is empty</h3>
              <p>Explore movies and save them to see them here.</p>
              <button className="gold-btn" onClick={() => navigate("/")}>
                Explore Movies
              </button>
            </div>
          )}
        </motion.section>

        {/* ── Favourite Movie ── */}
        <motion.section
          className="dash-card favourite-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className="card-header">
            <div>
              <p className="card-eyebrow">TOP PICK</p>
              <h2 className="card-title">Favourite Movie</h2>
            </div>
          </div>

          {watchlist.length > 0 ? (
            <div className="favourite-layout">
              <motion.div
                className="favourite-poster-wrap"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w342${watchlist[0].poster_path}`}
                  alt={watchlist[0].title}
                  className="favourite-poster"
                />
                <div className="favourite-poster-shine" />
              </motion.div>

              <div className="favourite-info">
                <span className="favourite-badge">⭐ Top of your list</span>
                <h3 className="favourite-title">{watchlist[0].title}</h3>

                <div className="favourite-meta-row">
                  <span className="meta-chip">
                    ⭐{" "}
                    {watchlist[0].vote_average
                      ? watchlist[0].vote_average.toFixed(1)
                      : "N/A"}
                  </span>
                  <span className="meta-chip">
                    📅{" "}
                    {watchlist[0].release_date
                      ? watchlist[0].release_date.slice(0, 4)
                      : "—"}
                  </span>
                  <span className="meta-chip">
                    🌎 {watchlist[0].original_language?.toUpperCase()}
                  </span>
                </div>

                <p className="favourite-overview">
                  {watchlist[0].overview
                    ? watchlist[0].overview.substring(0, 200) + "…"
                    : "No overview available."}
                </p>

                <div className="favourite-actions">
                  <button
                    className="gold-btn"
                    onClick={() => navigate(`/movie/${watchlist[0].movieId}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="ghost-btn"
                    onClick={() => navigate("/watchlist")}
                  >
                    Open Watchlist
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🍿</div>
              <h3>No favourite yet</h3>
              <p>
                Add movies to your watchlist and your top pick will appear here.
              </p>
            </div>
          )}
        </motion.section>

        {/* ── Achievements ── */}
        <motion.section
          className="dash-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <div className="card-header">
            <div>
              <p className="card-eyebrow">MILESTONES</p>
              <h2 className="card-title">Achievements</h2>
            </div>
            <span className="badge-count">
              {achievements.filter((a) => a.unlocked).length}/
              {achievements.length} unlocked
            </span>
          </div>

          <div className="achievement-grid">
            {achievements.map((badge) => (
              <motion.div
                key={badge.title}
                className={`achievement-badge ${
                  badge.unlocked ? "badge-unlocked" : "badge-locked"
                }`}
                whileHover={{ scale: 1.06, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="badge-icon-wrap">
                  <span className="badge-icon">{badge.icon}</span>
                  {badge.unlocked && <div className="badge-glow" />}
                </div>
                <p className="badge-title">{badge.title}</p>
                <p className="badge-desc">{badge.desc}</p>
                <span
                  className={`badge-status ${
                    badge.unlocked ? "status-unlocked" : "status-locked"
                  }`}
                >
                  {badge.unlocked ? "✓ Unlocked" : "Locked"}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Recent Activity ── */}
        <motion.section
          className="dash-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div className="card-header">
            <div>
              <p className="card-eyebrow">HISTORY</p>
              <h2 className="card-title">Recent Activity</h2>
            </div>
          </div>

          <div className="timeline">
            {[
              {
                icon: "🔥",
                title: "Current Streak",
                desc: (
                  <>
                    You're on a <strong>{streak}-day</strong> streak. Keep
                    solving CineChallenges daily!
                  </>
                ),
              },
              {
                icon: "🧠",
                title: "Quiz Progress",
                desc: (
                  <>
                    Completed <strong>{quizCount}</strong> movie{" "}
                    {quizCount === 1 ? "quiz" : "quizzes"} so far.
                  </>
                ),
              },
              {
                icon: "🎬",
                title: "Watchlist Updated",
                desc: (
                  <>
                    You've saved <strong>{watchlist.length}</strong>{" "}
                    {watchlist.length === 1 ? "movie" : "movies"} to your list.
                  </>
                ),
              },
              {
                icon: "📝",
                title: "Community Activity",
                desc: (
                  <>
                    You've published <strong>{posts.length}</strong>{" "}
                    {posts.length === 1 ? "post" : "posts"} to the community.
                  </>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="tl-left">
                  <div className="tl-icon">{item.icon}</div>
                  {i < 3 && <div className="tl-line" />}
                </div>
                <div className="tl-body">
                  <h4 className="tl-title">{item.title}</h4>
                  <p className="tl-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {listModal && userId && (
        <FollowListModal
          userId={userId}
          type={listModal}
          closeModal={() => setListModal(null)}
        />
      )}
    </div>
  );
};

export default Profile;
