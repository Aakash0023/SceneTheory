import User from "../models/User.js";

export const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json(user.watchlist);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch watchlist",
    });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const movie = req.body;

    const user = await User.findById(req.user._id);

    const exists = user.watchlist.find(
      (item) => item.movieId === movie.movieId
    );

    if (exists) {
      return res.status(400).json({
        message: "Movie already in watchlist",
      });
    }

    user.watchlist.push(movie);

    await user.save();

    res.status(200).json({
      message: "Movie added successfully",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add movie",
    });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;

    const user = await User.findById(req.user._id);

    user.watchlist = user.watchlist.filter((movie) => movie.movieId != movieId);

    await user.save();

    res.status(200).json({
      message: "Movie removed",
      watchlist: user.watchlist,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to remove movie",
    });
  }
};
