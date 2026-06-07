import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import TrendingMovies from "../Components/TrendingMovies";
import Features from "../Components/Features";
import Footer from "../Components/Footer";
import Community from "../Components/Community";
import Watchlists from "../Components/Watchlists";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingMovies />
      <Features />
      <Community />
      <Watchlists />
      <Footer />
    </>
  );
};

export default Home;
