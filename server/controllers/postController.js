import Post from "../models/Post.js";
import User from "../models/User.js";

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

    const populatedPost = await Post.findById(post._id);

    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("CREATE POST ERROR:", error);

    res.status(500).json({
      message: "Failed to create post.",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error("GET POSTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch posts.",
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    console.log("LIKE REQUEST");
    console.log("Post ID:", req.params.id);
    console.log("User:", req.user?._id);

    const post = await Post.findById(req.params.id);

    console.log("Post:", post);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    if (!Array.isArray(post.likes)) {
      post.likes = [];
    }

    const userId = req.user._id.toString();

    const alreadyLiked = post.likes.some((id) => id.toString() === userId);

    console.log("Already liked:", alreadyLiked);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    const updatedPost = await Post.findById(req.params.id);

    console.log("Updated likes:", updatedPost.likes.length);

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("LIKE ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

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

    const updatedPost = await Post.findById(post._id);

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error("COMMENT ERROR:", error);

    res.status(500).json({
      message: "Failed to add comment.",
    });
  }
};

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
        message: "You can only delete your own posts.",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    await User.findByIdAndUpdate(req.user._id, {
      $inc: {
        postsCount: -1,
      },
    });

    res.status(200).json({
      message: "Post deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete post.",
    });
  }
};
