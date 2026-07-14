import dotenv from "dotenv";
dotenv.config();

import { groqChatCompletion } from "./groqClient.js";

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

  console.log(`[groqService] Quiz generated using model: ${modelUsed}`);

  return completion.choices[0].message.content;
};
