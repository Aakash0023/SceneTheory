import { fetchMovieDetails } from "../api/tmdb";
import { useState, useEffect } from "react";
import QuizResults from "./QuizResults";
import { useParams } from "react-router-dom";
import { generateQuiz } from "../api/quiz";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [movieTitle, setMovieTitle] = useState("");
  const [backdropPath, setBackdropPath] = useState("");

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
        setBackdropPath(movie.backdrop_path);

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
      <div
        className="quiz-loading"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(0,0,0,0.75),
              rgba(0,0,0,0.9)
            ),
            url(https://image.tmdb.org/t/p/original${backdropPath})
          `,
        }}
      >
        <div className="quiz-loader-content">
          <h1>🧠 Preparing Your Movie Challenge</h1>

          <p>
            AI is analyzing <strong>{movieTitle || "this movie"}</strong>
            <br />
            and generating personalized questions...
          </p>

          <div className="loader"></div>
        </div>
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
