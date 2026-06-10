const API_URL = import.meta.env.VITE_API_URL;

export const generateQuiz = async (title, overview) => {
  const response = await fetch(`${API_URL}/api/quiz/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      overview,
    }),
  });

  return response.json();
};
