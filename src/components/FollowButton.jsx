import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/auth";
// .follow-btn styles live here; import so this works from any page.
import "../styles/profile.css";

/**
 * Follow / Unfollow toggle button.
 *
 * Props:
 * - userId: the profile owner's user id (the person being followed)
 * - initialIsFollowing: boolean
 * - onChange: (isFollowing, followersCount) => void  — called after a
 *   successful toggle so parent pages can update their own counts
 */
const FollowButton = ({ userId, initialIsFollowing = false, onChange }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  const loggedIn = Boolean(localStorage.getItem("token"));

  const toggleFollow = async () => {
    if (!loggedIn) {
      toast.error("Please log in to follow people.");
      return;
    }

    if (loading) return;

    setLoading(true);

    // optimistic update
    const previous = isFollowing;
    setIsFollowing(!previous);

    try {
      const res = await API.post(`/profile/follow/${userId}`);

      setIsFollowing(res.data.isFollowing);
      onChange?.(res.data.isFollowing, res.data.followersCount);

      toast.success(res.data.isFollowing ? "Following!" : "Unfollowed.");
    } catch (error) {
      console.error(error);
      setIsFollowing(previous);
      toast.error(
        error.response?.data?.message || "Failed to update follow status."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`follow-btn ${isFollowing ? "following" : ""}`}
      onClick={toggleFollow}
      disabled={loading}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
