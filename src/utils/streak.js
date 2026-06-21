export const getCurrentStreak = () => {
  return Number(localStorage.getItem("cineStreak")) || 0;
};

export const updateStreak = () => {
  const today = new Date().toDateString();

  const lastSolved = localStorage.getItem("lastSolvedDate");

  let streak = Number(localStorage.getItem("cineStreak")) || 0;

  if (!lastSolved) {
    streak = 1;
  } else {
    const lastDate = new Date(lastSolved);
    const currentDate = new Date(today);

    const diffDays = Math.floor(
      (currentDate - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      streak += 1;
    } else if (diffDays > 1) {
      streak = 1;
    }
  }

  localStorage.setItem("cineStreak", streak);
  localStorage.setItem("lastSolvedDate", today);

  return streak;
};
