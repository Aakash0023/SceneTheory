import User from "../models/User.js";



export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isFollowing = req.user
      ? user.followers.some(
          (followerId) => followerId.toString() === req.user._id.toString()
        )
      : false;

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,

      watchlist: user.watchlist,
      watchlistCount: user.watchlist.length,

      quizCompleted: user.quizCompleted,
      postsCount: user.postsCount,
      streak: user.streak,

      followersCount: user.followers.length,
      followingCount: user.following.length,

      isFollowing,
      isOwnProfile: req.user
        ? req.user._id.toString() === user._id.toString()
        : false,

      joined: user.createdAt,
    });
  } catch (error) {
    console.error("GET USER BY ID ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch user profile",
    });
  }
};

// ======================================
// TOGGLE FOLLOW / UNFOLLOW
// ======================================

export const toggleFollow = async (req, res) => {
  try {
    const targetId = req.params.id;
    const currentUserId = req.user._id.toString();

    if (targetId === currentUserId) {
      return res.status(400).json({
        message: "You cannot follow yourself.",
      });
    }

    const targetUser = await User.findById(targetId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const alreadyFollowing = targetUser.followers.some(
      (id) => id.toString() === currentUserId
    );

    if (alreadyFollowing) {
      // Unfollow
      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId
      );

      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetId
      );
    } else {
      // Follow
      targetUser.followers.push(currentUserId);
      currentUser.following.push(targetId);
    }

    await targetUser.save();
    await currentUser.save();

    return res.status(200).json({
      success: true,
      isFollowing: !alreadyFollowing,
      followersCount: targetUser.followers.length,
      followingCount: currentUser.following.length,
    });
  } catch (error) {
    console.error("TOGGLE FOLLOW ERROR:", error);

    return res.status(500).json({
      message: "Failed to update follow status.",
    });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "followers",
      "username avatar bio"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(user.followers);
  } catch (error) {
    console.error("GET FOLLOWERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch followers.",
    });
  }
};

// ======================================
// GET FOLLOWING LIST
// ======================================

export const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "following",
      "username avatar bio"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    return res.status(200).json(user.following);
  } catch (error) {
    console.error("GET FOLLOWING ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch following list.",
    });
  }
};
