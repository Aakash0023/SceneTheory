import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const QuizResults = ({ score, total, movieId }) => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

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

      <p className="redirect-msg">
        Returning to Home in {countdown} seconds...
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <Link to="/" className="primary-btn">
          🏠 Home
        </Link>

        <Link to={`/movie/${movieId}/quiz`} className="secondary-btn">
          🔄 Play Again
        </Link>
      </div>
    </div>
  );
};

export default QuizResults;
