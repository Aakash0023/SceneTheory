import Post from "../models/Post.js";
import User from "../models/User.js";

// ======================================
// CREATE POST
// ======================================

export const createPost = async (req, res) => {
  try {
    const {
      movieId,
      movieTitle,
      moviePoster,
      movieYear,
      movieOverview,
      tmdbRating,
      userRating,
      review,
      image,
    } = req.body;

    if (!movieId || !movieTitle || !review) {
      return res.status(400).json({
        message: "Movie and review are required.",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const post = await Post.create({
      user: user._id,
      username: user.username,
      avatar: user.avatar,

      movieId,
      movieTitle,
      moviePoster,
      movieYear,
      movieOverview,
      tmdbRating,
      userRating,

      review,
      image: image || "",

      likes: [],
      comments: [],
    });

    user.postsCount += 1;
    await user.save();

    return res.status(201).json(post);
  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    return res.status(500).json({
      message: "Failed to create post.",
    });
  }
};

// ======================================
// GET POSTS
// ======================================

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("GET POSTS ERROR:", error);

    return res.status(500).json({
      message: "Failed to fetch posts.",
    });
  }
};

// ======================================
// TOGGLE LIKE
// ======================================

export const toggleLike = async (req, res) => {
  try {
    console.log("========== LIKE REQUEST ==========");
    console.log("Post ID:", req.params.id);
    console.log("User ID:", req.user?._id);

    const post = await Post.findById(req.params.id);

    console.log("Post Found:", post ? "YES" : "NO");

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    console.log("Likes Count:", post.likes.length);

    return res.status(200).json({
      success: true,
      likes: post.likes,
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("LIKE ERROR:", error);

    return res.status(500).json({
      message: "Failed to update like.",
      error: error.message,
    });
  }
};

// ======================================
// TOGGLE BOOKMARK
// ======================================

export const toggleBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const post = await Post.findById(req.params.id);

    if (!user || !post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    const alreadyBookmarked = user.bookmarks.some(
      (id) => id.toString() === post._id.toString()
    );

    if (alreadyBookmarked) {
      user.bookmarks = user.bookmarks.filter(
        (id) => id.toString() !== post._id.toString()
      );
    } else {
      user.bookmarks.push(post._id);
    }

    await user.save();

    res.status(200).json({
      bookmarks: user.bookmarks,
      bookmarked: !alreadyBookmarked,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update bookmark.",
    });
  }
};

// ======================================
// DELETE POST
// ======================================

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own post.",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        postsCount: -1,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete post.",
    });
  }
};

// ======================================
// ADD COMMENT
// ======================================

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty.",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    post.comments.push({
      user: req.user._id,
      username: req.user.username,
      avatar: req.user.avatar,
      text: text.trim(),
    });

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    console.error("COMMENT ERROR:", error);

    return res.status(500).json({
      message: "Failed to add comment.",
    });
  }
};
// ======================================
// GET USER PROFILE BY ID
// ======================================

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      joined: user.createdAt,
      watchlistCount: user.watchlist.length,
      postsCount: user.postsCount,
      streak: user.streak,
      quizCompleted: user.quizCompleted,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch profile.",
    });
  }
};
// ======================================
// GET POSTS BY USER
// ======================================

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.params.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to fetch user posts.",
    });
  }
};
