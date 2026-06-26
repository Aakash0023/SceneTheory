import { useState } from "react";
import { motion } from "framer-motion";
import { RiImageAddLine, RiSendPlaneFill } from "react-icons/ri";

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

    if (!caption.trim()) {
      alert("Please write something first!");
      return;
    }

    const newPost = {
      id: Date.now(),
      username: "Aakash",
      avatar: "🎬",
      caption,
      image: preview,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    };

    const existingPosts =
      JSON.parse(localStorage.getItem("communityPosts")) || [];

    localStorage.setItem(
      "communityPosts",
      JSON.stringify([newPost, ...existingPosts])
    );

    alert("🎉 Review Published!");

    setCaption("");
    setPreview(null);
  };

  return (
    <div className="create-post-page">
      <motion.div
        className="create-post-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-eyebrow">CINECOMMUNITY</p>

        <h1>Share Your Movie Story</h1>

        <p className="create-post-subtitle">
          Write reviews, recommend hidden gems, discuss fan theories and inspire
          fellow movie lovers.
        </p>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Write a review, theory or recommendation..."
            className="caption-input"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <label className="upload-image-btn">
            <RiImageAddLine />
            Add Movie Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <motion.div
              className="preview-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img src={preview} alt="Preview" className="preview-image" />
            </motion.div>
          )}

          <button type="submit" className="publish-btn">
            <RiSendPlaneFill />
            Publish Review
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
