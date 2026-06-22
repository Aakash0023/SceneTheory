import {
  Clapperboard,
  Brain,
  MessageSquare,
  Star,
  Bookmark,
  User,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    icon: <Clapperboard size={40} />,
    title: "SceneTheory AI",
    description:
      "Ask AI for recommendations, movie explanations, hidden gems and more.",
  },

  {
    icon: <Brain size={40} />,
    title: "AI Movie Quizzes",
    description: "Generate personalized quizzes for any movie instantly.",
  },

  {
    icon: <MessageSquare size={40} />,
    title: "CineCommunity",
    description:
      "Discuss movies, share reviews and connect with cinema lovers.",
  },

  {
    icon: <Star size={40} />,
    title: "Daily CineChallenge",
    description: "Solve movie riddles every day and maintain your streak.",
  },

  {
    icon: <Bookmark size={40} />,
    title: "My Collection",
    description:
      "Build your personal movie library and track what to watch next.",
  },

  {
    icon: <User size={40} />,
    title: "Actor & Genre Discovery",
    description: "Explore films by actors, genres and cinematic universes.",
  },
];

const Features = () => {
  return (
    <section id="quizzes" className="features-section">
      <div className="section-header">
        <p className="section-eyebrow">Why SceneTheory</p>

        <h2 className="section-title">Your Personal AI Cinema Companion</h2>

        <p className="features-subtitle">
          Discover movies, challenge yourself with quizzes, build collections
          and explore cinema with AI-powered experiences.
        </p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="feature-card"
            initial={{
              opacity: 0,
              y: 60,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            viewport={{ once: true }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
          >
            <div className="feature-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
