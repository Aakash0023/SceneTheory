import { motion } from "framer-motion";
import { MessageSquare, Star, Brain } from "lucide-react";

const Community = () => {
  const cards = [
    {
      icon: <MessageSquare size={35} />,
      title: "Discussions",
      description: "Debate fan theories and endings.",
    },
    {
      icon: <Star size={35} />,
      title: "Reviews",
      description: "Share your thoughts on movies.",
    },
    {
      icon: <Brain size={35} />,
      title: "Quizzes",
      description: "Challenge fellow cinephiles.",
    },
  ];

  return (
    <section id="community" className="features-section">
      <div className="section-header">
        <p className="section-eyebrow">Community</p>

        <h2 className="section-title">Connect With Film Lovers</h2>
      </div>

      <p className="hero-description">
        Discuss theories, reviews and hidden details with fellow cinephiles.
      </p>

      <div className="hero-stats">
        <div className="stat">
          <h3>1.2M+</h3>
          <p>Members</p>
        </div>

        <div className="stat">
          <h3>150K+</h3>
          <p>Reviews</p>
        </div>

        <div className="stat">
          <h3>9.4K+</h3>
          <p>Quizzes</p>
        </div>
      </div>

      <div className="features-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="feature-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
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
            <div className="feature-icon">{card.icon}</div>

            <h3>{card.title}</h3>

            <p>{card.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Community;
