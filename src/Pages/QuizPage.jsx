import { fetchMovieDetails } from "../api/tmdb";
import { useState, useEffect } from "react";
import QuizResults from "./QuizResults";
import { useParams } from "react-router-dom";
import { generateQuiz } from "../api/quiz";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const movie = await fetchMovieDetails(movieId);

        setMovieTitle(movie.title);

        const data = await generateQuiz(movie.title, movie.overview);

        const cleaned = data.quiz.replace(/```json/g, "").replace(/```/g, "");

        setQuestions(JSON.parse(cleaned));
      } catch (error) {
        console.error("Quiz Generation Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [movieId]);

  if (loading) {
    return (
      <div className="quiz-page">
        <h1>Generating AI Quiz for {movieTitle || "Movie"}...</h1>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="quiz-page">
        <h1>Failed to generate quiz.</h1>
        <p>Please try again later.</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  if (quizFinished) {
    return (
      <QuizResults score={score} total={questions.length} movieId={movieId} />
    );
  }

  return (
    <div className="quiz-page">
      <h1>{movieTitle} Quiz</h1>

      <h2>
        Question {currentQuestion + 1} / {questions.length}
      </h2>

      <p>{question.question}</p>

      <div className="quiz-options">
        {question.options.map((option) => (
          <button
            key={option}
            className={
              selectedAnswer === option ? "primary-btn" : "secondary-btn"
            }
            onClick={() => setSelectedAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="primary-btn"
        onClick={() => {
          if (!selectedAnswer) {
            alert("Please select an answer!");
            return;
          }

          if (selectedAnswer === question.answer) {
            setScore((prev) => prev + 1);
          }

          setSelectedAnswer("");

          if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
          } else {
            setQuizFinished(true);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export default QuizPage;
