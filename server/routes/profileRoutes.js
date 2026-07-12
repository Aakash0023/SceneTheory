import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getProfile,
  getUserProfile,
  updateProfile,
  updateQuizProgress,
  updateStreak,
} from "../controllers/profileController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.get("/:id", getUserProfile);

router.put("/", authMiddleware, upload.single("avatar"), updateProfile);

router.patch("/quiz", authMiddleware, updateQuizProgress);

router.patch("/streak", authMiddleware, updateStreak);

export default router;
