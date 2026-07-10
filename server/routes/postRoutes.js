import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPost,
  getPosts,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", authMiddleware, createPost);

router.delete("/:id", authMiddleware, deletePost);

export default router;
