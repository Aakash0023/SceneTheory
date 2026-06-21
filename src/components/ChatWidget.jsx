import { useState } from "react";
import { Clapperboard } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Clapperboard size={20} />

        <span>Ask AI</span>
      </button>

      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <h3>🎬 SceneTheory AI</h3>
          </div>

          <div className="chat-messages">
            <div className="bot-message">
              Hi! I'm SceneTheory AI.
              <br />
              Ask me about:
              <br />
              • Movie recommendations
              <br />
              • Similar movies
              <br />
              • Movie explanations
              <br />• Genre suggestions
            </div>
          </div>

          <div className="chat-input-area">
            <input type="text" placeholder="Ask about movies..." />

            <button>Send</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
