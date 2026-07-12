import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import API from "../api/auth";
import FollowButton from "../components/FollowButton";
import FollowListModal from "../components/FollowListModal";
import "../styles/profile.css";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listModal, setListModal] = useState(null); // "followers" | "following" | null

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setLoading(true);

      try {
        const res = await API.get(`/profile/user/${userId}`);
        if (!cancelled) setProfile(res.data);
      } catch (error) {
        console.error(error);
        if (!cancelled) setProfile(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // If this happens to be your own profile, send people to the full
  // "/profile" dashboard instead of the public read-only view.
  useEffect(() => {
    if (profile?.isOwnProfile) {
      navigate("/profile", { replace: true });
    }
  }, [profile, navigate]);

  if (loading) {
    return (
      <div className="profile-root">
        <h1 style={{ color: "#fff", textAlign: "center", padding: "120px" }}>
          Loading Profile...
        </h1>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-root">
        <h1 style={{ color: "#fff", textAlign: "center", padding: "120px" }}>
          User not found
        </h1>
      </div>
    );
  }

  const stats = [
    { icon: "🔥", value: profile.streak, label: "Day Streak" },
    { icon: "🎬", value: profile.watchlistCount, label: "Watchlist" },
    { icon: "🧠", value: profile.quizCompleted, label: "Quizzes Done" },
    { icon: "📝", value: profile.postsCount, label: "Posts" },
  ];

  return (
    <div className="profile-root">
      {/* ─────────────────── HERO ─────────────────── */}
      <motion.section
        className="profile-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
      >
        <div className="hero-scanline" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-inner">
          <div className="avatar-wrap">
            <div className="avatar-ring">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="avatar-img"
                />
              ) : (
                <div className="avatar-placeholder">🎬</div>
              )}
            </div>
          </div>

          <div className="hero-identity">
            <div className="hero-eyebrow">SceneTheory Member</div>
            <h1 className="hero-name">{profile.username}</h1>
            <p className="hero-tagline">{profile.bio}</p>

            <div className="follow-counts-row">
              <button
                className="follow-count-btn"
                onClick={() => setListModal("followers")}
              >
                <strong>{profile.followersCount}</strong> Followers
              </button>
              <button
                className="follow-count-btn"
                onClick={() => setListModal("following")}
              >
                <strong>{profile.followingCount}</strong> Following
              </button>
            </div>

            <div className="follow-action-row">
              <FollowButton
                userId={profile._id}
                initialIsFollowing={profile.isFollowing}
                onChange={(isFollowing, followersCount) =>
                  setProfile((prev) => ({
                    ...prev,
                    isFollowing,
                    followersCount,
                  }))
                }
              />
            </div>
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

      {listModal && (
        <FollowListModal
          userId={profile._id}
          type={listModal}
          closeModal={() => setListModal(null)}
        />
      )}
    </div>
  );
};

export default UserProfile;
