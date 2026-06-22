import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import MouseGlow from "./components/MouseGlow";
import ChatWidget from "./components/ChatWidget";

import MovieDetails from "./pages/MovieDetails.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import Community from "./pages/Community";
import CreatePost from "./pages/CreatePost";
import ActorDetails from "./pages/ActorDetails";
function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: "Aakash",
      caption:
        "Interstellar is still one of the greatest sci-fi movies ever 🚀",
      image: "https://picsum.photos/600/400",
      likes: 24,
      comments: 8,
    },
  ]);

  return (
    <BrowserRouter>
      <MouseGlow />

      <ChatWidget />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/movie/:movieId" element={<MovieDetails />} />

        <Route path="/watchlist" element={<Watchlist />} />

        <Route path="/movie/:movieId/quiz" element={<QuizPage />} />

        <Route
          path="/community"
          element={<Community posts={posts} setPosts={setPosts} />}
        />

        <Route
          path="/create-post"
          element={<CreatePost posts={posts} setPosts={setPosts} />}
        />
        <Route path="/actor/:actorId" element={<ActorDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
