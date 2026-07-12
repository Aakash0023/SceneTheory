import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const { q } = req.query;

    const filter = {};

    if (q && q.trim()) {
      filter.username = { $regex: q.trim(), $options: "i" };
    }

    if (req.user) {
      filter._id = { $ne: req.user._id };
    }

    const users = await User.find(filter)
      .select("username avatar bio followers postsCount")
      .sort({ createdAt: -1 })
      .limit(50);

    const shaped = users.map((u) => ({
      _id: u._id,
      username: u.username,
      avatar: u.avatar,
      bio: u.bio,
      postsCount: u.postsCount,
      followersCount: u.followers.length,
      isFollowing: req.user
        ? u.followers.some((id) => id.toString() === req.user._id.toString())
        : false,
    }));

    return res.status(200).json(shaped);
  } catch (error) {
    console.error("GET ALL USERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch users.",
    });
  }
};

// ======================================
// SUGGESTED USERS (people you don't follow yet)
// ======================================

export const getSuggestedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    const excludeIds = [req.user._id, ...currentUser.following];

    const suggestions = await User.aggregate([
      { $match: { _id: { $nin: excludeIds } } },
      { $sample: { size: 5 } },
      {
        $project: {
          username: 1,
          avatar: 1,
          bio: 1,
          followersCount: { $size: "$followers" },
        },
      },
    ]);

    return res.status(200).json(suggestions);
  } catch (error) {
    console.error("GET SUGGESTED USERS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch suggestions.",
    });
  }
};

// ======================================
// GET PUBLIC PROFILE (any user, by id)
// ======================================

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

// ======================================
// GET FOLLOWERS LIST
// ======================================

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
