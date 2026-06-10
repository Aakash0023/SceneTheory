import { Link } from "react-router-dom";

const QuizResults = ({ score, total, movieId }) => {
  const getRank = () => {
    const percentage = (score / total) * 100;

    if (percentage >= 90) return "👑 SceneTheory Master";

    if (percentage >= 70) return "🎥 Cinephile";

    if (percentage >= 40) return "🎬 Movie Fan";

    return "🍿 Casual Viewer";
  };

  return (
    <div className="quiz-page">
      <h1>🎉 Quiz Complete</h1>

      <h2>
        Score: {score}/{total}
      </h2>

      <h3>{getRank()}</h3>

      <Link to={`/movie/${movieId}`} className="primary-btn">
        Back To Movie
      </Link>
      <Link to={`/movie/${movieId}/quiz`} className="secondary-btn">
        Try Again
      </Link>
    </div>
  );
};

export default QuizResults;
