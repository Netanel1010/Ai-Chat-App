import { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setChat(prev => [
      ...prev,
      { user: 'You', text: userMessage }
    ]);

    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setChat(prev => [
        ...prev,
        { user: 'AI', text: data.reply }
      ]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat, loading]);

  return (
    <div className="app">
      <div className="chat-wrapper">

        <div className="header">
          AI Chat App
        </div>

        <div className="chat-container">
          {chat.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.user === 'You' ? 'user' : 'ai'}`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message ai typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />

          <button onClick={sendMessage}>
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;