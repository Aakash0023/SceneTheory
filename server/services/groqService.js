import dotenv from "dotenv";
dotenv.config();

import { groqChatCompletion } from "./groqClient.js";

const extractJsonArray = (content) => {
  if (!content) return null;

  const withoutFences = content.replace(/```json/gi, "").replace(/```/g, "");

  const start = withoutFences.indexOf("[");
  const end = withoutFences.lastIndexOf("]");

  if (start === -1 || end === -1 || end < start) return null;

  const candidate = withoutFences.slice(start, end + 1);

  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
};

const isValidQuiz = (parsed) => {
  if (!Array.isArray(parsed) || parsed.length === 0) return false;

  return parsed.every(
    (q) =>
      q &&
      typeof q.question === "string" &&
      Array.isArray(q.options) &&
      q.options.length >= 2 &&
      typeof q.answer === "string"
  );
};

export const generateQuiz = async (title, overview) => {
  const { completion, modelUsed } = await groqChatCompletion({
    messages: [
      {
        role: "user",
        content: `
Generate exactly 5 movie quiz questions.

Movie Title:
${title}

Movie Overview:
${overview}

Respond with ONLY the raw JSON array below — no markdown code fences, no explanation, no extra text before or after it.

Format:

[
 {
   "question": "",
   "options": ["","","",""],
   "answer": ""
 }
]
`,
      },
    ],
    validate: (content) => isValidQuiz(extractJsonArray(content)),
  });

  console.log(`[groqService] Quiz generated using model: ${modelUsed}`);

  const parsed = extractJsonArray(completion.choices[0].message.content);

  return JSON.stringify(parsed);
};
