import { useState } from "react";
import { updateStreak } from "../utils/streak";

const challenges = [
  {
    riddle: "I travel through dreams to steal ideas.",
    answer: "Inception",
  },
  {
    riddle: "I communicate through a bookshelf.",
    answer: "Interstellar",
  },
  {
    riddle: "I fight in an underground club.",
    answer: "Fight Club",
  },
  {
    riddle: "I am vengeance.",
    answer: "The Batman",
  },
  {
    riddle: "I snap my fingers and erase half the universe.",
    answer: "Avengers: Infinity War",
  },
];

const CineChallenge = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("");

  const currentChallenge = challenges[currentIndex];

  const checkAnswer = () => {
    if (!guess.trim()) return;

    if (guess.trim().toLowerCase() === currentChallenge.answer.toLowerCase()) {
      setResult("correct");

      updateStreak();

      window.dispatchEvent(new Event("streakUpdated"));
    } else {
      setResult("wrong");
    }
  };

  const nextChallenge = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * challenges.length);
    } while (randomIndex === currentIndex);

    setCurrentIndex(randomIndex);

    setShowAnswer(false);

    setGuess("");

    setResult("");
  };

  return (
    <section className="cine-challenge">
      <div className="challenge-badge">DAILY CINECHALLENGE</div>

      <h2>Can You Guess The Movie?</h2>

      <p className="challenge-counter">
        Challenge {currentIndex + 1} of {challenges.length}
      </p>

      <p className="challenge-riddle">"{currentChallenge.riddle}"</p>

      {!result && (
        <div className="guess-container">
          <input
            type="text"
            placeholder="Enter your guess..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="guess-input"
          />

          <button className="primary-btn" onClick={checkAnswer}>
            Submit Guess
          </button>
        </div>
      )}

      {result === "correct" && (
        <>
          <div className="challenge-correct">✅ Correct!</div>

          <div className="challenge-answer">🎬 {currentChallenge.answer}</div>

          <div className="challenge-btn-container">
            <button className="secondary-btn" onClick={nextChallenge}>
              Next Challenge
            </button>
          </div>
        </>
      )}

      {result === "wrong" && !showAnswer && (
        <>
          <div className="challenge-wrong">❌ Wrong Guess</div>

          <div className="challenge-btn-container">
            <button className="primary-btn" onClick={() => setShowAnswer(true)}>
              Reveal Answer
            </button>
          </div>
        </>
      )}

      {showAnswer && result === "wrong" && (
        <>
          <div className="challenge-answer">🎬 {currentChallenge.answer}</div>

          <div className="challenge-btn-container">
            <button className="secondary-btn" onClick={nextChallenge}>
              Next Challenge
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default CineChallenge;
