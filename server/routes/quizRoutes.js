import express from "express";
import { generateQuiz } from "../services/groqService.js";

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Quiz API working",
  });
});

router.post("/generate", async (req, res) => {
  try {
    const { title, overview } = req.body;

    const quiz = await generateQuiz(title, overview);

    res.json({
      quiz,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});
router.get("/ai-test", async (req, res) => {
  try {
    const quiz = await generateQuiz(
      "Interstellar",
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
    );

    res.json({
      quiz,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message,
    });
  }
});

export default router;
