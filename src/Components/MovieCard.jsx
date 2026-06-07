const MovieCard = ({ title, year, image }) => {
  return (
    <div className="poster-card">
      <img src={image} alt={title} className="poster-image" />
    </div>
  );
};

export default MovieCard;
