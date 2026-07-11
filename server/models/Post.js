import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    username: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    movieId: {
      type: Number,
      required: true,
    },

    movieTitle: {
      type: String,
      required: true,
    },

    moviePoster: {
      type: String,
      default: "",
    },

    movieYear: {
      type: String,
      default: "",
    },

    movieOverview: {
      type: String,
      default: "",
    },

    tmdbRating: {
      type: Number,
      default: 0,
    },

    userRating: {
      type: Number,
      default: 0,
    },

    review: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
