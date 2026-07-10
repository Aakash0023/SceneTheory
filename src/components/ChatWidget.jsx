import { useState, useRef, useEffect } from "react";
import { Clapperboard, Send, Bot, User } from "lucide-react";
import API from "../api/auth";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm CineMentor.\n\nI can help you with:\n\n🍿 Movie recommendations\n🎬 Similar movies\n🎭 Explain movie endings\n🧠 Fan theories\n🎥 Hidden gems\n\nAsk me anything!",
    },
  ]);

  const messagesEndRef = useRef(null);

  // ===============================
  // Auto Scroll
  // ===============================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // ===============================
  // Send Message
  // ===============================

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {
      const res = await API.post("/chat", {
        message: currentMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Sorry! I couldn't reach CineMentor right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Enter to Send
  // ===============================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <>
      {/* Floating Button */}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Clapperboard size={20} />
        <span>CineMentor</span>
      </button>

      {isOpen && (
        <div className="chat-widget">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">
              <Bot size={22} />
              <div>
                <h3>CineMentor</h3>
                <span>Your AI Movie Expert</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "user-message" : "bot-message"
                }
              >
                <div className="message-icon">
                  {msg.sender === "user" ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>

                <div className="message-content">{msg.text}</div>
              </div>
            ))}

            {loading && (
              <div className="bot-message">
                <div className="message-icon">
                  <Bot size={18} />
                </div>

                <div className="message-content">
                  🎬 CineMentor is thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask about any movie..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={sendMessage} disabled={loading}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
