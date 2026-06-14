import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/community.css";

function CreatePost({ posts, setPosts }) {
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

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
      username: "Aakash",
      caption,
      image: preview,
      likes: 0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);

    navigate("/community");
  };

  return (
    <div className="community-page">
      <h1 className="community-title">Create Post</h1>

      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Share your movie thoughts..."
          className="caption-input"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}

        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
