const GenreFilter = ({ genres, onSelectGenre }) => {
  return (
    <div className="genre-filter">
      <button onClick={() => onSelectGenre(null)}>All</button>

      {genres.map((genre) => (
        <button key={genre.id} onClick={() => onSelectGenre(genre.id)}>
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
