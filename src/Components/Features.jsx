import {
  Clapperboard,
  Brain,
  MessageSquare,
  Star,
  Bookmark,
  User,
} from "lucide-react";
const features = [
  {
    icon: <Clapperboard size={40} />,
    title: "Smart Recommendations",
    description: "Movies picked based on your taste.",
  },
  {
    icon: <Brain size={40} />,
    title: "Movie Quizzes",
    description: "Challenge your movie knowledge.",
  },
  {
    icon: <MessageSquare size={40} />,
    title: "Community Discussions",
    description: "Talk with cinema lovers.",
  },
  {
    icon: <Star size={40} />,
    title: "Reviews & Ratings",
    description: "Share your thoughts on films.",
  },
  {
    icon: <Bookmark size={40} />,
    title: "Watchlists",
    description: "Save movies for later.",
  },
  {
    icon: <User size={40} />,
    title: "Personalized Profiles",
    description: "Show your cinematic journey.",
  },
];
const Features = () => {
  return (
    <section id="quizzes" className="features-section">
      <div className="section-header">
        <p className="section-eyebrow">Why SceneTheory</p>

        <h2 className="section-title">More Than Movie Recommendations</h2>
      </div>

      <div className="features-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
