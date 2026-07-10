import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPost,
  getPosts,
  deletePost,
  addComment,
  toggleLike,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", authMiddleware, createPost);

router.delete("/:id", authMiddleware, deletePost);

router.patch("/:id/like", authMiddleware, toggleLike);

router.post("/:id/comment", authMiddleware, addComment);

export default router;
