const MovieCard = ({ title, year, image }) => {
  return (
    <div className="poster-card">
      <img src={image} alt={title} className="poster-image" />

      <div className="poster-overlay">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
