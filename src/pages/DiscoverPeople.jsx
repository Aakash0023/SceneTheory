import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiSearchLine, RiUserSearchLine } from "react-icons/ri";

import API from "../api/auth";
import FollowButton from "../components/FollowButton";
import "../styles/profile.css";
import "../styles/discover.css";

const DiscoverPeople = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const debounceTimer = useRef(null);

  const loadUsers = async (query = "") => {
    setLoading(true);

    try {
      const res = await API.get("/profile/all", {
        params: query ? { q: query } : {},
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialUsers = async () => {
      try {
        const res = await API.get("/profile/all");
        if (!cancelled) setUsers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadInitialUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      loadUsers(value);
    }, 350);
  };

  return (
    <div className="discover-people-page">
      <motion.section
        className="discover-people-hero"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">CINECOMMUNITY</p>
        <h1>
          Find <span>Cinephiles</span> to Follow
        </h1>
        <p className="discover-people-subtitle">
          Search for movie lovers by username, or browse the community and
          follow the people whose taste matches yours.
        </p>

        <div className="people-search-box">
          <RiSearchLine />
          <input
            type="text"
            placeholder="Search by username..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </motion.section>

      <div className="people-grid">
        {loading ? (
          <p className="people-status">Loading people...</p>
        ) : users.length ? (
          users.map((u, i) => (
            <motion.div
              className="person-card"
              key={u._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4) }}
              whileHover={{ y: -6 }}
            >
              <div
                className="person-card-clickable"
                onClick={() => navigate(`/profile/${u._id}`)}
              >
                <div className="person-avatar">
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.username} />
                  ) : (
                    <div className="person-avatar-placeholder">🎬</div>
                  )}
                </div>

                <h3>{u.username}</h3>
                <p className="person-bio">{u.bio}</p>

                <div className="person-meta">
                  <span>{u.followersCount} followers</span>
                  <span>•</span>
                  <span>{u.postsCount} posts</span>
                </div>
              </div>

              <FollowButton userId={u._id} initialIsFollowing={u.isFollowing} />
            </motion.div>
          ))
        ) : (
          <div className="people-empty">
            <RiUserSearchLine />
            <h2>No one found</h2>
            <p>Try a different username.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverPeople;
