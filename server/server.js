import dotenv from "dotenv";
dotenv.config();
import quizRoutes from "./routes/quizRoutes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
dotenv.config();

console.log("GROQ:", process.env.GROQ_API_KEY);
