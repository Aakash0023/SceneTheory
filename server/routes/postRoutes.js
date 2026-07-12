import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createPost,
  getPosts,
  getUserPosts,
  deletePost,
  addComment,
  toggleLike,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/test", (req, res) => {
  res.json({
    message: "Posts route working!",
  });
});

router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like", authMiddleware, toggleLike);
router.post("/:id/comment", authMiddleware, addComment);


export default router;
