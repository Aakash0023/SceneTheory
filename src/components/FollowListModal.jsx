import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { RiCloseLine, RiUserFollowLine } from "react-icons/ri";

import API from "../api/auth";
// Reuses the .comments-overlay / .comments-modal styles defined here.
import "../styles/community.css";

/**
 * Props:
 * - userId: whose followers/following we're listing
 * - type: "followers" | "following"
 * - closeModal: () => void
 */
const FollowListModal = ({ userId, type, closeModal }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadList = async () => {
      try {
        const res = await API.get(`/profile/${type}/${userId}`);
        if (!cancelled) setUsers(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadList();

    return () => {
      cancelled = true;
    };
  }, [userId, type]);

  const goToProfile = (id) => {
    closeModal();
    navigate(`/profile/${id}`);
  };

  return (
    <div className="comments-overlay" onClick={closeModal}>
      <motion.div
        className="comments-modal follow-list-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="comments-header">
          <div>
            <h2>
              <RiUserFollowLine />
              {type === "followers" ? "Followers" : "Following"}
            </h2>
            <p>
              {users.length} {type === "followers" ? "Followers" : "Following"}
            </p>
          </div>

          <button onClick={closeModal} className="close-comments">
            <RiCloseLine />
          </button>
        </div>

        <div className="comments-list">
          {loading ? (
            <div className="no-comments">
              <p>Loading...</p>
            </div>
          ) : users.length ? (
            users.map((u) => (
              <div
                className="comment-card follow-list-item"
                key={u._id}
                onClick={() => goToProfile(u._id)}
              >
                <div className="comment-avatar">
                  {u.avatar ? (
                    <img
                      src={u.avatar}
                      alt={u.username}
                      className="comment-avatar-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = "🎬";
                      }}
                    />
                  ) : (
                    "🎬"
                  )}
                </div>

                <div className="comment-content">
                  <div className="comment-top">
                    <h4>{u.username}</h4>
                  </div>
                  {u.bio && <p>{u.bio}</p>}
                </div>
              </div>
            ))
          ) : (
            <div className="no-comments">
              <RiUserFollowLine />
              <h3>No {type === "followers" ? "followers" : "following"} yet</h3>
              <p>
                {type === "followers"
                  ? "When people follow this account, they'll show up here."
                  : "Accounts this user follows will show up here."}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FollowListModal;
