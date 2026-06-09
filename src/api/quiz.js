export const generateQuiz = async (title, overview) => {
  const response = await fetch("http://localhost:5000/api/quiz/generate", {
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
