import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCurrentStreak } from "../utils/streak";

const Profile = () => {
  const navigate = useNavigate();

  const [streak, setStreak] = useState(0);
  const [watchlist, setWatchlist] = useState([]);
  const [posts, setPosts] = useState([]);
  const [quizCount, setQuizCount] = useState(0);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    setStreak(getCurrentStreak());

    setWatchlist(
      JSON.parse(localStorage.getItem("watchlist")) || []
    );

    setPosts(
      JSON.parse(localStorage.getItem("communityPosts")) || []
    );

    setQuizCount(
      Number(localStorage.getItem("quizCompleted")) || 0
    );

    setProfilePic(
      localStorage.getItem("profilePicture") || ""
    );
  }, []);
  const handleProfilePicture = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    localStorage.setItem(
      "profilePicture",
      reader.result
    );

    setProfilePic(reader.result);
  };

  reader.readAsDataURL(file);
};

const totalPoints =
  streak +
  watchlist.length +
  quizCount +
  posts.length;

const level = Math.max(
  1,
  Math.floor(totalPoints / 3)
);

const xp = totalPoints * 20;
return (
<div className="profile-page">

<motion.section

className="profile-hero"

initial={{opacity:0}}

animate={{opacity:1}}

transition={{duration:.8}}

>

<div className="hero-overlay">

<div className="hero-left">

{profilePic ?

<img

src={profilePic}

className="profile-avatar-img"

alt="profile"

/>

:

<div className="profile-avatar">

🎬

</div>

}

<label className="upload-btn">

📷 Change Photo

<input

type="file"

hidden

accept="image/*"

onChange={handleProfilePicture}

/>

</label>

</div>

<div className="hero-right">

<h1>Aakash</h1>

<p>

Movie Explorer

•

SceneTheory Member

</p>

<div className="level-pill">

🎖 Level {level}

</div>

<div className="xp-wrapper">

<div className="xp-bar">

<motion.div

className="xp-fill"

initial={{width:0}}

animate={{

width:`${xp%100}%`

}}

transition={{duration:1}}

/>

</div>

<span>{xp} XP</span>

</div>

</div>

</div>

</motion.section>

<motion.section

className="premium-stats"

initial={{opacity:0,y:60}}

whileInView={{opacity:1,y:0}}

transition={{duration:.6}}

>

<div className="stat-card">

🔥

<h2>{streak}</h2>

<p>Current Streak</p>

</div>

<div className="stat-card">

🎬

<h2>{watchlist.length}</h2>

<p>Watchlist</p>

</div>

<div className="stat-card">

🧠

<h2>{quizCount}</h2>

<p>Quizzes</p>

</div>

<div className="stat-card">

📝

<h2>{posts.length}</h2>

<p>Community Posts</p>

</div>

</motion.section>

<div className="profile-container">

<section className="continue-section">

<div className="section-header">

<h2>

Continue Watching

</h2>

</div>

<div className="continue-row">

{watchlist.length ?

watchlist.slice(0,6).map(movie=>(

<div

className="continue-card"

key={movie.id}

onClick={()=>navigate(`/movie/${movie.id}`)}

>

<img

src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

alt={movie.title}

/>

<p>

{movie.title}

</p>

</div>

))

:

<p>

No movies added yet.

</p>

}

</div>

</section>