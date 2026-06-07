import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./Pages/MovieDetails";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
