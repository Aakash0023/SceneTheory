import { useState } from "react";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: Date.now(),
      caption,
      image: preview,
      createdAt: new Date().toISOString(),
    };

    const existingPosts =
      JSON.parse(localStorage.getItem("communityPosts")) || [];

    localStorage.setItem(
      "communityPosts",
      JSON.stringify([newPost, ...existingPosts])
    );

    alert("Post published successfully!");

    setCaption("");
    setPreview(null);
  };

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
};

export default CreatePost;
