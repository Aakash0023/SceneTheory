import User from "../models/User.js";
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,

      watchlist: user.watchlist,
      watchlistCount: user.watchlist.length,

      quizCompleted: user.quizCompleted,

      postsCount: user.postsCount,

      streak: user.streak,

      joined: user.createdAt,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,

        watchlist: user.watchlist,
        watchlistCount: user.watchlist.length,

        quizCompleted: user.quizCompleted,

        postsCount: user.postsCount,

        streak: user.streak,

        joined: user.createdAt,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update profile",
    });
  }
};

export const updateQuizProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.quizCompleted += 1;

    await user.save();

    res.status(200).json({
      message: "Quiz progress updated",
      quizCompleted: user.quizCompleted,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update quiz progress",
    });
  }
};

export const updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.streak += 1;

    await user.save();

    res.status(200).json({
      message: "Streak updated",
      streak: user.streak,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update streak",
    });
  }
};
