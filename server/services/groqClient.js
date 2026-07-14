import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY?.trim(),
});

const MODEL_FALLBACK_CHAIN = [
  "openai/gpt-oss-120b",
  "qwen/qwen3.6-27b",
  "llama-3.3-70b-versatile",
  "openai/gpt-oss-20b",
  "llama-3.1-8b-instant",
];

export const groqChatCompletion = async (
  { messages, options = {} },
  models = MODEL_FALLBACK_CHAIN
) => {
  let lastError;

  for (const model of models) {
    try {
      const completion = await groq.chat.completions.create({
        model,
        messages,
        ...options,
      });

      return {
        completion,
        modelUsed: model,
      };
    } catch (error) {
      lastError = error;

      const reason =
        error?.status ||
        error?.error?.message ||
        error?.message ||
        "unknown error";

      console.warn(
        `[groqClient] Model "${model}" failed (${reason}). Falling back to next model...`
      );
    }
  }

  console.error(
    `[groqClient] All ${models.length} Groq models failed. Last error:`,
    lastError
  );

  throw lastError;
};

export default groqChatCompletion;
