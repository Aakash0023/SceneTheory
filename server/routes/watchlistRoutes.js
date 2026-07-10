import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.get("/", authMiddleware, getWatchlist);

router.post("/add", authMiddleware, addToWatchlist);

router.delete("/:movieId", authMiddleware, removeFromWatchlist);

export default router;
