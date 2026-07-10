import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { movieId, movieTitle, review, image } = req.body;

    const post = await Post.create({
      user: req.user._id,
      username: req.user.username,
      avatar: req.user.avatar,

      movieId,
      movieTitle,
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
