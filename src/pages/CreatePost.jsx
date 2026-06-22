return (
  <div className="create-post-page">
    <div className="create-post-card">
      <p className="section-eyebrow">CINECOMMUNITY</p>

      <h1>Create Post</h1>

      <p className="create-post-subtitle">
        Share your movie thoughts, reviews and theories.
      </p>

      <form className="create-post-form" onSubmit={handleSubmit}>
        <textarea
          placeholder="What movie is on your mind today?"
          className="caption-input"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}

        <button type="submit" className="create-post-submit">
          Publish Post
        </button>
      </form>
    </div>
  </div>
);
