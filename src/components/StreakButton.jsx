import { useEffect, useState } from "react";
import { getCurrentStreak } from "../utils/streak";

const StreakButton = () => {
  const [streak, setStreak] = useState(getCurrentStreak());

  useEffect(() => {
    const handleStreakUpdate = () => {
      setStreak(getCurrentStreak());
    };

    window.addEventListener("streakUpdated", handleStreakUpdate);

    return () => {
      window.removeEventListener("streakUpdated", handleStreakUpdate);
    };
  }, []);

  return (
    <button className="streak-btn">
      🔥 {streak} {streak === 1 ? "Day" : "Days"} Streak
    </button>
  );
};

export default StreakButton;
