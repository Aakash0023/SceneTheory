import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { Star, Calendar, MapPin } from "lucide-react";

import { fetchActorDetails, fetchActorMovies } from "../api/tmdb";

const ActorDetails = () => {
  const { actorId } = useParams();

  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    const loadActor = async () => {
      try {
        const actorData = await fetchActorDetails(actorId);

        const movieData = await fetchActorMovies(actorId);

        setActor(actorData);

        setMovies(movieData.filter((movie) => movie.poster_path).slice(0, 12));
      } catch (error) {
        console.error("Failed to load actor:", error);
      }
    };

    loadActor();
  }, [actorId]);

  if (!actor) {
    return <div className="actor-loading">Loading Actor...</div>;
  }

  return (
    <div className="actor-page">
      <section className="actor-hero">
        <img
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          className="actor-image"
        />

        <div className="actor-info">
          <p className="actor-role">Actor • Film Personality</p>

          <h1>{actor.name}</h1>

          <div className="actor-stats">
            <div className="stat-card">
              <Star size={18} />

              <span>Popularity: {Math.round(actor.popularity)}</span>
            </div>

            <div className="stat-card">
              <Calendar size={18} />

              <span>{actor.birthday || "Unknown"}</span>
            </div>

            <div className="stat-card">
              <MapPin size={18} />

              <span>{actor.place_of_birth || "Unknown"}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="actor-bio-section">
        <h2>Biography</h2>

        <p>
          {showFullBio
            ? actor.biography
            : actor.biography.slice(0, 350) + "..."}
        </p>

        {actor.biography.length > 350 && (
          <button
            className="actor-readmore-btn"
            onClick={() => setShowFullBio(!showFullBio)}
          >
            {showFullBio ? "Show Less" : "Read More"}
          </button>
        )}
      </section>

      <section className="actor-movies-section">
        <h2>Known For</h2>

        <div className="actor-movies-grid">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="movie-link"
            >
              <div className="poster-card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="poster-image"
                />

                <div className="movie-meta">
                  <h4>{movie.title}</h4>

                  <span>{movie.release_date?.split("-")[0]}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ActorDetails;
