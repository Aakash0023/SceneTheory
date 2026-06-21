import { useState } from "react";

const CineChallenge = () => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <section className="cine-challenge">
      <div className="challenge-badge">DAILY CINECHALLENGE</div>

      <h2>Can You Guess The Movie?</h2>

      <p className="challenge-riddle">
        "I travel through dreams to steal ideas."
      </p>

      {!showAnswer ? (
        <div className="challenge-btn-container">
          <button className="primary-btn" onClick={() => setShowAnswer(true)}>
            Reveal Answer
          </button>
        </div>
      ) : (
        <div className="challenge-answer">🎬 Inception</div>
      )}
    </section>
  );
};

export default CineChallenge;
