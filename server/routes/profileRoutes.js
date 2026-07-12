import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import optionalAuth from "../middleware/optionalAuth.js";

import {
  getProfile,
  updateProfile,
  updateQuizProgress,
  updateStreak,
} from "../controllers/profileController.js";
import {
  getUserById,
  toggleFollow,
  getFollowers,
  getFollowing,
} from "../controllers/followController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put("/", authMiddleware, upload.single("avatar"), updateProfile);

router.patch("/quiz", authMiddleware, updateQuizProgress);

router.patch("/streak", authMiddleware, updateStreak);

// ── Followers / Following ──────────────────────────────

router.get("/user/:id", optionalAuth, getUserById);

router.post("/follow/:id", authMiddleware, toggleFollow);

router.get("/followers/:id", getFollowers);

router.get("/following/:id", getFollowing);

export default router;
