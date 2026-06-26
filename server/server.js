import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();


connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("SceneTheory Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

console.log("GROQ:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");
