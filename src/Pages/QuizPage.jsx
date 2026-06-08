import { useState } from "react";
import QuizResults from "./QuizResults";
import { useParams } from "react-router-dom";

const sampleQuestions = [
  {
    question: "Who is Cooper's daughter?",
    options: ["Murph", "Brand", "Mann", "Romilly"],
    answer: "Murph",
  },
  {
    question: "Which planet had the giant waves?",
    options: ["Miller", "Earth", "Mann", "Edmunds"],
    answer: "Miller",
  },
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const question = sampleQuestions[currentQuestion];
  const { movieId } = useParams();
  const [quizFinished, setQuizFinished] = useState(false);
  if (quizFinished) {
    return (
      <QuizResults
        score={score}
        total={sampleQuestions.length}
        movieId={movieId}
      />
    );
  }

  return (
    <div className="quiz-page">
      <h1>Movie Quiz</h1>

      <h2>
        Question {currentQuestion + 1} / {sampleQuestions.length}
      </h2>

      <p>{question.question}</p>

      <div className="quiz-options">
        {question.options.map((option) => (
          <button
            key={option}
            className="secondary-btn"
            onClick={() => setSelectedAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <button
        className="primary-btn"
        onClick={() => {
          if (selectedAnswer === question.answer) {
            setScore((prev) => prev + 1);
          }

          setSelectedAnswer("");

          if (currentQuestion < sampleQuestions.length - 1) {
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
