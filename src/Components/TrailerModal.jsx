const TrailerModal = ({ trailerUrl, onClose }) => {
  if (!trailerUrl) return null;

  const embedUrl = trailerUrl.replace("watch?v=", "embed/");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <iframe
          width="100%"
          height="450"
          src={embedUrl}
          title="Trailer"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default TrailerModal;
