import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const {
      movieId,
      movieTitle,
      moviePoster,
      movieYear,
      movieOverview,
      tmdbRating,
      rating,
      review,
      image,
    } = req.body;

    const post = await Post.create({
      user: req.user._id,
      username: req.user.username,
      avatar: req.user.avatar,

      movieId,
      movieTitle,
      moviePoster,
      movieYear,
      movieOverview,
      tmdbRating,
      rating,

      review,
      image,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create post",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({
      createdAt: -1,
    });

    res.json(posts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Delete failed",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text.trim()) {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    post.comments.push({
      user: req.user._id,
      username: req.user.username,
      avatar: req.user.avatar,
      text,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add comment",
    });
  }
};

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const alreadyLiked = post.likes.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== req.user._id.toString()
      );
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update like",
    });
  }
};
