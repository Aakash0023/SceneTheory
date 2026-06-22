import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchActorDetails, fetchActorMovies } from "../api/tmdb";

const ActorDetails = () => {
  const { actorId } = useParams();

  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const loadActor = async () => {
      const actorData = await fetchActorDetails(actorId);

      const movieData = await fetchActorMovies(actorId);

      setActor(actorData);

      setMovies(movieData.filter((movie) => movie.poster_path).slice(0, 12));
    };

    loadActor();
  }, [actorId]);

  if (!actor) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="actor-page">
      <div className="actor-header">
        <img
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          alt={actor.name}
          className="actor-image"
        />

        <div>
          <h1>{actor.name}</h1>

          <p>{actor.biography}</p>
        </div>
      </div>

      <h2>Known For</h2>

      <div className="trending-grid">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="poster-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ActorDetails;
