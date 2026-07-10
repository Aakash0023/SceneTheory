import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  updateQuizProgress,
  updateStreak,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/", authMiddleware, getProfile);

router.put("/", authMiddleware, updateProfile);

router.patch("/quiz", authMiddleware, updateQuizProgress);

router.patch("/streak", authMiddleware, updateStreak);

export default router;
