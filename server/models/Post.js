import mongoose from "mongoose";

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

    rating: {
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

    comments: [
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
          default: "",
        },

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
