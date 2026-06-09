import dotenv from "dotenv";
dotenv.config();
console.log("GROQ KEY:", process.env.GROQ_API_KEY);

import Groq from "groq-sdk";

console.log("GROQ KEY LENGTH:", process.env.GROQ_API_KEY?.length);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY?.trim(),
});

export const generateQuiz = async (title, overview) => {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `
Generate exactly 5 movie quiz questions.

Movie Title:
${title}

Movie Overview:
${overview}

Return ONLY valid JSON.

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
  });

  return completion.choices[0].message.content;
};
