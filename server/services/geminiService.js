import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateQuiz = async (title, overview) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
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
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};
